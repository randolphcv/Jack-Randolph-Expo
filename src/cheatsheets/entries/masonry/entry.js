import componentSource from './Masonry.jsx?raw';
import componentCss from './Masonry.css?raw';
import previewSource from './Preview.jsx?raw';
import previewCss from './preview.css?raw';
import Preview from './Preview.jsx';
import { propLine } from '../../utils.js';

const defaults = {
  ease: 'power3.out',
  duration: 0.6,
  stagger: 0.05,
  animateFrom: 'bottom',
  scaleOnHover: true,
  hoverScale: 0.95,
  blurToFocus: true,
  colorShiftOnHover: false,
};

const controls = [
  { key: 'duration', label: 'Duration', min: 0.1, max: 2, step: 0.05 },
  { key: 'stagger', label: 'Stagger', min: 0, max: 0.3, step: 0.01 },
  { key: 'hoverScale', label: 'Hover Scale', min: 0.82, max: 1.08, step: 0.01 },
];

const toggles = [
  { key: 'scaleOnHover', label: 'Scale On Hover' },
  { key: 'blurToFocus', label: 'Blur To Focus' },
  { key: 'colorShiftOnHover', label: 'Color Shift On Hover' },
];

const createUsage = settings => {
  const orderedKeys = [
    'ease',
    'duration',
    'stagger',
    'animateFrom',
    'scaleOnHover',
    'hoverScale',
    'blurToFocus',
    'colorShiftOnHover',
  ];

  const props = orderedKeys.map(key => propLine(key, settings[key])).join('\n');
  return `import { useMemo } from 'react';
import Masonry from './Masonry';

const imageModules = import.meta.glob('/public/assets/packet1/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const heightPresets = [620, 530, 420, 560, 490, 540, 380, 390, 610, 600, 360, 370];

const shuffle = arr => {
  const next = [...arr];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

export default function GalleryMasonry() {
  const items = useMemo(() => {
    const mapped = Object.entries(imageModules)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, img], index) => ({
        id: String(index + 1),
        img,
        url: img,
        height: heightPresets[index % heightPresets.length],
        path,
      }));

    return shuffle(mapped).map((item, index) => ({ ...item, id: String(index + 1) }));
  }, []);

  return (
    <section style={{ width: '100%', height: 'min(78vh, 760px)' }}>
      <Masonry
        items={items}
${props}
      />
    </section>
  );
}`;
};

const getCodeSections = settings => [
  {
    id: 'install',
    label: 'Install',
    language: 'bash',
    code: 'npm install gsap',
  },
  {
    id: 'usage',
    label: 'Usage.jsx',
    language: 'jsx',
    code: createUsage(settings),
  },
  {
    id: 'component',
    label: 'Masonry.jsx',
    language: 'jsx',
    code: componentSource,
  },
  {
    id: 'css',
    label: 'Masonry.css',
    language: 'css',
    code: componentCss,
  },
  {
    id: 'preview-component',
    label: 'Preview.jsx',
    language: 'jsx',
    code: previewSource,
  },
  {
    id: 'preview-css',
    label: 'preview.css',
    language: 'css',
    code: previewCss,
  },
];

const getPrompt = (settings, target) => `You are helping integrate an open-source React component into an existing application.

Component: Masonry
Variant: JavaScript + CSS
Dependencies: gsap

Target project: ${target.projectPath || '[paste project path here]'}
Target placement: ${target.placement || '[describe where this should appear]'}
Framework notes: ${target.framework || 'React/Vite-style app; adapt paths to the existing structure.'}

Task:
1. Install dependency: npm install gsap
2. Add the Masonry.jsx component and Masonry.css stylesheet from the attached/component source.
3. Use image assets from /public/assets/packet1 for the masonry items.
4. Render a masonry gallery with this usage baseline:

${createUsage(settings)}

Acceptance checks:
- Masonry layout is responsive and animates into place.
- Hover scale and blur-to-focus toggles work.
- Clicking an image opens its linked URL in a new tab.
- No unrelated files are refactored.
- If the app has tests or a build command, run them and report the result.`;

export default {
  id: 'react-bits-masonry',
  folderId: 'motion',
  title: 'React Bits Masonry',
  kicker: 'Image gallery',
  summary: 'Animated masonry grid with responsive columns, GSAP transitions, and hover interactions.',
  tags: ['React', 'GSAP', 'Masonry', 'Gallery'],
  defaults,
  controls,
  toggles,
  Preview,
  getCodeSections,
  getPrompt,
};
