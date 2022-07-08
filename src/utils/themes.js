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
