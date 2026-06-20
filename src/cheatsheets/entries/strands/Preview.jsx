import Strands from './Strands.jsx';
import './preview.css';

export default function StrandsPreview({ settings }) {
  return (
    <div className="preview-stage strands-preview-stage">
      <Strands {...settings} />
    </div>
  );
}
