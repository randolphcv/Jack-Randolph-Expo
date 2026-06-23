import GlassSurface from './GlassSurface.jsx';
import './preview.css';

export default function GlassSurfacePreview({ settings }) {
  const previewSettings = {
    ...settings,
    mixBlendMode: 'screen',
    backgroundOpacity: Math.max(Number(settings.backgroundOpacity ?? 0), 0.08),
  };

  return (
    <section className="preview-stage glass-surface-preview-stage">
      <div className="glass-surface-preview-scroll" role="region" aria-label="Glass surface scroll preview">
        <div className="glass-surface-preview-track">
          <section className="glass-surface-preview-hero">
            <article className="glass-surface-preview-text-block">
              <p className="glass-surface-preview-kicker">react bits</p>
              <h3>Glass Surface</h3>
              <p>
                The glass rectangle stays locked in place while this content moves underneath it as you scroll.
              </p>
              <p>
                This pattern lets you keep a visual focal point centered in the window while narrative content,
                imagery, and branding pass by in the background.
              </p>
            </article>
          </section>

          <div className="glass-surface-preview-gallery" aria-label="Preview gallery">
            <img src="/assets/hero-portrait.jpg" alt="Portrait sample for glass surface scroll section" />
            <img src="/assets/studio-shadow.jpg" alt="Studio shadow sample for glass surface scroll section" />
            <img src="/assets/lighthouse-poster.jpg" alt="Poster sample for glass surface scroll section" />
          </div>

          <footer className="glass-surface-preview-logo-wrap">
            <img src="/assets/jack-randolph-lockup.png" alt="Jack Randolph logo" className="glass-surface-preview-logo" />
          </footer>
        </div>
      </div>

      <div className="glass-surface-preview-overlay" aria-hidden="true">
        <GlassSurface {...previewSettings} className="glass-surface-preview-card">
          <button type="button" className="glass-surface-preview-empty-button" aria-label="Glass surface button" />
        </GlassSurface>
      </div>
    </section>
  );
}
