import type { AnchorHTMLAttributes } from 'react';

/** A link to another site: always opens in a new tab, never hands this page to the opened one. */
export function ExternalLink({ children, ...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
