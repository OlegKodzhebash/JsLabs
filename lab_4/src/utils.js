/**
 * Вспомогательные функции
 * @module utils
 */

/**
 * Генерирует уникальный ID
 * @return {string} Сгенерированный ID
 */
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Форматирует дату в читаемый вид
 * @param {Date} date - Дата для форматирования
 * @return {string} Отформатированная дата
 */
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};