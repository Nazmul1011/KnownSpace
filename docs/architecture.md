# Knowspace frontend architecture

Knowspace is one screen, an infinite canvas with floating chrome, so there is no router and no `pages/` layer. The code is organised by feature in four layers. Each layer may depend only on the layers below it.

```text
app  →  features  →  domain  →  shared
```

| Layer | Holds | May import |
| --- | --- | --- |
| `src/app` | Bootstrap (`main.tsx`), screen composition (`app.tsx`), keyboard shortcuts, layout chrome that composes several features (header, mobile bar, toasts, recent strip) | features, domain, shared |
| `src/features/<name>` | One product capability: `components/`, `model/` and an `index.ts` public entry | its own files, other features' `index.ts` (acyclic), domain, shared |
| `src/domain/<name>` | Product concepts that several features share: knowledge objects, the world engine, visitor state, shared interface state | other domain modules' `index.ts` (acyclic), shared |
| `src/shared/<kind>` | Product-independent building blocks: UI primitives, rng, hooks, config, global styles | other shared modules |

## Rules

- **Import through the entry.** Outside a module, import from `@/features/<name>` or `@/domain/<name>`, never from a file inside it. Inside a module, use relative imports. Each `index.ts` lists only what other modules actually use.
- **Styles live with their component.** Each component imports its own stylesheet (for example, `search.tsx` imports `search.css`). Only design tokens, base rules and the floating-chrome shell are global; `app/main.tsx` imports those first.
- **Tests sit next to the code they cover** (`*.test.ts`). Browser journeys live in `tests/e2e`, screenshot regression in `tests/visual`.

These rules are enforced by tooling:

- **ESLint** (`no-restricted-imports`, per layer) rejects upward imports and deep imports into another module.
- **`scripts/check-architecture.mjs`** builds the module graph and fails on cycles.
- **`npm run check`** runs typecheck, lint, format check, the architecture check and the unit tests.

## Decisions

**Why there is a `domain` layer.** The knowledge content, the world layout and the visitor's saved state are used by almost every feature. If they lived inside one feature, every other feature would depend on it. Putting them in `shared` would break the rule that shared code knows nothing about the product. So they get their own named layer between features and shared.

**State ownership.**
- **Persisted visitor state** (saved, learned, history, settings, world epoch) lives in `domain/visitor`, under the localStorage key `knowscape-v1`.
- **Today's session** lives in `features/session-goal`, under the sessionStorage key `knowscape-session`, because only that feature writes it.
- **Interface state that several screens coordinate** (open overlay, open card, filter, toasts) lives in `domain/ui-state`.
- **Everything local** stays in the component.

**Navigation commands are owned by the canvas feature.** Commands such as fly to an object, gather, surprise and recentre live in `features/canvas/model/navigation.ts`, because they drive the canvas camera. Search, topics and collection call them through `@/features/canvas`.

**The art manifest belongs to knowledge.** `domain/knowledge/model/art.ts` wraps the generated manifest so that drawing an object does not depend on the world layout. Without that, knowledge and world would import each other in a cycle.

## Verifying a restructure

`tests/visual` captures 13 screens: landing, canvas, search, search results, detail view, collection, settings, topics, menu, progress, toast, mobile canvas and mobile detail. Random numbers are seeded, the clock is frozen and motion is reduced, so two captures of unchanged code compare at 0%. The move to this structure was checked this way against the previous code, in both the dev server and the production build, and every screen was pixel-identical.
