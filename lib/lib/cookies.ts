export const cookies = (text = document.cookie) =>
  text
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      if (!v.filter(Boolean).length) return acc;
      const key = decodeURIComponent(v[0].trim());
      const value = decodeURIComponent(v[1].trim());
      acc.set(key, value);
      return acc;
    }, new Map<string, string>());
