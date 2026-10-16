/** Canvas shortcuts: I/S surprise, R rearrange, T topics, 0 recentre, +/− zoom, arrows pan, hold space to drag. */
import { useEffect } from 'react';
import { useUI } from '@/domain/ui-state';
import { camera } from '@/domain/world';
import { gesture, inspire, recenter, refreshWorld, surprise, zoomIn, zoomOut } from '@/features/canvas';

export function useKeyboardShortcuts() {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, [contenteditable], .wheel')) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const ui = useUI.getState();
      if (ui.modal || ui.introOpen || ui.overlay === 'collection') return;
      if (e.key === 'Escape') {
        if (ui.overlay) ui.setOverlay(null);
        else if (ui.filter) ui.setFilter(null);
        return;
      }
      if (e.key === ' ' && !t.closest('button, a')) {
        e.preventDefault();
        gesture.space = true;
        document.querySelector('.canvas')?.classList.add('is-space');
        return;
      }
      const z = camera.get().z;
      const pan = (dx: number, dy: number) => {
        const c = camera.get();
        camera.flyTo({ x: c.x + dx / z, y: c.y + dy / z }, { duration: 320 });
      };
      switch (e.key) {
        case 'i':
        case 'I':
          inspire();
          break;
        case 's':
        case 'S':
          surprise();
          break;
        case 'r':
        case 'R':
          refreshWorld();
          break;
        case 't':
        case 'T':
          ui.setOverlay(ui.overlay === 'topics' ? null : 'topics');
          break;
        case '0':
          recenter();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
        case '_':
          zoomOut();
          break;
        case 'ArrowLeft':
          pan(-260, 0);
          break;
        case 'ArrowRight':
          pan(260, 0);
          break;
        case 'ArrowUp':
          pan(0, -220);
          break;
        case 'ArrowDown':
          pan(0, 220);
          break;
        default:
          return;
      }
      e.preventDefault();
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        gesture.space = false;
        document.querySelector('.canvas')?.classList.remove('is-space');
      }
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);
}
