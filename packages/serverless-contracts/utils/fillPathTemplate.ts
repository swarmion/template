export const fillPathTemplate = (
  template: string,
  values?: Record<string, string>,
): string =>
  values === undefined
    ? template
    : Object.entries(values).reduce((accumulator, [key, value]) => {
        const re = new RegExp(`{${key}}`, 'g');

        return accumulator.replace(re, value);
      }, template);
