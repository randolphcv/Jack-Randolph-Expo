import BorderGlow from './BorderGlow.jsx';
import './preview.css';

export default function BorderGlowPreview({ settings }) {
  return (
    <div className="preview-stage border-glow-preview-stage">
      <BorderGlow {...settings} className="border-glow-preview-shell">
        <div className="border-glow-preview-content">
          <button type="button" className="border-glow-preview-button">
            fancy
          </button>
        </div>
      </BorderGlow>
    </div>
  );
}
