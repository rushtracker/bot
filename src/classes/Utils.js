import { readdirSync, statSync } from 'fs';

export default class Utils {
  getFiles(path, extensions = []) {
    const files = readdirSync(path);
    let result = [];

    for (const file of files) {
      const filePath = `${path}/${file}`;
      if (statSync(filePath).isDirectory()) result = result.concat(this.getFiles(filePath, extensions));
      else if (!extensions.length || extensions.some((ext) => filePath.endsWith(ext))) result.push(filePath);
    }

    return result;
  }

  joinCustomLastWord(arr, conjunction = ', ', lastConjunction = ' et ') {
    if (!arr.length) return '';

    switch(arr.length) {
      case 1:
        return arr[0];
      case 2:
        return arr.join(lastConjunction);
      default:
        const allButLast = arr.slice(0, -1).join(conjunction);
        const last = arr[arr.length - 1];

        return `${allButLast}${lastConjunction}${last}`;
    }
  }
}
