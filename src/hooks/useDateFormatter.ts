export function useDateFormatter(initialDate: string): string {
  return new Date(initialDate).toLocaleString()
}