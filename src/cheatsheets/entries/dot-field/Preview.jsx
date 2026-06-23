import DotField from './DotField.jsx';
import './preview.css';

export default function DotFieldPreview({ settings }) {
  return (
    <div className="preview-stage dot-field-preview-stage">
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <DotField {...settings} />
      </div>
    </div>
  );
}
