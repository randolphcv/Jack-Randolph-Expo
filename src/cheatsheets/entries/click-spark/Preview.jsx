import ClickSpark from './ClickSpark.jsx';
import './preview.css';

export default function ClickSparkPreview({ settings }) {
  return (
    <div className="preview-stage click-spark-preview-stage">
      <ClickSpark {...settings}>
        <button type="button" className="click-spark-preview-button">
          click around
        </button>
      </ClickSpark>
    </div>
  );
}
