import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/geist';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import '@/shared/styles/tokens.css';
import '@/shared/styles/base.css';
import './layout/hud.css';
import { App } from './app';
import { useVisitor } from '@/domain/visitor';
import { useUI } from '@/domain/ui-state';
import { camera } from '@/domain/world';
import { actions } from '@/features/canvas';
import { useSession } from '@/features/session-goal';

// handy for QA from the console / headless scripts
Object.assign(window, { __ks: { user: useVisitor, ui: useUI, session: useSession, camera, actions } });

const root = document.getElementById('root');
if (!root) throw new Error('Knowspace needs a #root element to mount into.');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
