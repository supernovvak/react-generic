import { useEffect } from "react";

interface SyntaxThemeLoaderProps {
  theme: "light" | "dark";
}

export const SyntaxThemeLoader: React.FC<SyntaxThemeLoaderProps> = ({ theme }) => {
  useEffect(() => {
    const id = "hljs-theme";
    const href = theme === "dark" ? "/github-dark.css" : "/github.css"; // Adjust the path as needed

    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (link) {
      // Update href if necessary.
      if (link.href !== window.location.origin + href) {
        link.href = href;
      }
    } else {
      // Create the link element if not present.
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, [theme]);

  return null;
};
