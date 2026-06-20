import componentSource from './GradualBlur.jsx?raw';
import componentCss from './GradualBlur.css?raw';
import previewSource from './Preview.jsx?raw';
import previewCss from './preview.css?raw';
import Preview from './Preview.jsx';
import { propLine } from '../../utils.js';

const defaults = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: true,
  curve: 'bezier',
  opacity: 1,
  animated: 'scroll',
  duration: '0.3s',
  easing: 'ease-out',
  target: 'parent',
  zIndex: 1000,
  responsive: false,
  preset: 'bottom',
};

const controls = [
  { key: 'strength', label: 'Strength', min: 0.5, max: 6, step: 0.1 },
  { key: 'divCount', label: 'Layer Count', min: 1, max: 12, step: 1 },
  { key: 'opacity', label: 'Opacity', min: 0, max: 1, step: 0.05 },
  { key: 'duration', label: 'Duration', min: 0.1, max: 2, step: 0.05 },
  { key: 'zIndex', label: 'Z Index', min: 0, max: 3000, step: 10 },
];

const createUsage = settings => {
  const orderedKeys = [
    'position',
    'strength',
    'height',
    'divCount',
    'exponential',
    'curve',
    'opacity',
    'animated',
    'duration',
    'easing',
    'target',
    'zIndex',
    'preset',
  ];

  const props = orderedKeys.map(key => propLine(key, settings[key])).join('\n');

  return `import GradualBlur from './GradualBlur';

export default function BlurPanel() {
  return (
    <section style={{ position: 'relative', height: 500, overflow: 'hidden', background: '#09090b' }}>
      <div style={{ height: '100%', overflowY: 'auto', padding: '6rem 2rem', color: '#f4f4f5' }}>
        <h2 style={{ marginTop: 0, fontFamily: 'var(--font-display)' }}>Content Here</h2>
        <p>
          This is the area the blur fades into. Scroll the panel to see how the bottom overlay softens the edge.
        </p>
        <p>
          Keep adding text, cards, or images below this line to match your real layout.
        </p>
      </div>

      <GradualBlur
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
    code: 'npm install mathjs',
  },
  {
    id: 'usage',
    label: 'Usage.jsx',
    language: 'jsx',
    code: createUsage(settings),
  },
  {
    id: 'component',
    label: 'GradualBlur.jsx',
    language: 'jsx',
    code: componentSource,
  },
  {
    id: 'css',
    label: 'GradualBlur.css',
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

Component: GradualBlur
Variant: JavaScript + CSS
Dependencies: mathjs

Target project: ${target.projectPath || '[paste project path here]'}
Target placement: ${target.placement || '[describe where this should appear]'}
Framework notes: ${target.framework || 'React/Vite-style app; adapt paths to the existing structure.'}

Task:
1. Install the dependency: npm install mathjs
2. Add the GradualBlur.jsx component and GradualBlur.css stylesheet from the attached/component source.
3. Render the blur overlay in a scrolling content section using these props:

${createUsage(settings)}

4. Preserve the existing app design system. Keep the overlay positioned relative to its parent container and verify the blur effect appears at the chosen edge.

Acceptance checks:
- The blur overlay is visible at the edge of the scroll area.
- Changing position, strength, divCount, and curve changes the visual fade.
- No unrelated files are refactored.
- If the app has tests or a build command, run them and report the result.`;

export default {
  id: 'react-bits-gradual-blur',
  folderId: 'motion',
  title: 'React Bits GradualBlur',
  kicker: 'Scroll blur',
  summary: 'Layered blur edge for sections, headers, footers, and scrollable containers.',
  tags: ['React', 'CSS', 'Blur', 'Scroll'],
  defaults,
  controls,
  Preview,
  getCodeSections,
  getPrompt,
};
