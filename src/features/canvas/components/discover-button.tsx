/** "Discover new things": rearranges the world. */
import { refreshWorld } from '../model/navigation';
import { LiveCompass } from './live-compass';
import './discover-button.css';

export function DiscoverButton() {
  return (
    <aside className="hud hud-bc hide-sm" aria-label="Discover">
      <button type="button" className="pill pill--glass discover" onClick={refreshWorld} title="Discover new things (R)">
        <LiveCompass size={16} />
        Discover new things
      </button>
    </aside>
  );
}
