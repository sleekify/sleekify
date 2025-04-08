export class StringUtil {
  public static getHashCode (text?: string): number {
    let value = 0;

    if (text == null) {
      return value;
    }

    for (let index = 0; index < text.length; index++) {
      value = ((value << 5) - value) + text.charCodeAt(index);
      value |= 0;
    }

    return value;
  }
}
