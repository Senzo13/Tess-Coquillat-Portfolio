export const transformUrlImageToBlob = async (url) => {
  const response = await fetch(url);
  return await response.blob();
};
