export function dateFormat(initialDate: string): string {
  return new Date(initialDate).toLocaleString('cs-CZ', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}