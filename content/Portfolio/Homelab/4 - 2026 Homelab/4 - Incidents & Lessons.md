Tags: [[0 - Overview]] [[0 - HomeLab]]

# Incidents & Lessons

Real problems hit during the build, root-caused and fixed. Kept as incident-driven ADRs — each one is a genuine "the bug wasn't where I was looking" story.

## containerd needs explicit configuration to use the NVIDIA runtime

**Symptom:** NVIDIA kernel modules loaded fine and the driver worked at the OS level, but the Kubernetes device plugin reported zero GPU devices found, with an `"Incompatible strategy detected auto"` error.

**Root cause:** the NVIDIA system extensions only provide the *capability* to run GPU-aware containers — they don't tell containerd to actually use it. containerd's default runtime (`runc`) has no GPU awareness and won't inject the device files a container needs. That routing has to be configured explicitly.

**Fix:** a `machine.files` patch (scoped to the GPU node only) setting `default_runtime_name = "nvidia"` in containerd's config, plus a Kubernetes `RuntimeClass` for explicit opt-in elsewhere. Requires a reboot, same as any kernel-arg change.

**Why it matters:** being able to explain the difference between a container runtime (`runc`), a runtime wrapper (NVIDIA Container Runtime), and a device plugin (the Kubernetes-facing resource advertisement) shows real depth beyond "I ran the GPU operator and it worked."

## Exclusive hardware resources need `Recreate`, not the default `RollingUpdate`

**Symptom:** every `kubectl apply`/`rollout restart` on the Ollama deployment left a second pod stuck `Pending` with `Insufficient nvidia.com/gpu`.

**Root cause:** `RollingUpdate` brings up the new pod before tearing down the old one, to avoid downtime — fine for stateless, horizontally-scalable resources, but broken for anything requesting an exclusive resource. With exactly one GPU available cluster-wide, the second pod has nothing to schedule onto and the scheduler won't preempt a healthy running pod to free it.

**Fix:** `spec.strategy.type: Recreate` on any Deployment requesting exclusive hardware on a single-instance node — accepting a brief downtime window on updates, which is a fine tradeoff for a homelab AI service.

**Why it matters:** exclusive-resource scheduling quirks (GPUs, but also `hostPort`, some storage classes, license-limited software) are a recurring category of Kubernetes gotcha worth being able to explain.

## Forcing all GPU layers (`-ngl 99`) breaks llama.cpp's VRAM auto-fit

**Symptom:** bringing up `llama.cpp` with Qwen 3.8 27B at 73,728 context on the 16GB 4070 Ti Super failed with CUDA OOM at load time, even though the quant was chosen to fit.

**Root cause:** the deployment explicitly pinned `-ngl 99` to force every layer onto the GPU. That override *disables* llama.cpp's own `--fit` VRAM auto-placement — instead of measuring what fits and leaving the remainder on CPU, it tried to load everything and ran out of VRAM. A second, smaller issue stacked on top: HF mode auto-loaded the BF16 multimodal projector even though this is a text/coding-only deployment.

**Fix:** leave GPU layer placement to llama.cpp — `--fit on --fit-target 256`, no forced `-ngl`, plus `--no-mmproj` to skip the unnecessary projector. The model then loaded and served at 73k context with native MTP. Also had to use current draft-cache flag names (`--spec-draft-type-k/v`).

**Why it matters:** a good "the tuning knob you reached for is the one fighting you" story — an override meant to *maximize* GPU usage was the exact thing preventing the runtime from fitting the model at all.

## A node stuck `Booting` because the control-plane VM simply wasn't powered on

**Symptom:** `am4-gpu` sat in `Booting` for 6+ minutes (normally 60–90 seconds), logging `failed to sign API server CSR ... dial tcp 10.10.20.11:50001: connect: no route to host`.

**Root cause:** nothing was wrong with `am4-gpu` at all — `talos-cp-1`'s VM in Proxmox was simply not powered on, so the control plane it was trying to reach didn't exist. Powering the VM on in the Proxmox console let `am4-gpu` recover immediately.

**Fix / habit:** when a node can't reach the control plane, check the control plane's own VM state directly in Proxmox before assuming the problem is on the unreachable node's side.

**Why it matters:** the loudest error (a CSR-signing failure on the GPU node) pointed at the wrong machine entirely — the fault was one hop upstream, in infrastructure the failing node depends on.

## A leftover installer USB caused an intermittent, misleading boot-order race

**Symptom:** after installing Talos and applying its final worker config, the node intermittently came up looking like a totally fresh, unconfigured install (DHCP IP, blank hostname, maintenance mode) — with no config changes in between, across multiple checks minutes apart.

**Root cause:** the Ventoy multi-ISO installer USB was still physically plugged in. Depending on BIOS boot-order arbitration at each individual power cycle, the machine sometimes booted the real installed OS and sometimes booted fresh off the USB — which looks identical to a genuinely unconfigured node. Real debugging time went into suspecting the install itself, or that the config wasn't persisting, before the actual variable (physical boot media) was found.

**Fix:** treat any installer/multi-boot USB stick as something to physically disconnect the moment its job is done — don't rely on BIOS boot-order deprioritization alone. Applied the same discipline on a later Bazzite install (Talos SSD physically disconnected during install, to make sure the two installs couldn't interfere).

**Why it matters:** intermittent, hard-to-reproduce symptoms are often a sign the variable changing between attempts is outside the system you're staring at — not a config or software flaw.

## CSM/Legacy Boot blocks modern UEFI-only installers

**Symptom:** installing Bazzite (a UEFI-only Fedora Atomic image) kept falling through to a leftover, previously-unknown OS install on the same drive instead of booting the installer, through several ruled-out causes (stray clicks, Ventoy boot modes).

**Root cause:** CSM (Compatibility Support Module) was still enabled in BIOS from earlier bring-up work, which made the firmware's Legacy/UEFI boot-path selection ambiguous enough that it kept falling back to whatever it could boot instead of cleanly launching the UEFI-only installer. The live installer environment itself eventually surfaced the real error explicitly once it got far enough to run.

**Fix:** disable CSM in BIOS before installing any modern UEFI-only distribution.

**Why it matters:** another example of symptoms appearing one layer up (bootloader/installer selection) from the actual root cause (firmware boot-mode configuration) — and how a well-designed installer that surfaces a specific, actionable error saves real debugging time versus failing silently.

## `network_mode: host` on a firewall-managing container leaves host-level state behind

**Symptom:** during VPN debugging, another machine on the network suddenly couldn't reach the media server at all — not just the VPN'd service, but the whole host, including its own outbound internet access shortly after.

**Root cause:** a VPN container (gluetun) had been temporarily run with `network_mode: host` as a diagnostic step. Because it manages its own kill-switch firewall, this caused it to install restrictive `policy drop` rules directly on the **host's** `iptables` INPUT/OUTPUT chains — not scoped to a container. Reverting the compose config back to normal bridge networking fixed the VPN stack but did **not** retroactively undo the already-installed host firewall policy, which silently persisted and surfaced later as an apparently unrelated outage.

**Fix:** after running any container with `network_mode: host` — especially one that manages its own networking/firewall — explicitly check `iptables -L INPUT`/`-L OUTPUT` for leftover policy before assuming a config revert fully undid its effects.

**Why it matters:** a genuinely useful "host vs. container blast radius" story, and a good example of why "did the config change take effect" and "did prior side effects get cleaned up" are two different questions.

## A VLAN migration needs the uplink trunk updated, not just the access port

**Symptom:** after moving the media server to its own VLAN and configuring its switch port correctly, the host got only a self-assigned APIPA address — DHCP was never being answered.

**Root cause:** the new VLAN had never been added to the switch's uplink trunk port. Traffic reached the access-layer switch fine but had no path up to the gateway's DHCP server.

**Fix:** explicitly tag the new VLAN onto the uplink trunk in addition to configuring the client-facing access port.

**Why it matters:** a reminder that VLAN work has (at least) two config points — the access port and the trunk — and missing either produces a symptom that looks like it's somewhere else entirely (DHCP, driver, cabling).

## Enabling VLAN filtering can silently break non-managed devices

**Symptom:** enabling VLAN filtering on the switch (needed for the cluster VLAN work) broke a separate, unrelated Wi-Fi network with no obvious connection to the change.

**Root cause:** a non-UniFi access point on the same switch had a pre-existing VLAN tag that happened to collide with the newly assigned Lab-Cluster VLAN ID. The primary network controller's UI had no visibility into that device's configuration at all, since it wasn't managed by it.

**Fix:** before enabling VLAN filtering on any switch, enumerate *every* device on it — not just what's visible in the primary controller — and check for pre-existing VLAN tags that could collide with new IDs.

**Why it matters:** a realistic "config drift across multiple management planes" story, and a good argument for why network segmentation projects need a full device inventory, not just a query against one controller's UI.

## WireGuard-in-gluetun handshook but never passed traffic — switched to OpenVPN

**Symptom:** ProtonVPN over WireGuard, run through gluetun in Docker on the media server, would establish a session (handshake succeeded, keepalives flowed) but never pass real application data — every DNS lookup, ping, and HTTP request through the tunnel timed out.

**Root cause:** never definitively identified. Ruled out across 8+ Proton servers, both `:latest` and stable `:v3` images, kernelspace and userspace WireGuard, and even `network_mode: host` (removing Docker's bridge/NAT entirely). The *identical* WireGuard config worked perfectly via raw `wg-quick` outside Docker — on this same host and a second machine — which ruled out the network, ISP, and credentials. A genuine unsolved mystery specific to WireGuard-inside-gluetun-inside-Docker on this host; full log preserved in `GLUETUN_PROBLEM.md`.

**Fix:** switch `VPN_TYPE` to `openvpn` with ProtonVPN's OpenVPN credentials (`+pmp` appended to the username for port forwarding). Worked immediately and has been stable since, at a negligible overhead cost for this traffic scale.

**Why it matters:** knowing when to stop root-causing. The problem was reproducible, bounded, and had a working alternative one config value away — chasing it further would have been sunk cost against a stable fix. (Security footnote: a WireGuard private key was pasted in plaintext during debugging and should be treated as compromised/rotated.)

## Smaller operational lessons

- **`TALOSCONFIG`/`KUBECONFIG` not set in fresh shells** has caused confusion across multiple sessions — the defaults fall back to a stale `192.168.1.248` endpoint. Fix is to export both in `~/.bashrc`/`~/.zshrc`. Related gotcha: the working kubeconfig is at `~/homelab/talos-vlan20/kubeconfig-cilium-homelab` — *one directory above* `_cilium/`, not inside it, unlike the talosconfig.
- **Pasting a large document into an interactive `ollama run` session silently stalls the model** — the default small context window plus an already-tight ~92%-full VRAM footprint leaves no room for a growing KV cache. Restart the session to reset context; for big pasted docs prefer a smaller model with more headroom.
