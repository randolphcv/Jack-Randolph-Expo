export const propLine = (key, value) => {
  if (Array.isArray(value)) {
    return `    colors={[${value.map(color => `"${color}"`).join(', ')}]}`;
  }
  if (typeof value === 'boolean') {
    return value ? `    ${key}` : `    ${key}={false}`;
  }
  if (typeof value === 'string') {
    return `    ${key}="${value}"`;
  }
  return `    ${key}={${Number(value.toFixed ? value.toFixed(3) : value)}}`;
};

export const noDependencyInstall = 'No external dependencies required.';
