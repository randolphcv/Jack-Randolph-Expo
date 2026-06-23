import DotGrid from './DotGrid.jsx';
import './preview.css';

export default function DotGridPreview({ settings }) {
  const logoUrl = `${import.meta.env.BASE_URL}assets/jack-randolph-lockup.png`;

  return (
    <div className="preview-stage dot-grid-preview-stage">
      <div className="dot-grid-preview-canvas">
        <DotGrid {...settings} />

        <div className="dot-grid-preview-overlay" aria-hidden="true">
          <header className="dot-grid-preview-header">
            <img src={logoUrl} alt="" className="dot-grid-preview-logo" />
            <nav className="dot-grid-preview-nav">
              <span>home</span>
              <span>projects</span>
              <span>cheatsheets</span>
            </nav>
          </header>

          <main className="dot-grid-preview-home">
            <p className="dot-grid-preview-kicker">Jack Randolph Visual Lab</p>
            <h3>Live dot-grid backdrop with inertia and click shockwave motion.</h3>
            <p>
              Fake homepage composition in the same style as DotField: top nav, editorial hero copy, and compact cards
              over an interactive animated background.
            </p>

            <div className="dot-grid-preview-actions">
              <span>Explore Work</span>
              <span>Read Notes</span>
            </div>

            <div className="dot-grid-preview-cards">
              <article>
                <strong>Interaction</strong>
                <span>Fast cursor movement kicks nearby dots into a spring return.</span>
              </article>
              <article>
                <strong>Shockwave</strong>
                <span>Clicking sends a radial burst through the grid.</span>
              </article>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
