import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  Code2,
  Construction,
  Copy,
  Eye,
  FileCode2,
  Folder,
  FolderOpen,
  Home,
  Paintbrush,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  TerminalSquare,
} from 'lucide-react';
import { cheatsheetEntries, cheatsheetFolders } from './cheatsheets/index.js';

const assetBase = import.meta.env.BASE_URL;

const appShellStyle = {
  '--body-skull-url': `url(${assetBase}assets/skull-mark.png)`,
  '--hero-portrait-url': `url(${assetBase}assets/hero-portrait.png)`,
  '--leaf-corner-url': `url(${assetBase}assets/leaf-corner.png)`,
  '--projects-skull-url': `url(${assetBase}assets/skull-mark.png)`,
  '--botanical-frame-url': `url(${assetBase}assets/botanical-frame.png)`,
};

const lockupImageUrl = `${assetBase}assets/jack-randolph-lockup.png`;
const lighthousePosterUrl = `${assetBase}assets/lighthouse-poster.jpg`;

const navItems = [
  { id: 'home', label: 'home', Icon: Home },
  { id: 'projects', label: 'projects', Icon: Construction },
  { id: 'cheatsheets', label: 'cheatsheets', Icon: FileCode2 },
];

const tabItems = [
  { id: 'preview', label: 'preview', Icon: Eye },
  { id: 'code', label: 'code', Icon: Code2 },
  { id: 'prompt', label: 'prompt', Icon: TerminalSquare },
];

function copyToClipboard(text, setCopied, id) {
  navigator.clipboard?.writeText(text).then(() => {
    setCopied(id);
    window.setTimeout(() => setCopied(''), 1400);
  });
}

function NumberControl({ control, value, disabled, onChange }) {
  return (
    <label className={`control-row ${disabled ? 'is-disabled' : ''}`}>
      <span>
        {control.label}
        <strong>{Number(value).toFixed(control.step < 0.1 ? 2 : 1)}</strong>
      </span>
      <input
        disabled={disabled}
        type="range"
        min={control.min}
        max={control.max}
        step={control.step}
        value={value}
        onChange={event => onChange(control.key, Number(event.target.value))}
      />
    </label>
  );
}

function ColorControl({ color, index, onChange, label = 'Palette color' }) {
  return (
    <label className="color-chip">
      <input
        type="color"
        value={color}
        aria-label={`${label} ${index + 1}`}
        onChange={event => onChange(index, event.target.value)}
      />
      <span>{color}</span>
    </label>
  );
}

function CodeBlock({ section, copied, onCopy }) {
  return (
    <article className="code-section">
      <div className="code-section__header">
        <span>{section.label}</span>
        <button type="button" className="icon-button" onClick={() => onCopy(section.code, section.id)}>
          {copied === section.id ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied === section.id ? 'copied' : 'copy'}</span>
        </button>
      </div>
      <pre>
        <code>{section.code}</code>
      </pre>
    </article>
  );
}

function PreviewPane({ entry, settings }) {
  const Preview = entry.Preview;
  return <Preview settings={settings} />;
}

function CustomizePane({ entry, settings, setSettings }) {
  const hasPaletteControls = Boolean(settings.colors?.length || entry.toggles?.length);

  const updateSetting = (key, value) => {
    setSettings(current => ({ ...current, [key]: value }));
  };

  const updateColor = (index, color) => {
    setSettings(current => ({
      ...current,
      colors: current.colors.map((item, itemIndex) => (itemIndex === index ? color : item)),
    }));
  };

  return (
    <section className="customize-section" id="customize-panel" aria-label="Customize effect">
      <div className="customize-section__bar">
        <span>
          <SlidersHorizontal size={17} />
          Customize
        </span>
      </div>
      <div className="customize-grid">
        {hasPaletteControls ? (
          <section className="customize-panel">
            <div className="panel-heading">
              <Paintbrush size={18} />
              <h3>Palette</h3>
            </div>
            {settings.colors?.length ? (
              <div className="color-grid">
                {settings.colors.map((color, index) => (
                  <ColorControl
                    key={`${color}-${index}`}
                    color={color}
                    index={index}
                    label={entry.title}
                    onChange={updateColor}
                  />
                ))}
              </div>
            ) : null}
            {entry.toggles?.map(toggle => (
              <label key={toggle.key} className="toggle-row">
                <input
                  type="checkbox"
                  checked={Boolean(settings[toggle.key])}
                  onChange={event => updateSetting(toggle.key, event.target.checked)}
                />
                <span>{toggle.label}</span>
              </label>
            ))}
          </section>
        ) : null}
        <section className="customize-panel controls-panel">
          <div className="panel-heading">
            <SlidersHorizontal size={18} />
            <h3>Parameters</h3>
          </div>
          {entry.controls.map(control => (
            <NumberControl
              key={control.key}
              control={control}
              value={settings[control.key]}
              disabled={control.glassOnly && !settings.glass}
              onChange={updateSetting}
            />
          ))}
        </section>
      </div>
    </section>
  );
}

function CodePane({ entry, settings, copied, setCopied }) {
  const sections = useMemo(() => entry.getCodeSections(settings), [entry, settings]);
  return (
    <div className="code-stack">
      {sections.map(section => (
        <CodeBlock
          key={section.id}
          section={section}
          copied={copied}
          onCopy={(text, id) => copyToClipboard(text, setCopied, id)}
        />
      ))}
    </div>
  );
}

function PromptPane({ entry, settings, copied, setCopied }) {
  const [target, setTarget] = useState({
    projectPath: '',
    placement: 'Add this as a visual effect in the hero or feature section.',
    framework: 'React app with JavaScript and CSS modules/global CSS available.',
  });
  const prompt = entry.getPrompt(settings, target);

  const updateTarget = (key, value) => {
    setTarget(current => ({ ...current, [key]: value }));
  };

  return (
    <div className="prompt-layout">
      <div className="prompt-fields">
        <label>
          <span>Project path</span>
          <input
            value={target.projectPath}
            placeholder="/path/to/project"
            onChange={event => updateTarget('projectPath', event.target.value)}
          />
        </label>
        <label>
          <span>Placement</span>
          <input value={target.placement} onChange={event => updateTarget('placement', event.target.value)} />
        </label>
        <label>
          <span>Framework notes</span>
          <textarea value={target.framework} onChange={event => updateTarget('framework', event.target.value)} />
        </label>
      </div>
      <article className="code-section prompt-output">
        <div className="code-section__header">
          <span>Codex Prompt</span>
          <button type="button" className="icon-button" onClick={() => copyToClipboard(prompt, setCopied, 'prompt')}>
            {copied === 'prompt' ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied === 'prompt' ? 'copied' : 'copy'}</span>
          </button>
        </div>
        <pre>
          <code>{prompt}</code>
        </pre>
      </article>
    </div>
  );
}

function CheatsheetWorkspace() {
  const [folderId, setFolderId] = useState(cheatsheetFolders[0].id);
  const visibleEntries = cheatsheetEntries.filter(entry => entry.folderId === folderId);
  const [entryId, setEntryId] = useState(visibleEntries[0].id);
  const entry = cheatsheetEntries.find(item => item.id === entryId) || visibleEntries[0];
  const [mode, setMode] = useState('preview');
  const [settings, setSettings] = useState(entry.defaults);
  const [copied, setCopied] = useState('');

  const selectFolder = nextFolderId => {
    const nextEntry = cheatsheetEntries.find(item => item.folderId === nextFolderId);
    setFolderId(nextFolderId);
    if (nextEntry) {
      setEntryId(nextEntry.id);
      setSettings(nextEntry.defaults);
      setMode('preview');
    }
  };

  const renderPane = () => {
    if (mode === 'code') return <CodePane entry={entry} settings={settings} copied={copied} setCopied={setCopied} />;
    return <PromptPane entry={entry} settings={settings} copied={copied} setCopied={setCopied} />;
  };

  return (
    <div className={`cheatsheet-shell ${mode === 'preview' ? 'is-preview' : 'is-full'}`}>
      <aside className="folder-panel" aria-label="Cheatsheet folders">
        <div className="folder-panel__title">
          <Folder size={18} />
          <span>Folders</span>
        </div>
        {cheatsheetFolders.map(folder => {
          const isActiveFolder = folder.id === folderId;
          const folderEntries = cheatsheetEntries.filter(entryItem => folder.entries.includes(entryItem.id));

          return (
            <div key={folder.id} className={`folder-group ${isActiveFolder ? 'is-open' : ''}`}>
              <button
                type="button"
                className={`folder-button ${isActiveFolder ? 'is-active' : ''}`}
                onClick={() => selectFolder(folder.id)}
              >
                {isActiveFolder ? <FolderOpen size={18} /> : <Folder size={18} />}
                <span>{folder.name}</span>
              </button>
              <div className="folder-children" aria-hidden={!isActiveFolder}>
                {folderEntries.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    className={`entry-button ${item.id === entry.id ? 'is-active' : ''}`}
                    onClick={() => {
                      setEntryId(item.id);
                      setSettings(item.defaults);
                      setMode('preview');
                    }}
                  >
                    <span>{item.kicker}</span>
                    <strong>{item.title}</strong>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </aside>

      <main className="entry-workspace">
        <header className="entry-header">
          <div>
            <span className="eyebrow">{entry.kicker}</span>
            <h2>{entry.title}</h2>
            <p>{entry.summary}</p>
            <div className="tag-row">
              {entry.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <button type="button" className="reset-button" onClick={() => setSettings(entry.defaults)}>
            <RotateCcw size={16} />
            <span>reset</span>
          </button>
        </header>

        <div className="mode-bar">
          <nav className="mode-tabs" aria-label="Cheatsheet entry views">
            {tabItems.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className={mode === id ? 'is-active' : ''}
                onClick={() => setMode(id)}
              >
                <Icon size={17} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {mode === 'preview' ? (
          <div className="entry-view-frame">
            <PreviewPane entry={entry} settings={settings} />
          </div>
        ) : (
          <div className="entry-view-frame">{renderPane()}</div>
        )}
      </main>
      {mode === 'preview' ? (
        <aside className="parameters-panel" aria-label="Customize effect">
          <CustomizePane entry={entry} settings={settings} setSettings={setSettings} />
        </aside>
      ) : null}
    </div>
  );
}

export default function App() {
  const [isNavHidden, setIsNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (Math.abs(delta) < 4) return;

      if (currentScrollY <= 20) {
        setIsNavHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      const shouldHide = delta > 0;
      setIsNavHidden(current => (current === shouldHide ? current : shouldHide));
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app-shell" style={appShellStyle}>
      <header className={`site-nav ${isNavHidden ? 'is-hidden' : 'is-visible'}`}>
        <a className="brand-mark" href="#home" aria-label="Jack Randolph home">
          <img src={lockupImageUrl} alt="" />
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map(({ id, label, Icon }) => (
            <a key={id} href={`#${id}`}>
              <Icon size={16} />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="spark-label">
            <Sparkles size={18} />
            Video. Design. Software.
          </p>
          <h1>Jack Randolph</h1>
          <p className="hero-copy">
            Public portfolio, software shelf, and private coding cheatsheet vault.
          </p>
          <div className="hero-actions">
            <a href="#projects">projects</a>
            <a href="#cheatsheets">cheatsheets</a>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="section-heading">
          <span className="eyebrow">Projects</span>
          <h2>Under construction.</h2>
        </div>
        <div className="construction-panel">
          <div className="construction-art">
            <img src={lighthousePosterUrl} alt="Lighthouse artwork from the Jack Randolph visual assets" />
            <div className="construction-badge">
              <Construction size={34} />
              <span>building</span>
            </div>
          </div>
          <div className="construction-copy">
            <p>Software releases, tools, experiments, and sellable project pages will live here.</p>
            <div className="mini-list">
              <span>making lists.</span>
              <span>describing things.</span>
              <span>being obnoxious.</span>
            </div>
          </div>
        </div>
      </section>

      <section id="cheatsheets" className="cheatsheets-section">
        <div className="section-heading">
          <span className="eyebrow">Cheatsheets</span>
          <h2>Reusable code, live.</h2>
        </div>
        <CheatsheetWorkspace />
      </section>
    </div>
  );
}
