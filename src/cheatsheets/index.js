import strandsEntry from './entries/strands/entry.js';
import borderGlowEntry from './entries/border-glow/entry.js';
import noiseEntry from './entries/noise/entry.js';
import clickSparkEntry from './entries/click-spark/entry.js';
import gradualBlurEntry from './entries/gradual-blur/entry.js';
import masonryEntry from './entries/masonry/entry.js';
import glassSurfaceEntry from './entries/glass-surface/entry.js';
import dotFieldEntry from './entries/dot-field/entry.js';
import dotGridEntry from './entries/dot-grid/entry.js';

export const cheatsheetFolders = [
  {
    id: 'motion',
    name: 'Motion Effects',
    description: 'Interactive visual effects and animated interface pieces.',
    entries: ['react-bits-strands', 'react-bits-border-glow', 'react-bits-noise', 'react-bits-click-spark', 'react-bits-gradual-blur', 'react-bits-masonry', 'react-bits-glass-surface', 'react-bits-dot-field', 'react-bits-dot-grid'],
  },
];

export const cheatsheetEntries = [
  strandsEntry,
  borderGlowEntry,
  noiseEntry,
  clickSparkEntry,
  gradualBlurEntry,
  masonryEntry,
  glassSurfaceEntry,
  dotFieldEntry,
  dotGridEntry,
];
