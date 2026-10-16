/** The visual formats a knowledge object can take on the canvas. Sizes are in em so a format scales with its item. */
import { ArrowUpRight } from 'lucide-react';
import { byId, categoryById, type KnowledgeObject, Visual, displayKind } from '@/domain/knowledge';
import { Icon } from '@/shared/ui/icon';
import { hashString } from '@/shared/lib/rng';
import type { Item } from '@/domain/world';
import './card-formats.css';

const EYEBROWS = ['Worth knowing', 'Something interesting', 'One small thing', "Here's something strange", 'A tiny fact', 'Keep this one'];

const cat = (o: KnowledgeObject) => categoryById[o.category].label;

function ObjectFormat({ o }: { o: KnowledgeObject }) {
  return (
    <>
      <span className="ko-obj-visual" data-visual>
        <Visual obj={o} />
      </span>
      <span className="ko-cap">
        <span className="ko-eyebrow">{cat(o)}</span>
        <span className="ko-cap-title">{o.title}</span>
        <span className="ko-cap-more" aria-hidden>
          {o.shortFact}
        </span>
      </span>
    </>
  );
}

function EditorialFormat({ o, stacked }: { o: KnowledgeObject; stacked?: boolean }) {
  return (
    <>
      {stacked && <span className="ko-ed-sheet" aria-hidden />}
      <span className="ko-ed">
        <span className={`ko-ed-media ${displayKind(o) === 'object' ? 'is-object' : ''}`} data-visual>
          <Visual obj={o} />
          <span className="ko-ed-stamp">{cat(o)}</span>
        </span>
        <span className="ko-ed-body">
          <span className="ko-ed-title">{o.title}</span>
          <span className="ko-ed-text">{o.shortFact}</span>
          <span className="ko-ed-foot">{o.subcategory}</span>
        </span>
      </span>
    </>
  );
}

function TileFormat({ o }: { o: KnowledgeObject }) {
  return (
    <>
      <span className="ko-tile-media" data-visual>
        <Visual obj={o} />
      </span>
      <span className="ko-cap">
        <span className="ko-eyebrow">{cat(o)}</span>
        <span className="ko-cap-title">{o.title}</span>
      </span>
    </>
  );
}

function PolaroidFormat({ o }: { o: KnowledgeObject }) {
  return (
    <span className="ko-pol">
      <span className="ko-pol-media" data-visual>
        <Visual obj={o} />
      </span>
      <span className="ko-pol-cap">{o.title}</span>
    </span>
  );
}

function CircleFormat({ o }: { o: KnowledgeObject }) {
  return (
    <>
      <span className="ko-circle-media" data-visual>
        <Visual obj={o} />
      </span>
      <span className="ko-cap is-center">
        <span className="ko-eyebrow">{cat(o)}</span>
        <span className="ko-cap-title">{o.title}</span>
      </span>
    </>
  );
}

function QuestionFormat({ o }: { o: KnowledgeObject }) {
  return (
    <span className="ko-q">
      <span className="ko-eyebrow">{cat(o)}</span>
      <span className="ko-q-title">{o.title}</span>
      <span className="ko-q-foot" aria-hidden>
        Find out <ArrowUpRight size="1em" strokeWidth={1.8} />
      </span>
    </span>
  );
}

function FactFormat({ o }: { o: KnowledgeObject }) {
  const hue = categoryById[o.category].hue;
  return (
    <span className="ko-fact">
      <span className="ko-fact-top">
        <span className="ko-eyebrow">{EYEBROWS[hashString(o.id) % EYEBROWS.length]}</span>
        <span className="ko-fact-text">{o.shortFact}</span>
      </span>
      <span className="ko-fact-foot">
        <span className="candy" style={{ '--hue': hue } as React.CSSProperties} data-visual>
          <Icon name={o.icon} size="1.25em" strokeWidth={2.2} />
        </span>
        <span className="ko-fact-meta">
          <span className="ko-fact-title">{o.title}</span>
          {o.stat && (
            <span className="ko-fact-stat">
              {o.stat.label} · {o.stat.value}
            </span>
          )}
        </span>
      </span>
    </span>
  );
}

function PanelFormat({ o, kind }: { o: KnowledgeObject; kind: 'diagram' | 'map' }) {
  return (
    <span className={`ko-panel ko-panel--${kind}`}>
      <span className="ko-panel-art" data-visual>
        <Visual obj={o} />
      </span>
      <span className="ko-panel-body">
        <span className="ko-eyebrow">{o.visual.kind === 'map' ? o.visual.place : cat(o)}</span>
        <span className="ko-panel-title">{o.title}</span>
      </span>
    </span>
  );
}

function TypeFormat({ o }: { o: KnowledgeObject }) {
  return (
    <span className="ko-type">
      <span className="ko-type-art" data-visual>
        <Visual obj={o} />
      </span>
      <span className="ko-type-cap">
        <span className="ko-eyebrow">{cat(o)}</span>
        <span className="ko-cap-title">{o.title}</span>
      </span>
    </span>
  );
}

function NotifFormat({ o }: { o: KnowledgeObject }) {
  return (
    <span className="ko-notif">
      <span className="ko-notif-art" data-visual>
        <Visual obj={o} />
      </span>
      <span className="ko-cap is-center">
        <span className="ko-eyebrow">{cat(o)}</span>
        <span className="ko-cap-title">{o.title}</span>
      </span>
    </span>
  );
}

function NoteFormat({ item }: { item: Item }) {
  return (
    <span className="ko-note">
      <span className="ko-eyebrow">Did you know?</span>
      <span className="ko-note-text">{item.text}</span>
      <span className="ko-q-foot" aria-hidden>
        Read more <ArrowUpRight size="1em" strokeWidth={1.8} />
      </span>
    </span>
  );
}

function ChipFormat({ item }: { item: Item }) {
  return (
    <>
      <span className="ko-chip">
        <span className="ko-chip-dot" aria-hidden />
        {item.text}
      </span>
      <span className="ko-chip-tip" role="tooltip">
        {item.tip}
      </span>
    </>
  );
}

export function renderFormat(item: Item) {
  const o = item.objId ? byId[item.objId] : undefined;
  switch (item.format) {
    case 'note':
      return <NoteFormat item={item} />;
    case 'chip':
      return <ChipFormat item={item} />;
  }
  if (!o) return null;
  switch (item.format) {
    case 'object':
      return <ObjectFormat o={o} />;
    case 'editorial':
      return <EditorialFormat o={o} stacked={item.stacked} />;
    case 'tile':
      return <TileFormat o={o} />;
    case 'polaroid':
      return <PolaroidFormat o={o} />;
    case 'circle':
      return <CircleFormat o={o} />;
    case 'question':
      return <QuestionFormat o={o} />;
    case 'fact':
      return <FactFormat o={o} />;
    case 'diagram':
      return <PanelFormat o={o} kind="diagram" />;
    case 'map':
      return <PanelFormat o={o} kind="map" />;
    case 'type':
      return <TypeFormat o={o} />;
    case 'notif':
      return <NotifFormat o={o} />;
    default:
      return null;
  }
}

/** Only orbiting chips need an explicit name; every other format is named by its visible text. */
export function ariaLabel(item: Item) {
  const o = item.objId ? byId[item.objId] : undefined;
  if (!o || item.format !== 'chip') return undefined;
  return `${item.text}: ${item.tip} Opens ${o.title}`;
}
