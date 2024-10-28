export function countTaxFree(value: number): number {
  return value / 1.21;
}

export function dateFormat(initialDate: string): string {
  return new Date(initialDate).toLocaleString('cs-CZ', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}

export function eurFormat(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
  }).format(value).replace('EUR', '€ ');;
}

export const setPersistState = (value: boolean) => {
  localStorage.setItem('persist', JSON.stringify(value));
};
