export function eurFormat(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
  })
    .format(value / 100)
    .replace('EUR', '€ ');
}