/**
 * Форматирование даты и времени
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export default function dateTimeFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.DateTimeFormat(locale, options).format(value);
}
