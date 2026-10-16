import { memo } from 'react';
import { imageUrl } from '../model/objects';
import type { KnowledgeObject } from '../model/types';
import { art } from '../model/art';
import { Diagram } from './diagram';
import { MiniMap, NotifArt, TypeArt } from './visual-art';
import { categoryById } from '../model/categories';
import { Icon } from '@/shared/ui/icon';

/** The picture of a knowledge object, whatever kind it is. Fills its parent. */
export const Visual = memo(function Visual({ obj, size = 's', alt = '' }: { obj: KnowledgeObject; size?: 's' | 'l'; alt?: string }) {
  const v = obj.visual;
  switch (v.kind) {
    case 'object':
    case 'photo': {
      const a = art[v.image];
      // image not generated yet: a designed placeholder that is replaced as soon as the picture exists
      if (!a) return <ArtPending obj={obj} kind={v.kind} />;
      return (
        <img
          className={`v-img ${v.kind === 'object' && !a.real ? 'v-obj' : 'v-photo'}`}
          src={imageUrl(v.image, size)}
          alt={alt}
          width={a?.w}
          height={a?.h}
          draggable={false}
          loading="lazy"
          decoding="async"
          style={v.kind === 'photo' || a.real ? { backgroundColor: a?.tone } : undefined}
        />
      );
    }
    case 'diagram':
      return <Diagram id={v.diagram} title={obj.title} />;
    case 'map':
      return <MiniMap lat={v.lat} lon={v.lon} place={v.place} />;
    case 'type':
      return <TypeArt obj={obj} light={size === 'l'} />;
    case 'notif':
      return <NotifArt />;
  }
});

function ArtPending({ obj, kind }: { obj: KnowledgeObject; kind: 'object' | 'photo' }) {
  const hue = categoryById[obj.category].hue;
  return (
    <span className={`v-pending v-pending--${kind}`} style={{ '--hue': hue } as React.CSSProperties} role="img" aria-label={obj.title}>
      <span className="v-pending-mark" aria-hidden>
        <Icon name={obj.icon} strokeWidth={1.4} />
      </span>
      <span className="candy v-pending-icon" aria-hidden>
        <Icon name={obj.icon} size="1.35em" strokeWidth={2.1} />
      </span>
    </span>
  );
}

/** How a card's picture should be framed: real photographs count as photos even on "object" cards. */
export function displayKind(obj: KnowledgeObject) {
  const v = obj.visual;
  if (v.kind === 'object' && art[v.image]?.real) return 'photo';
  return v.kind;
}
