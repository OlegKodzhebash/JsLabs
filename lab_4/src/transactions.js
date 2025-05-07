/**
 * Модуль для работы с транзакциями
 * @module transactions
 */

/** Массив транзакций */
let transactions = [];

/**
 * Добавляет новую транзакцию в массив
 * @param {Object} transaction - Объект транзакции
 * @param {string} transaction.id - Уникальный идентификатор
 * @param {Date} transaction.date - Дата и время транзакции
 * @param {number} transaction.amount - Сумма транзакции
 * @param {string} transaction.category - Категория транзакции
 * @param {string} transaction.description - Описание транзакции
 */
export const addTransaction = (transaction) => {
    transactions.push(transaction);
};

/**
 * Удаляет транзакцию по ID
 * @param {string} id - ID транзакции для удаления
 */
export const deleteTransaction = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id);
};

/**
 * Возвращает все транзакции
 * @return {Array} Массив транзакций
 */
export const getTransactions = () => {
    return transactions;
};

/**
 * Возвращает транзакцию по ID
 * @param {string} id - ID транзакции
 * @return {Object|null} Найденная транзакция или null
 */
export const getTransactionById = (id) => {
    return transactions.find(transaction => transaction.id === id) || null;
};

/**
 * Вычисляет общую сумму транзакций
 * @return {number} Общая сумма
 */
export const calculateTotal = () => {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
};