export const trimBase64Data = (data: string): string =>
  data.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

export const convertBlobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const result = reader.result as string;
      const fileBase64 = trimBase64Data(result);
      resolve(fileBase64);
    };
    reader.readAsDataURL(blob);
  });

export const convertBase64toBlob = async (base64: string): Promise<Blob> => {
  const base64Response = await fetch(`data:image/png;base64,${base64}`);
  const blob = await base64Response.blob();
  return blob;
};
