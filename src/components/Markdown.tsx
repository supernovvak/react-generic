import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // Import your Highlight.js dark theme

// Helper: Recursively extract plain text from a React node.
const getTextFromReactNode = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return node.toString();
  }
  if (Array.isArray(node)) {
    return node.map(getTextFromReactNode).join('');
  }
  if (React.isValidElement(node)) {
    return getTextFromReactNode(node.props.children);
  }
  return '';
};

export interface MarkdownProps {
  content: string;
  theme?: 'light' | 'dark';
}

export interface CodeBlockProps {
  node?: any;
  inline: boolean;
  className?: string;
  children?: React.ReactNode;
  theme?: 'light' | 'dark';
  // When provided, this string is used as the code content.
  code?: string;
  [key: string]: any;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  node,
  inline,
  className,
  children,
  theme = 'light',
  code,
  ...props
}) => {
  if (inline) {
    return <code className={className} {...props}>{children}</code>;
  }
  
  const [copied, setCopied] = useState(false);
  // Use the 'code' prop if provided; otherwise, extract from children.
  const codeContent =
    code !== undefined
      ? code
      : getTextFromReactNode(children).replace(/\n$/, '');
  
  // Use Highlight.js to generate highlighted HTML.
  // If no language is provided and the code looks like a unified diff, force language "diff".
  const highlightedCode = useMemo(() => {
    if (codeContent) {
      let language = "";
      const languageMatch = className ? className.match(/language-(\w+)/) : null;
      if (languageMatch && languageMatch[1]) {
        language = languageMatch[1];
      } else if (
        codeContent.trim().startsWith('---') &&
        codeContent.includes('+++')
      ) {
        language = "diff";
      }
      if (language) {
        try {
          return hljs.highlight(codeContent, { language }).value;
        } catch (error) {
          return hljs.highlightAuto(codeContent).value;
        }
      }
      return hljs.highlightAuto(codeContent).value;
    }
    return '';
  }, [codeContent, className]);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  // When used standalone (via the code prop), remove extra vertical margin.
  const containerMarginClass = code !== undefined ? "" : "my-4";
  // Reset default margin on the <pre> element with m-0.
  const baseClasses = "rounded-md p-4 overflow-auto m-0";
  const themeClasses =
    theme === 'dark'
      ? "text-gray-100" // Background overridden inline below.
      : "bg-gray-100 text-gray-800";

  return (
    <div className={`relative ${containerMarginClass}`}>
      <pre
        className={`${baseClasses} ${themeClasses} ${className || ''}`}
        style={{
          backgroundColor: theme === 'dark' ? '#1e293b' : undefined,
        }}
        {...props}
      >
        <code dangerouslySetInnerHTML={{ __html: highlightedCode || codeContent }} />
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700"
        title="Copy code to clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8m-8-4h8m-8-4h8M4 6h16M4 18h16" />
        </svg>
      </button>
      {copied && (
        <div className="absolute top-2 right-10 bg-green-200 text-green-700 text-xs px-2 py-1 rounded">
          Copied!
        </div>
      )}
    </div>
  );
};

export const Markdown: React.FC<MarkdownProps> = ({ content, theme = 'light' }) => {
  const containerClasses =
    'relative border rounded-md p-4 ' +
    (theme === 'dark'
      ? 'bg-gray-900 prose prose-invert'
      : 'bg-white prose');

  // Inject dark mode styles to force all non-code markdown text to white.
  const darkTextStyles =
    theme === 'dark' && (
      <style>
        {`
          .prose-invert h1,
          .prose-invert h2,
          .prose-invert h3,
          .prose-invert h4,
          .prose-invert h5,
          .prose-invert h6,
          .prose-invert p,
          .prose-invert li,
          .prose-invert blockquote {
            color: #ffffff !important;
          }
        `}
      </style>
    );

  return (
    <div className={containerClasses}>
      {darkTextStyles}
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Override paragraph to avoid wrapping block-level elements.
          p: ({ node, children, ...props }) => {
            const childArray = React.Children.toArray(children);
            if (childArray.length === 1) {
              const child = childArray[0];
              if (
                React.isValidElement(child) &&
                typeof child.type === 'string' &&
                (child.type === 'div' || child.type === 'pre')
              ) {
                return <>{child}</>;
              }
            }
            return <p {...props}>{children}</p>;
          },
          // Unwrap pre so our CodeBlock isn't nested in an extra <pre>
          pre: ({ node, children, ...props }) => <>{children}</>,
          code: ({ node, inline, className, children, ...props }) => (
            <CodeBlock
              node={node}
              inline={inline}
              className={className}
              theme={theme}
              {...props}
            >
              {children}
            </CodeBlock>
          ),
        }}
      />
    </div>
  );
};
