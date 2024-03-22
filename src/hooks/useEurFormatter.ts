export function useEurFormatter(locale: string = 'en-GB', currency: string = 'EUR'): (value: number) => string {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  return formatCurrency;
}