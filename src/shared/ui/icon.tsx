import { Sparkle, type LucideProps } from 'lucide-react';
import { icons } from './icons.generated';

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = icons[name] ?? Sparkle;
  return <C aria-hidden {...props} />;
}
