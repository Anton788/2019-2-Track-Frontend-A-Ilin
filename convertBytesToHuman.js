/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  // your solution goes here
  if (typeof (bytes) != 'number' || bytes == Infinity || bytes < 0 || bytes == NaN){
    return "Некорректный ввод";
  }
  let human_number = bytes;
  let count = 0;
  while (Math.floor(human_number / 1024) != 0){
    ++count;
    human_number = human_number / 1024.0;
  }
  human_number = (human_number.toFixed(2));
  human_number *= 100;
  human_number /= 100;
  switch (count) {
    case 0:
      return human_number + " " + "B";
    case 1:
      return human_number + " " + "KB";
    case 2:
      return human_number + " " + "MB";
    case 3:
      return human_number + " " + "GB";
    case 4:
      return human_number + " " + "TB";
    default:
      return "very big number";
  }
}
