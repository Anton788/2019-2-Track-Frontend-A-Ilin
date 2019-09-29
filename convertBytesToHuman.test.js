/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-7)).toBe("Некорректный ввод")
  expect(convertBytesToHuman("our_string")).toBe("Некорректный ввод")
  expect(convertBytesToHuman(false)).toBe("Некорректный ввод")
  expect(convertBytesToHuman(-1/0)).toBe("Некорректный ввод")
  expect(convertBytesToHuman(1/0)).toBe("Некорректный ввод")
  // ...
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(8)).toBe("8 B")
  expect(convertBytesToHuman(1024)).toBe("1 KB")
  expect(convertBytesToHuman(123123123)).toBe("117.42 MB")
  // ...
});

// другая группа проверок
