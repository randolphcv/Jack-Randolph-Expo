import { useMemo, useState } from 'react';
import Masonry from './Masonry.jsx';
import './preview.css';

const imageModules = import.meta.glob('/public/assets/packet1/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const heightPresets = [620, 530, 420, 560, 490, 540, 380, 390, 610, 600, 360, 370];

const baseItems = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, img], index) => ({
    id: String(index + 1),
    img,
    url: img,
    height: heightPresets[index % heightPresets.length],
    path,
  }));

const shuffleItems = input => {
  const items = [...input];
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items.map((item, index) => ({ ...item, id: String(index + 1) }));
};

export default function MasonryPreview({ settings }) {
  const INITIAL_VISIBLE = 6;
  const BATCH_SIZE = 2;
  const shuffledItems = useMemo(() => shuffleItems(baseItems), []);

  const [visibleCount, setVisibleCount] = useState(Math.min(INITIAL_VISIBLE, shuffledItems.length));
  const activeItems = useMemo(() => shuffledItems.slice(0, visibleCount), [shuffledItems, visibleCount]);

  const handleScroll = event => {
    const node = event.currentTarget;
    const threshold = 120;
    const reachedBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - threshold;

    if (!reachedBottom) return;

    setVisibleCount(current => {
      if (current >= shuffledItems.length) return current;
      return Math.min(shuffledItems.length, current + BATCH_SIZE);
    });
  };

  return (
    <section className="preview-stage masonry-preview-stage">
      <div className="masonry-preview-canvas masonry-preview-scroll" onScroll={handleScroll}>
        <Masonry items={activeItems} {...settings} />
      </div>
    </section>
  );
}
