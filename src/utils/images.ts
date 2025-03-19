export const getImageUrl = (imagePath: string): string => {
  const backendUrl = 'http://localhost:3500';
  return `${backendUrl}/uploads/images/${imagePath}`;
};