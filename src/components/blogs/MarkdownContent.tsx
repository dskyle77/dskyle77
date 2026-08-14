"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-display text-3xl tracking-tight text-paper mt-10 mb-4 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display text-2xl tracking-tight text-paper mt-10 mb-3 border-b border-hairline/60 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-xl tracking-tight text-paper mt-8 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-sans text-lg font-semibold text-paper mt-6 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-paper-dim leading-relaxed my-4 text-base sm:text-lg">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-signal underline decoration-signal/40 underline-offset-2 hover:decoration-signal transition-colors"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-paper">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-paper-dim">{children}</em>,
  ul: ({ children }) => (
    <ul className="my-4 ml-5 list-disc space-y-2 text-paper-dim marker:text-signal/70">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-5 list-decimal space-y-2 text-paper-dim marker:text-signal/70">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed pl-1 text-base sm:text-lg">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-signal/50 bg-ink-soft/40 pl-4 py-2 pr-3 rounded-r-lg text-paper-dim italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-hairline" />,
  code: ({ className, children, ...props }) => {
    const isBlock = Boolean(className?.includes("language-"));
    if (!isBlock) {
      return (
        <code
          className="rounded bg-ink-soft px-1.5 py-0.5 font-mono text-[0.85em] text-signal border border-hairline/60"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={cn("font-mono text-sm text-paper", className)} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl border border-hairline bg-ink-soft/80 p-4 text-sm leading-relaxed">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
      <table className="w-full border-collapse text-sm text-paper-dim">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-ink-soft/80 text-paper">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border-b border-hairline px-4 py-2.5 text-left font-mono text-xs uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-hairline/60 px-4 py-2.5">{children}</td>
  ),
  img: ({ src, alt }) =>
    src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ""}
        className="my-6 rounded-xl border border-hairline max-w-full h-auto"
        loading="lazy"
      />
    ) : null,
};

export default function MarkdownContent({
  content,
  className,
}: MarkdownContentProps) {
  if (!content?.trim()) {
    return (
      <p className="text-paper-dim italic text-sm">
        This article has no content yet.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "prose-blog max-w-none space-y-1 text-paper/90",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
