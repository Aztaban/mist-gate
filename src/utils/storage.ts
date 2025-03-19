export const setPersistState = (value: boolean) => {
  localStorage.setItem('persist', JSON.stringify(value));
};