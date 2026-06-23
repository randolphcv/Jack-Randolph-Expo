import DotField from './DotField.jsx';
import './preview.css';

export default function DotFieldPreview({ settings }) {
  return (
    <div className="preview-stage dot-field-preview-stage">
      <div className="dot-field-preview-canvas">
        <DotField {...settings} />
      </div>
    </div>
  );
}
