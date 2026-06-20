import componentSource from './BorderGlow.jsx?raw';
import componentCss from './BorderGlow.css?raw';
import previewSource from './Preview.jsx?raw';
import previewCss from './preview.css?raw';
import Preview from './Preview.jsx';
import { noDependencyInstall, propLine } from '../../utils.js';

const defaults = {
  edgeSensitivity: 30,
  glowColor: '40 80 80',
  backgroundColor: '#120F17',
  borderRadius: 28,
  glowRadius: 40,
  glowIntensity: 1.0,
  coneSpread: 25,
  fillOpacity: 0.5,
  colors: ['#c084fc', '#f472b6', '#38bdf8'],
};

const controls = [
  { key: 'edgeSensitivity', label: 'Edge Sensitivity', min: 0, max: 100, step: 1 },
  { key: 'borderRadius', label: 'Border Radius', min: 0, max: 80, step: 1 },
  { key: 'glowRadius', label: 'Glow Radius', min: 0, max: 120, step: 1 },
  { key: 'glowIntensity', label: 'Glow Intensity', min: 0.1, max: 3, step: 0.05 },
  { key: 'coneSpread', label: 'Cone Spread', min: 5, max: 45, step: 1 },
  { key: 'fillOpacity', label: 'Fill Opacity', min: 0, max: 1, step: 0.05 },
];

const createUsage = settings => {
  const orderedKeys = [
    'edgeSensitivity',
    'glowColor',
    'backgroundColor',
    'borderRadius',
    'glowRadius',
    'glowIntensity',
    'coneSpread',
    'fillOpacity',
    'colors',
  ];

  const props = orderedKeys.map(key => propLine(key, settings[key])).join('\n');

  return `import BorderGlow from './BorderGlow';

export default function FancyButton() {
  return (
    <div style={{ minHeight: '360px', display: 'grid', placeItems: 'center', background: '#000', padding: '48px' }}>
      <BorderGlow
${props}
      >
        <button type="button" style={{ padding: '1.6rem 1.6rem', color: '#f4f4f5', background: '#000', border: 0, borderRadius: '20px', fontWeight: 900 }}>
          fancy
        </button>
      </BorderGlow>
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
    label: 'BorderGlow.jsx',
    language: 'jsx',
    code: componentSource,
  },
  {
    id: 'css',
    label: 'BorderGlow.css',
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

Component: BorderGlow
Variant: JavaScript + CSS
Dependencies: none

Target project: ${target.projectPath || '[paste project path here]'}
Target placement: ${target.placement || '[describe where this should appear]'}
Framework notes: ${target.framework || 'React/Vite-style app; adapt paths to the existing structure.'}

Task:
1. Add the BorderGlow.jsx component and BorderGlow.css stylesheet from the attached/component source.
2. Render a black-background preview/button using these props and the button text "fancy":

${createUsage(settings)}

3. Preserve the existing app design system. Keep the black preview surface, make the button responsive, and verify the hover/edge glow works with pointer movement.

Acceptance checks:
- The button text is exactly "fancy".
- The preview/background around the button is black.
- The glow appears near the button edge when the cursor moves over it.
- No unrelated files are refactored.
- If the app has tests or a build command, run them and report the result.`;

export default {
  id: 'react-bits-border-glow',
  folderId: 'motion',
  title: 'React Bits BorderGlow',
  kicker: 'Button effect',
  summary: 'Interactive edge glow wrapper for buttons, cards, and compact UI surfaces.',
  tags: ['React', 'CSS', 'Hover', 'Button'],
  defaults,
  controls,
  Preview,
  getCodeSections,
  getPrompt,
};
