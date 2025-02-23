import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🪴 My World",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "atambe.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
  fontOrigin: "googleFonts",
  cdnCaching: false,
  typography: {
    header: "Orbitron",
    body: "Orbitron",
    code: "IBM Plex Mono",
  },
  colors: {
    lightMode: {
      light: "#F2F2F2", // Background
      lightgray: "#bcc0cc", // Code background, borders
      gray: "#8c8fa1", // Unread nodes, subtitles
      darkgray: "#45485f", // Body text
      dark: "#4c4f69", // Code text
      secondary: "#325738", // Links, titles, current node
      tertiary: "#0E8390", // Visited nodes, accents
      highlight: "rgba(143, 159, 169, 0.15)", // Highlight background
      textHighlight: "#fff23688", // Highlighted text
    },
    darkMode: {
      light: "#131829", // Background
      lightgray: "#70778F", // Code background, borders
      gray: "#686D82", // Unread nodes, subtitles
      darkgray: "#cdd6f4", // Body text
      dark: "#D2DAF5", // Code text
      secondary: "#a6e3a1", // Links, titles, current node
      tertiary: "#89dceb", // Visited nodes, accents
      highlight: "rgba(143, 159, 169, 0.15)", // Highlight background
      textHighlight: "#b3aa0288", // Highlighted text
    },
  },
},
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
