export const percentToHex = (percent = 0) => {
  if (percent < 0 || percent > 100)
    throw new Error("Only you can pass between 0 and 100");
  const unitPercent = 255 / 100;
  const valueRgb = Math.round(percent * unitPercent);
  const missingZero = percent >= 0 && percent < 7 ? "0" : "";
  return `${missingZero}${valueRgb.toString(16)}`;
};
export const hexToPercent = (hex) => {
  // const validatedHex = Math.max(0, Math.min(hex, 255));
  const RgbNum = parseInt(hex, 16);
  const unitPercent = 255 / 100;
  return Math.round(RgbNum / unitPercent);
};

export const getAllPixelsFromImgId = (imageElementId = "") => {
  return new Promise((resolve, reject) => {
    if (!imageElementId)
      return reject("you need to provide an id of your image element <img/>");
    const d = document;
    const $img = d.getElementById(imageElementId);
    if (!$img) return reject(`image not found, check the id out: ${$img}`);
    const $canvas = d.createElement("canvas");
    $img.onload = function () {
      const width = ($canvas.width = $img.width);
      const height = ($canvas.height = $img.height);
      let rgbaPixelString = [];
      const ctx = $canvas.getContext("2d");
      ctx.drawImage($img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const frameLength = imageData.data.length;
      for (let i = 0; i < frameLength; i += 4) {
        rgbaPixelString.push(
          // r , g , b
          `${imageData.data[i]}, ${imageData.data[i + 1]}, ${
            imageData.data[i + 2]
          }`
          //  ${imageData.data[i + 3]} alpha
        );
      }
      return resolve(rgbaPixelString); // must return all pixels color: ;
    };
    $img.onerror = (e) => reject(new Error(`${e.type}: loaging image`));
    //return rgbaPixelString  --me devuelve array vacío
  });
};
