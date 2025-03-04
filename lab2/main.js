const transactions = [
    {
        transaction_id: 1,
        transaction_date: "2023-10-01",
        transaction_amount: 100.50,
        transaction_type: "debit",
        transaction_description: "Grocery shopping",
        merchant_name: "SuperMart",
        card_type: "debit"
    },
    {
        transaction_id: 2,
        transaction_date: "2023-10-02",
        transaction_amount: 200.75,
        transaction_type: "credit",
        transaction_description: "Online purchase",
        merchant_name: "OnlineStore",
        card_type: "credit"
    },
    {
        transaction_id: 3,
        transaction_date: "2023-10-03",
        transaction_amount: 50.00,
        transaction_type: "debit",
        transaction_description: "Coffee shop",
        merchant_name: "CoffeeTime",
        card_type: "debit"
    },
    // по неодходимости будем добавлять транзакции, в данной части кода был реализован массив транзакций
];

// Создание пустого массива.
const emptyTransactions = [];

// Массив с 1 транзакцией.
const singleTransaction = [
    {
        transaction_id: "1",
        transaction_date: "2024-01-20",
        transaction_amount: 70.00,
        transaction_type: "credit",
        transaction_description: "Оплата за услуги",
        merchant_name: "AppleMusic",
        card_type: "credit"
    }
]; 

// 1. Возвращает массив уникальных типов транзакций

/**
 * Возвращает массив уникальных типов транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {Array} Массив уникальных типов транзакций.
 */

function getUniqueTransactionTypes(transactions) {
    const types = new Set(transactions.map(t => t.transaction_type));
    return Array.from(types);
}

// 2. Вычисляет сумму всех транзакций

/**
 * Вычисляет общую сумму всех транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number} Общая сумма транзакций.
 */

function calculateTotalAmount(transactions) {
    return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

// 3. Вычисляет общую сумму транзакций за указанный год, месяц и день [extra]

/**
 * Вычисляет общую сумму транзакций за указанный год, месяц и день.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {number} [year] - Год для фильтрации (необязательный).
 * @param {number} [month] - Месяц для фильтрации (необязательный).
 * @param {number} [day] - День для фильтрации (необязательный).
 * @returns {number} Общая сумма транзакций за указанный период.
 */

function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions.filter(t => {
        const date = new Date(t.transaction_date);
        return (!year || date.getFullYear() === year) &&
               (!month || date.getMonth() + 1 === month) &&
               (!day || date.getDate() === day);
    }).reduce((sum, t) => sum + t.transaction_amount, 0);
}

// 4. Возвращает транзакции указанного типа (debit или credit)

/**
 * Возвращает транзакции указанного типа (debit или credit).
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} type - Тип транзакции ("debit" или "credit").
 * @returns {Array} Массив транзакций указанного типа.
 */

function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
}

// 5. Возвращает массив транзакций, проведенных в указанном диапазоне дат

/**
 * Возвращает массив транзакций, проведенных в указанном диапазоне дат.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} startDate - Начальная дата диапазона (в формате "YYYY-MM-DD").
 * @param {string} endDate - Конечная дата диапазона (в формате "YYYY-MM-DD").
 * @returns {Array} Массив транзакций в указанном диапазоне дат.
 */

function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter(t => {
        const date = new Date(t.transaction_date);
        return date >= start && date <= end;
    });
}

// 6. Возвращает массив транзакций, совершенных с указанным merchantName

/**
 * Возвращает массив транзакций, совершенных с указанным merchantName.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} merchantName - Название магазина или сервиса.
 * @returns {Array} Массив транзакций, совершенных с указанным merchantName.
 */

function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(t => t.merchant_name === merchantName);
}

// 7. Возвращает среднее значение транзакций

/**
 * Возвращает среднее значение транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number} Среднее значение транзакций.
 */

function calculateAverageTransactionAmount(transactions) {
    const total = calculateTotalAmount(transactions);
    return total / transactions.length;
}

// 8. Возвращает массив транзакций с суммой в заданном диапазоне

/**
 * Возвращает массив транзакций с суммой в заданном диапазоне.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {number} minAmount - Минимальная сумма транзакции.
 * @param {number} maxAmount - Максимальная сумма транзакции.
 * @returns {Array} Массив транзакций с суммой в заданном диапазоне.
 */

function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

// 9. Вычисляет общую сумму дебетовых транзакций

/**
 * Вычисляет общую сумму дебетовых транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number} Общая сумма дебетовых транзакций.
 */

function calculateTotalDebitAmount(transactions) {
    return getTransactionByType(transactions, "debit").reduce((sum, t) => sum + t.transaction_amount, 0);
}

// 10. Возвращает месяц, в котором было больше всего транзакций

/**
 * Возвращает месяц, в котором было больше всего транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number} Месяц с наибольшим количеством транзакций (1-12).
 */

function findMostTransactionsMonth(transactions) {
    if (transactions.length === 0) {
        return null;
    }
    const monthCounts = {};
    transactions.forEach(t => {
        const month = new Date(t.transaction_date).getMonth() + 1;
        monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    return Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
}

// 11. Возвращает месяц, в котором было больше дебетовых транзакций

/**
 * Возвращает месяц, в котором было больше дебетовых транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {number} Месяц с наибольшим количеством дебетовых транзакций (1-12).
 */

function findMostDebitTransactionMonth(transactions) {
    const debitTransactions = getTransactionByType(transactions, "debit");
    return findMostTransactionsMonth(debitTransactions);
}

// 12. Возвращает каких транзакций больше всего

/**
* Возвращает, каких транзакций больше всего: дебетовых, кредитовых или их количество равно.
* @param {Array} transactions - Массив объектов транзакций.
* @returns {string} "debit", "credit" или "equal".
*/

function mostTransactionTypes(transactions) {
    const debitCount = getTransactionByType(transactions, "debit").length;
    const creditCount = getTransactionByType(transactions, "credit").length;
    if (debitCount > creditCount) return "debit";
    if (creditCount > debitCount) return "credit";
    return "equal";
}

// 13. Возвращает массив транзакций, совершенных до указанной даты

/**
 * Возвращает массив транзакций, совершенных до указанной даты.
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {string} date - Дата, до которой нужно вернуть транзакции (в формате "YYYY-MM-DD").
 * @returns {Array} Массив транзакций, совершенных до указанной даты.
 */

function getTransactionsBeforeDate(transactions, date) {
    const endDate = new Date(date);
    return transactions.filter(t => new Date(t.transaction_date) < endDate);
}

// 14. Возвращает транзакцию по ее уникальному идентификатору (id)

/**
 * Возвращает транзакцию по ее уникальному идентификатору (id).
 * @param {Array} transactions - Массив объектов транзакций.
 * @param {number} id - Уникальный идентификатор транзакции.
 * @returns {Object|null} Транзакция с указанным id или null, если не найдена.
 */

function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id);
}

// 15. Возвращает новый массив, содержащий только описания транзакций

/**
 * Возвращает новый массив, содержащий только описания транзакций.
 * @param {Array} transactions - Массив объектов транзакций.
 * @returns {Array} Массив описаний транзакций.
 */

function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
}

// Проверка начальная:
console.log("Unique Transaction Types:", getUniqueTransactionTypes(transactions));
console.log("Total Amount:", calculateTotalAmount(transactions));
console.log("Total Amount by Date (2023, 10):", calculateTotalAmountByDate(transactions, 2023, 10));
console.log("Debit Transactions:", getTransactionByType(transactions, "debit"));
console.log("Transactions in Date Range (2023-10-01 to 2023-10-02):", getTransactionsInDateRange(transactions, "2023-10-01", "2023-10-02"));
console.log("Transactions by Merchant (SuperMart):", getTransactionsByMerchant(transactions, "SuperMart"));
console.log("Average Transaction Amount:", calculateAverageTransactionAmount(transactions));
console.log("Transactions by Amount Range (50 to 150):", getTransactionsByAmountRange(transactions, 50, 150));
console.log("Total Debit Amount:", calculateTotalDebitAmount(transactions));
console.log("Most Transactions Month:", findMostTransactionsMonth(transactions));
console.log("Most Debit Transactions Month:", findMostDebitTransactionMonth(transactions));
console.log("Most Transaction Types:", mostTransactionTypes(transactions));
console.log("Transactions Before Date (2023-10-03):", getTransactionsBeforeDate(transactions, "2023-10-03"));
console.log("Transaction by ID (1):", findTransactionById(transactions, 1));
console.log("Transaction Descriptions:", mapTransactionDescriptions(transactions));

// Проверка на пустом массиве

console.log(" \nТестирование на пустом массиве:")

console.log("Unique Transaction Types:", getUniqueTransactionTypes(emptyTransactions));
console.log("Total Amount:", calculateTotalAmount(emptyTransactions));
console.log("Total Amount by Date (2023, 10):", calculateTotalAmountByDate(emptyTransactions, 2023, 10));
console.log("Debit Transactions:", getTransactionByType(emptyTransactions, "debit"));
console.log("Transactions in Date Range (2023-10-01 to 2023-10-02):", getTransactionsInDateRange(emptyTransactions, "2023-10-01", "2023-10-02"));
console.log("Transactions by Merchant (SuperMart):", getTransactionsByMerchant(emptyTransactions, "SuperMart"));
console.log("Average Transaction Amount:", calculateAverageTransactionAmount(emptyTransactions));
console.log("Transactions by Amount Range (50 to 150):", getTransactionsByAmountRange(emptyTransactions, 50, 150));
console.log("Total Debit Amount:", calculateTotalDebitAmount(emptyTransactions));
console.log("Most Transactions Month:", findMostTransactionsMonth(emptyTransactions));
console.log("Most Debit Transactions Month:", findMostDebitTransactionMonth(emptyTransactions));
console.log("Most Transaction Types:", mostTransactionTypes(emptyTransactions));
console.log("Transactions Before Date (2023-10-03):", getTransactionsBeforeDate(emptyTransactions, "2023-10-03"));
console.log("Transaction by ID (1):", findTransactionById(emptyTransactions, 1));
console.log("Transaction Descriptions:", mapTransactionDescriptions(emptyTransactions));

// Тестирование на массиве с одной транзакцией:

console.log("\nТестирование на массиве с одной транзакцией:")

console.log("Unique Transaction Types:", getUniqueTransactionTypes(singleTransaction));
console.log("Total Amount:", calculateTotalAmount(singleTransaction));
console.log("Total Amount by Date (2023, 10):", calculateTotalAmountByDate(singleTransaction, 2023, 10));
console.log("Debit Transactions:", getTransactionByType(singleTransaction, "debit"));
console.log("Transactions in Date Range (2023-10-01 to 2023-10-02):", getTransactionsInDateRange(singleTransaction, "2023-10-01", "2023-10-02"));
console.log("Transactions by Merchant (SuperMart):", getTransactionsByMerchant(singleTransaction, "SuperMart"));
console.log("Average Transaction Amount:", calculateAverageTransactionAmount(singleTransaction));
console.log("Transactions by Amount Range (50 to 150):", getTransactionsByAmountRange(singleTransaction, 50, 150));
console.log("Total Debit Amount:", calculateTotalDebitAmount(singleTransaction));
console.log("Most Transactions Month:", findMostTransactionsMonth(singleTransaction));
console.log("Most Debit Transactions Month:", findMostDebitTransactionMonth(singleTransaction));
console.log("Most Transaction Types:", mostTransactionTypes(singleTransaction));
console.log("Transactions Before Date (2023-10-03):", getTransactionsBeforeDate(singleTransaction, "2023-10-03"));
console.log("Transaction by ID (1):", findTransactionById(singleTransaction, 1));
console.log("Transaction Descriptions:", mapTransactionDescriptions(singleTransaction));