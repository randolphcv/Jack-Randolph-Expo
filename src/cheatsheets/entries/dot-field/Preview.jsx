import DotField from './DotField.jsx';
import './preview.css';

export default function DotFieldPreview({ settings }) {
  const logoUrl = `${import.meta.env.BASE_URL}assets/jack-randolph-lockup.png`;

  return (
    <div className="preview-stage dot-field-preview-stage">
      <div className="dot-field-preview-canvas">
        <DotField {...settings} />

        <div className="dot-field-preview-overlay" aria-hidden="true">
          <header className="dot-field-preview-header">
            <img src={logoUrl} alt="" className="dot-field-preview-logo" />
            <nav className="dot-field-preview-nav">
              <span>projects</span>
              <span>archive</span>
              <span>cheatsheets</span>
            </nav>
          </header>

          <main className="dot-field-preview-home">
            <p className="dot-field-preview-kicker">Jack Randolph Lab</p>
            <h3>Motion-driven web experiments and visual systems.</h3>
            <p>
              Fake homepage shell layered above DotField to preview hero/header composition with a live animated
              background.
            </p>

            <div className="dot-field-preview-actions">
              <span>View Projects</span>
              <span>Open Cheatsheets</span>
            </div>

            <div className="dot-field-preview-cards">
              <article>
                <strong>Current Build</strong>
                <span>Portfolio migration + motion component vault.</span>
              </article>
              <article>
                <strong>Visual Direction</strong>
                <span>Charcoal UI, editorial typography, red kinetic accents.</span>
              </article>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
