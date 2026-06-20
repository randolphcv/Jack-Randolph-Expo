import componentSource from './Noise.jsx?raw';
import componentCss from './Noise.css?raw';
import previewSource from './Preview.jsx?raw';
import previewCss from './preview.css?raw';
import Preview from './Preview.jsx';
import { noDependencyInstall, propLine } from '../../utils.js';

const defaults = {
  patternSize: 90,
  patternScaleX: 1,
  patternScaleY: 1,
  patternRefreshInterval: 2,
  patternAlpha: 20,
};

const controls = [
  { key: 'patternSize', label: 'Pattern Size', min: 24, max: 420, step: 1 },
  { key: 'patternScaleX', label: 'Scale X', min: 0.25, max: 6, step: 0.05 },
  { key: 'patternScaleY', label: 'Scale Y', min: 0.25, max: 6, step: 0.05 },
  { key: 'patternRefreshInterval', label: 'Refresh Frames', min: 1, max: 12, step: 1 },
  { key: 'patternAlpha', label: 'Alpha (%)', min: 0, max: 100, step: 1 },
];

const createUsage = settings => {
  const orderedKeys = ['patternSize', 'patternScaleX', 'patternScaleY', 'patternRefreshInterval', 'patternAlpha'];
  const props = orderedKeys.map(key => propLine(key, settings[key])).join('\n');

  return `import Noise from './Noise';

export default function OldSchoolNoise() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'grid', placeItems: 'center', background: '#363436' }}>
      <h2 style={{ position: 'relative', zIndex: 1, margin: 0, color: '#706c70', fontFamily: '"Cooper Black", "Bookman Old Style", Georgia, serif', fontSize: 'clamp(3rem, 12vw, 7rem)', textShadow: '0 4px 0 #151315, 0 18px 34px rgba(0, 0, 0, 0.48)' }}>
        old school
      </h2>
      <Noise
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
    label: 'Noise.jsx',
    language: 'jsx',
    code: componentSource,
  },
  {
    id: 'css',
    label: 'Noise.css',
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

Component: Noise
Variant: JavaScript + CSS
Dependencies: none

Target project: ${target.projectPath || '[paste project path here]'}
Target placement: ${target.placement || '[describe where this should appear]'}
Framework notes: ${target.framework || 'React/Vite-style app; adapt paths to the existing structure.'}

Task:
1. Add the Noise.jsx component and Noise.css stylesheet from the attached/component source.
2. Render a full-page charcoal preview with vintage text that says exactly "old school":

${createUsage(settings)}

3. Preserve the existing app design system. Keep the noise overlay spanning the full page surface and verify the grain animates without blocking pointer interaction.

Acceptance checks:
- The visible text says exactly "old school".
- The text uses a vintage/display serif style.
- The background is charcoal, and the text is slightly lighter with a near-black drop shadow.
- The noise is visible across the full page surface.
- No unrelated files are refactored.
- If the app has tests or a build command, run them and report the result.`;

export default {
  id: 'react-bits-noise',
  folderId: 'motion',
  title: 'React Bits Noise',
  kicker: 'Texture effect',
  summary: 'Animated pixel grain overlay for vintage, filmic, and distressed UI treatments.',
  tags: ['React', 'Canvas', 'Texture', 'Vintage'],
  defaults,
  controls,
  Preview,
  getCodeSections,
  getPrompt,
};
