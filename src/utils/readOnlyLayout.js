export const millisecondsToMinute = (milliseconds = 0) => {
  // or get (milliseconds) / 60000).toString().split(".")[1]
  // .5645645 * 60
  //.890833333333333 *60 with Math.round
  let minutes = Math.floor(milliseconds / 60000);
  let seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return {
    minutes,
    seconds: `${seconds < 10 ? "0" : ""}${seconds}`,
  };
};
