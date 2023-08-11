export default class StringUtil {
  static shortenText(txt: string, numberOfChars: number, suffix = "...") {
    if (txt.length > numberOfChars) {
      return txt.slice(0, numberOfChars) + suffix;
    }

    return txt;
  };
};