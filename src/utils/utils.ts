export function dateFormat(initialDate: string): string {
  return new Date(initialDate).toLocaleString();
}

export function eurFormat(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
 }

export const setPersistState = (value: boolean) => {
  localStorage.setItem('persist', JSON.stringify(value));
};
