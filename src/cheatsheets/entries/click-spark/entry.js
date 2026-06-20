import componentSource from './ClickSpark.jsx?raw';
import componentCss from './ClickSpark.css?raw';
import previewSource from './Preview.jsx?raw';
import previewCss from './preview.css?raw';
import Preview from './Preview.jsx';
import { noDependencyInstall, propLine } from '../../utils.js';

const defaults = {
  sparkColor: '#ffffff',
  sparkSize: 10,
  sparkRadius: 15,
  sparkCount: 8,
  duration: 400,
  extraScale: 1,
};

const controls = [
  { key: 'sparkSize', label: 'Spark Size', min: 2, max: 40, step: 1 },
  { key: 'sparkRadius', label: 'Spark Radius', min: 4, max: 80, step: 1 },
  { key: 'sparkCount', label: 'Spark Count', min: 3, max: 24, step: 1 },
  { key: 'duration', label: 'Duration (ms)', min: 120, max: 1600, step: 10 },
  { key: 'extraScale', label: 'Extra Scale', min: 0.3, max: 3, step: 0.05 },
];

const createUsage = settings => {
  const orderedKeys = ['sparkColor', 'sparkSize', 'sparkRadius', 'sparkCount', 'duration', 'extraScale'];
  const props = orderedKeys.map(key => propLine(key, settings[key])).join('\n');

  return `import ClickSpark from './ClickSpark';

export default function SparkButton() {
  return (
    <div style={{ minHeight: '320px', display: 'grid', placeItems: 'center', background: '#0f0f10', padding: '40px' }}>
      <ClickSpark
${props}
      >
        <button type="button" style={{ minHeight: '56px', padding: '0 28px', color: '#f4f4f5', background: 'rgba(18,18,20,0.82)', border: '1px solid rgba(255,255,255,0.24)', borderRadius: '999px', fontWeight: 900 }}>
          click me
        </button>
      </ClickSpark>
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
    label: 'ClickSpark.jsx',
    language: 'jsx',
    code: componentSource,
  },
  {
    id: 'css',
    label: 'ClickSpark.css',
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

Component: ClickSpark
Variant: JavaScript + CSS
Dependencies: none

Target project: ${target.projectPath || '[paste project path here]'}
Target placement: ${target.placement || '[describe where this should appear]'}
Framework notes: ${target.framework || 'React/Vite-style app; adapt paths to the existing structure.'}

Task:
1. Add the ClickSpark.jsx component and ClickSpark.css stylesheet from the attached/component source.
2. Render a clickable preview surface with a centered button using these props:

${createUsage(settings)}

3. Preserve the existing app design system. Keep the canvas overlay non-blocking and verify spark bursts appear at click position.

Acceptance checks:
- Clicking the preview shows visible spark lines.
- Spark color/size/radius/count change based on props.
- No unrelated files are refactored.
- If the app has tests or a build command, run them and report the result.`;

export default {
  id: 'react-bits-click-spark',
  folderId: 'motion',
  title: 'React Bits ClickSpark',
  kicker: 'Pointer effect',
  summary: 'Canvas spark burst on click for buttons, cards, and interactive surfaces.',
  tags: ['React', 'Canvas', 'Click', 'Effect'],
  defaults,
  controls,
  Preview,
  getCodeSections,
  getPrompt,
};
