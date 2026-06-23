import componentSource from './DotGrid.jsx?raw';
import componentCss from './DotGrid.css?raw';
import previewSource from './Preview.jsx?raw';
import previewCss from './preview.css?raw';
import Preview from './Preview.jsx';
import { propLine } from '../../utils.js';

const installCommand = 'npm install gsap';

const defaults = {
  dotSize: 10,
  gap: 15,
  baseColor: '#ff4d4d',
  activeColor: '#ff4d4d',
  proximity: 120,
  speedTrigger: 100,
  shockRadius: 250,
  shockStrength: 5,
  maxSpeed: 5000,
  resistance: 750,
  returnDuration: 1.5,
};

const controls = [
  { key: 'dotSize', label: 'Dot Size', min: 4, max: 24, step: 1 },
  { key: 'gap', label: 'Gap', min: 6, max: 42, step: 1 },
  { key: 'proximity', label: 'Proximity', min: 60, max: 280, step: 10 },
  { key: 'speedTrigger', label: 'Speed Trigger', min: 20, max: 280, step: 5 },
  { key: 'shockRadius', label: 'Shock Radius', min: 80, max: 420, step: 10 },
  { key: 'shockStrength', label: 'Shock Strength', min: 1, max: 12, step: 0.5 },
  { key: 'resistance', label: 'Resistance', min: 200, max: 1800, step: 50 },
  { key: 'returnDuration', label: 'Return Duration', min: 0.2, max: 3, step: 0.1 },
];

const createUsage = settings => {
  const orderedKeys = [
    'dotSize',
    'gap',
    'baseColor',
    'activeColor',
    'proximity',
    'shockRadius',
    'shockStrength',
    'resistance',
    'returnDuration',
  ];

  const props = orderedKeys.map(key => propLine(key, settings[key])).join('\n');

  return `import DotGrid from './DotGrid';

export default function InteractiveBackdrop() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <DotGrid
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
    code: installCommand,
  },
  {
    id: 'usage',
    label: 'Usage.jsx',
    language: 'jsx',
    code: createUsage(settings),
  },
  {
    id: 'component',
    label: 'DotGrid.jsx',
    language: 'jsx',
    code: componentSource,
  },
  {
    id: 'css',
    label: 'DotGrid.css',
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

Component: DotGrid
Variant: JavaScript + CSS
Dependencies: gsap

Target project: ${target.projectPath || '[paste project path here]'}
Target placement: ${target.placement || '[describe where this should appear]'}
Framework notes: ${target.framework || 'React/Vite-style app; adapt paths to the existing structure.'}

Task:
1. Install dependency: npm install gsap.
2. Add the DotGrid.jsx component and DotGrid.css stylesheet from the attached/component source.
3. Render an interactive dot grid background using these props:

${createUsage(settings)}

4. Preserve the existing app design system. Keep the background interactive and verify mouse movement and click shockwave behavior.

Acceptance checks:
- Dot grid fills the container and remains visible.
- Nearby dots react to fast cursor movement.
- Clicking triggers a shockwave displacement effect.
- No unrelated files are refactored.
- If the app has tests or a build command, run them and report the result.`;

export default {
  id: 'react-bits-dot-grid',
  folderId: 'motion',
  title: 'React Bits DotGrid',
  kicker: 'Interactive background',
  summary: 'Dot matrix background with hover proximity response and click-triggered shockwave motion.',
  tags: ['React', 'Canvas', 'GSAP', 'Interactive', 'Background'],
  defaults,
  controls,
  Preview,
  getCodeSections,
  getPrompt,
};
