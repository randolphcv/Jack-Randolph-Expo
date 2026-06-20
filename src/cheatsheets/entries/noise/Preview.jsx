import Noise from './Noise.jsx';
import './preview.css';

export default function NoisePreview({ settings }) {
  return (
    <div className="preview-stage noise-preview-stage">
      <h2 className="noise-demo-text">old school</h2>
      <Noise {...settings} />
    </div>
  );
}
