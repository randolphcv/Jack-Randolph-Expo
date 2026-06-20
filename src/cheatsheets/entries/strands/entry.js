import componentSource from './Strands.jsx?raw';
import componentCss from './Strands.css?raw';
import previewSource from './Preview.jsx?raw';
import previewCss from './preview.css?raw';
import Preview from './Preview.jsx';
import { propLine } from '../../utils.js';

const defaults = {
  colors: ['#ff0000', '#0035ff', '#06ff00'],
  count: 2,
  speed: 0.4,
  amplitude: 1.1,
  waviness: 3,
  thickness: 0.4,
  glow: 2.5,
  taper: 6,
  spread: 1,
  intensity: 0.35,
  saturation: 1.5,
  opacity: 1,
  scale: 1.7,
  glass: true,
  refraction: 3,
  dispersion: 4,
  glassSize: 0.66,
  hueShift: 0.17,
};

const controls = [
  { key: 'count', label: 'Count', min: 1, max: 12, step: 1 },
  { key: 'speed', label: 'Speed', min: 0, max: 2, step: 0.05 },
  { key: 'amplitude', label: 'Amplitude', min: 0.1, max: 3, step: 0.05 },
  { key: 'waviness', label: 'Waviness', min: 0.1, max: 6, step: 0.1 },
  { key: 'thickness', label: 'Thickness', min: 0.05, max: 1.8, step: 0.05 },
  { key: 'glow', label: 'Glow', min: 0.2, max: 6, step: 0.1 },
  { key: 'taper', label: 'Taper', min: 0.5, max: 10, step: 0.1 },
  { key: 'spread', label: 'Spread', min: 0, max: 3, step: 0.05 },
  { key: 'intensity', label: 'Intensity', min: 0, max: 1.5, step: 0.05 },
  { key: 'saturation', label: 'Saturation', min: 0, max: 3, step: 0.05 },
  { key: 'opacity', label: 'Opacity', min: 0, max: 1, step: 0.05 },
  { key: 'scale', label: 'Scale', min: 0.4, max: 3, step: 0.05 },
  { key: 'hueShift', label: 'Hue Shift', min: 0, max: 1, step: 0.01 },
  { key: 'refraction', label: 'Refraction', min: 0, max: 8, step: 0.1, glassOnly: true },
  { key: 'dispersion', label: 'Dispersion', min: 0, max: 8, step: 0.1, glassOnly: true },
  { key: 'glassSize', label: 'Glass Size', min: 0.2, max: 1.2, step: 0.01, glassOnly: true },
];

const createUsage = settings => {
  const orderedKeys = [
    'colors',
    'count',
    'speed',
    'amplitude',
    'waviness',
    'thickness',
    'glow',
    'taper',
    'spread',
    'intensity',
    'saturation',
    'opacity',
    'scale',
    'glass',
    'refraction',
    'dispersion',
    'glassSize',
    'hueShift',
  ];

  const props = orderedKeys.map(key => propLine(key, settings[key])).join('\n');

  return `import Strands from './Strands';

export default function HeroStrands() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Strands
${props}
      />
    </div>
  );
}`;
};

const getCodeSections = settings => [
  {
    id: 'install',
    label: 'Install',
    language: 'bash',
    code: 'npm install ogl',
  },
  {
    id: 'usage',
    label: 'Usage.jsx',
    language: 'jsx',
    code: createUsage(settings),
  },
  {
    id: 'component',
    label: 'Strands.jsx',
    language: 'jsx',
    code: componentSource,
  },
  {
    id: 'css',
    label: 'Strands.css',
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

Component: Strands
Variant: JavaScript + CSS
Dependencies: ogl

Target project: ${target.projectPath || '[paste project path here]'}
Target placement: ${target.placement || '[describe where this should appear]'}
Framework notes: ${target.framework || 'React/Vite-style app; adapt paths to the existing structure.'}

Task:
1. Install the dependency: npm install ogl
2. Add the Strands.jsx component and Strands.css stylesheet from the attached/component source.
3. Render the component in the target placement using these props:

${createUsage(settings)}

4. Preserve the existing app design system. Make the container responsive, keep the canvas non-blocking, and verify the effect renders in desktop and mobile viewports.

Acceptance checks:
- The WebGL canvas is visible and nonblank.
- Changing the container size does not break the animation.
- No unrelated files are refactored.
- If the app has tests or a build command, run them and report the result.`;

export default {
  id: 'react-bits-strands',
  folderId: 'motion',
  title: 'React Bits Strands',
  kicker: 'WebGL effect',
  summary: 'Animated OGL strands with color, wave, glow, scale, and optional glass refraction controls.',
  tags: ['React', 'OGL', 'Canvas', 'Effect'],
  defaults,
  controls,
  toggles: [{ key: 'glass', label: 'Glass sphere' }],
  Preview,
  getCodeSections,
  getPrompt,
};
