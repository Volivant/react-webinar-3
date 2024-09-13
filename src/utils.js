const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export function generateUniqCode(code) {
  return Math.max(...code)+1;
}

export function caseNumber(number) {
  const arrNumber = Array.from(String(number)).map(i=>Number(i))
  const lastDigit = arrNumber[arrNumber.length-1];
  const secondToLastDigit = (number < 10 ? 0 : arrNumber[arrNumber.length-2]);
  if (secondToLastDigit == 1) {
    return 'раз';
  } else {
    switch (lastDigit) {
      case 2:
      case 3:
      case 4:
        return 'раза';
      default:
        return 'раз';
    }
  }

}
