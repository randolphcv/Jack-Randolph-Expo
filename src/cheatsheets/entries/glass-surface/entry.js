import componentSource from './GlassSurface.jsx?raw';
import componentCss from './GlassSurface.css?raw';
import previewSource from './Preview.jsx?raw';
import previewCss from './preview.css?raw';
import Preview from './Preview.jsx';
import { noDependencyInstall, propLine } from '../../utils.js';

const defaults = {
  width: 360,
  height: 230,
  borderRadius: 24,
  borderWidth: 0.07,
  brightness: 50,
  opacity: 0.93,
  blur: 11,
  displace: 0,
  backgroundOpacity: 0.08,
  saturation: 1,
  distortionScale: -180,
  redOffset: 0,
  greenOffset: 10,
  blueOffset: 20,
  xChannel: 'R',
  yChannel: 'G',
  mixBlendMode: 'screen',
};

const controls = [
  { key: 'width', label: 'Width', min: 200, max: 900, step: 1 },
  { key: 'height', label: 'Height', min: 120, max: 640, step: 1 },
  { key: 'borderRadius', label: 'Border Radius', min: 0, max: 80, step: 1 },
  { key: 'borderWidth', label: 'Border Width', min: 0, max: 0.2, step: 0.005 },
  { key: 'brightness', label: 'Brightness', min: 0, max: 100, step: 1 },
  { key: 'opacity', label: 'Opacity', min: 0, max: 1, step: 0.01 },
  { key: 'blur', label: 'Input Blur', min: 0, max: 40, step: 0.5 },
  { key: 'displace', label: 'Output Blur', min: 0, max: 10, step: 0.1 },
  { key: 'backgroundOpacity', label: 'Frost Opacity', min: 0, max: 1, step: 0.01 },
  { key: 'saturation', label: 'Saturation', min: 0, max: 3, step: 0.05 },
  { key: 'distortionScale', label: 'Distortion Scale', min: -360, max: 360, step: 1 },
  { key: 'redOffset', label: 'Red Offset', min: -80, max: 80, step: 1 },
  { key: 'greenOffset', label: 'Green Offset', min: -80, max: 80, step: 1 },
  { key: 'blueOffset', label: 'Blue Offset', min: -80, max: 80, step: 1 },
];

const createUsage = settings => {
  const orderedKeys = [
    'width',
    'height',
    'borderRadius',
    'borderWidth',
    'brightness',
    'opacity',
    'blur',
    'displace',
    'backgroundOpacity',
    'saturation',
    'distortionScale',
    'redOffset',
    'greenOffset',
    'blueOffset',
    'xChannel',
    'yChannel',
    'mixBlendMode',
  ];

  const props = orderedKeys.map(key => propLine(key, settings[key])).join('\n');

  return `import GlassSurface from './GlassSurface';

export default function GlassPanel() {
  return (
    <div style={{ minHeight: '360px', display: 'grid', placeItems: 'center', background: '#111827', padding: '40px' }}>
      <GlassSurface
${props}
      >
        <div style={{ textAlign: 'center', color: '#e5e7eb', fontFamily: 'var(--font-display)', padding: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Glass Surface Content</h2>
        </div>
      </GlassSurface>
    </div>
  );
}`;
};

const getCodeSections = settings => [
  {
    id: 'install',
    label: 'Install',
    language: 'bash',
    code: noDependencyInstall,
  },
  {
    id: 'usage',
    label: 'Usage.jsx',
    language: 'jsx',
    code: createUsage(settings),
  },
  {
    id: 'component',
    label: 'GlassSurface.jsx',
    language: 'jsx',
    code: componentSource,
  },
  {
    id: 'css',
    label: 'GlassSurface.css',
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

Component: GlassSurface
Variant: JavaScript + CSS
Dependencies: none

Target project: ${target.projectPath || '[paste project path here]'}
Target placement: ${target.placement || '[describe where this should appear]'}
Framework notes: ${target.framework || 'React/Vite-style app; adapt paths to the existing structure.'}

Task:
1. Add the GlassSurface.jsx component and GlassSurface.css stylesheet from the attached/component source.
2. Render a centered glass panel using these props:

${createUsage(settings)}

3. Preserve the existing app design system and verify the displacement distortion updates as the panel size changes.

Acceptance checks:
- The glass panel renders with content centered inside.
- Distortion and channel offsets change as props are adjusted.
- The fallback style works when SVG filters are unsupported.
- No unrelated files are refactored.
- If the app has tests or a build command, run them and report the result.`;

export default {
  id: 'react-bits-glass-surface',
  folderId: 'motion',
  title: 'React Bits GlassSurface',
  kicker: 'Distorted glass',
  summary: 'SVG filter-driven glass panel with RGB displacement controls and fallback styling.',
  tags: ['React', 'CSS', 'SVG Filter', 'Glass'],
  defaults,
  controls,
  Preview,
  getCodeSections,
  getPrompt,
};
