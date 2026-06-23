import componentSource from './DotField.jsx?raw';
import componentCss from './DotField.css?raw';
import previewSource from './Preview.jsx?raw';
import previewCss from './preview.css?raw';
import Preview from './Preview.jsx';
import { noDependencyInstall, propLine } from '../../utils.js';

const defaults = {
  dotRadius: 1.5,
  dotSpacing: 14,
  cursorRadius: 500,
  cursorForce: 0.1,
  bulgeOnly: true,
  bulgeStrength: 67,
  glowRadius: 160,
  sparkle: false,
  waveAmplitude: 0,
  gradientFrom: 'rgba(168, 85, 247, 0.35)',
  gradientTo: 'rgba(180, 151, 207, 0.25)',
  glowColor: '#120F17',
};

const controls = [
  { key: 'dotRadius', label: 'Dot Radius', min: 0.5, max: 5, step: 0.1 },
  { key: 'dotSpacing', label: 'Dot Spacing', min: 5, max: 40, step: 1 },
  { key: 'cursorRadius', label: 'Cursor Radius', min: 100, max: 800, step: 50 },
  { key: 'bulgeStrength', label: 'Bulge Strength', min: 10, max: 150, step: 5 },
  { key: 'glowRadius', label: 'Glow Radius', min: 50, max: 300, step: 10 },
  { key: 'waveAmplitude', label: 'Wave Amplitude', min: 0, max: 30, step: 1 },
  { key: 'sparkle', label: 'Sparkle Effect', control: 'toggle' },
];

const createUsage = settings => {
  const orderedKeys = [
    'dotRadius',
    'dotSpacing',
    'bulgeStrength',
    'glowRadius',
    'sparkle',
    'waveAmplitude',
  ];

  const props = orderedKeys.map(key => propLine(key, settings[key])).join('\n');

  return `import DotField from './DotField';

export default function InteractiveBackground() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <DotField
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
    label: 'DotField.jsx',
    language: 'jsx',
    code: componentSource,
  },
  {
    id: 'css',
    label: 'DotField.css',
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

Component: DotField
Variant: JavaScript + Canvas + SVG
Dependencies: none

Target project: ${target.projectPath || '[paste project path here]'}
Target placement: ${target.placement || '[describe where this should appear]'}
Framework notes: ${target.framework || 'React/Vite-style app; adapt paths to the existing structure.'}

Task:
1. Add the DotField.jsx component and DotField.css stylesheet from the attached/component source.
2. Render an interactive dot field background using these props:

${createUsage(settings)}

3. Preserve the existing app design system. The component should fill its container and respond to mouse movement with a bulging/interactive dot effect.

Acceptance checks:
- The dot field renders and fills the container properly.
- Dots respond to mouse movement with the bulge effect.
- The glow effect follows the cursor.
- No unrelated files are refactored.
- If the app has tests or a build command, run them and report the result.`;

export default {
  id: 'react-bits-dot-field',
  folderId: 'motion',
  title: 'React Bits DotField',
  kicker: 'Interactive background',
  summary: 'Interactive dot grid that responds to mouse movement with bulging and wave effects.',
  tags: ['React', 'Canvas', 'SVG', 'Interactive', 'Background'],
  defaults,
  controls,
  Preview,
  getCodeSections,
  getPrompt,
};
