import GradualBlur from './GradualBlur.jsx';
import './preview.css';

export default function GradualBlurPreview({ settings }) {
  const previewSettings = {
    ...settings,
    animated: 'scroll',
  };

  return (
    <section className="preview-stage gradual-blur-preview-stage">
      <div className="gradual-blur-preview-scroll">
        <div className="gradual-blur-preview-content">
          <p className="gradual-blur-kicker">Scroll down to see the blur deepen.</p>
          <img src="/assets/JR Rebrand Guide_Page_1.jpg" alt="Example of gradual blur effect on a panel edge" className="gradual-blur-preview-image" />
            <h3>Notes, cards, and content can stay readable while the edge fades out.</h3>
        <p>
            This preview uses a tall scrolling panel so the blur overlay can show its stacked gradient behavior at the
            bottom edge. The overlay is positioned relative to the parent container, which matches the usage example.
          </p>
          <p>
            The blur is meant for section transitions, sticky headers, footers, or any surface where you want content
            to gently dissolve into the background.
          </p>
          <p>
            Keep scrolling. The lower edge should stay soft, layered, and readable without a harsh cut line.
          </p>
          <p>
            The component is configurable, so you can adjust direction, curve, opacity, and whether it animates on
            scroll.
          </p>
          <p>
            One more paragraph so the scroll area is long enough to make the effect obvious in the cheatsheet preview.
          </p>
        </div>
      </div>

      <GradualBlur {...previewSettings} className="gradual-blur-preview-overlay" />
    </section>
  );
}
