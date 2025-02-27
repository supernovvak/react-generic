import React from 'react';
import { Markdown, CodeBlock } from './components/Markdown';
import { createTwoFilesPatch } from 'diff'; // npm install diff

// Markdown content with text and code snippets.
const markdownContent = `
# Dark Mode Markdown Example

This is a **Markdown** component in dark mode. It contains text and code snippets.

## JavaScript Code Snippet

\`\`\`javascript
console.log("Hello, dark mode!");
\`\`\`

Some more descriptive text here.
`;

// Standalone Java code.
const javaCode = `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java in Dark Mode!");
    }
}
`;

// Standalone Golang code.
const goCode = `
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go in Dark Mode!")
}
`;

// Standalone unified diff (hardcoded).
const unifiedDiffExample = `
--- a/example.txt
+++ b/example.txt
@@
-Old line here
+New line here
`;

// Programmatically computed unified diff using 'diff' package.
const originalText = `Line1
Line2
Line3`;

const modifiedText = `Line1
Line2 modified
Line3`;

const computedDiff = createTwoFilesPatch(
  'original.txt',
  'modified.txt',
  originalText,
  modifiedText,
  '', ''
);

const App: React.FC = () => {
  return (
    <div className="p-8 space-y-12 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-4">Dark Mode Example</h1>
      
      {/* 1. Markdown with some code snippets and text */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Markdown Component</h2>
        <Markdown content={markdownContent} theme="dark" />
      </div>
      
      {/* 2. Standalone CodeBlock with Java code */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Standalone CodeBlock (Java)</h2>
        <CodeBlock inline={false} code={javaCode} theme="dark" className="language-java" />
      </div>
      
      {/* 3. Standalone CodeBlock with Golang code */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Standalone CodeBlock (Golang)</h2>
        <CodeBlock inline={false} code={goCode} theme="dark" className="language-go" />
      </div>
      
      {/* 4. Standalone CodeBlock with unified diff (hardcoded) */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Standalone CodeBlock (Unified Diff)</h2>
        <CodeBlock inline={false} code={unifiedDiffExample} theme="dark" className="language-diff" />
      </div>
      
      {/* 5. Standalone CodeBlock with programmatically computed unified diff */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Standalone CodeBlock (Computed Unified Diff)</h2>
        <CodeBlock inline={false} code={computedDiff} theme="dark" className="language-diff" />
      </div>
    </div>
  );
};

export default App;
