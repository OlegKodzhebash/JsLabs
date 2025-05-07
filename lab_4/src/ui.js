/**
 * Модуль для работы с пользовательским интерфейсом
 * @module ui
 */

import { 
    addTransaction, 
    deleteTransaction, 
    getTransactionById, 
    calculateTotal,
    getTransactions // ✅ Добавлен импорт
} from './transactions.js';
import { generateId, formatDate } from './utils.js';

const transactionsTable = document.getElementById('transactionsTable');
const transactionForm = document.getElementById('transactionForm');
const transactionDetails = document.getElementById('transactionDetails');
const totalAmountElement = document.getElementById('totalAmount');

/**
 * Отрисовывает таблицу транзакций
 */
export const renderTransactionsTable = () => {
    const tbody = transactionsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    const transactions = getTransactions(); // ✅ теперь функция доступна

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.classList.add(transaction.amount >= 0 ? 'income' : 'expense');
        row.dataset.id = transaction.id;
        
        row.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.category}</td>
            <td>${getShortDescription(transaction.description)}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td><button class="delete-btn">Удалить</button></td>
        `;
        
        tbody.appendChild(row);
    });
    
    updateTotal();
};

/**
 * Обновляет отображение общей суммы
 */
export const updateTotal = () => {
    const total = calculateTotal();
    totalAmountElement.textContent = total.toFixed(2);
    totalAmountElement.style.color = total >= 0 ? 'green' : 'red';
};

/**
 * Возвращает сокращенное описание (первые 4 слова)
 * @param {string} description - Полное описание
 * @return {string} Сокращенное описание
 */
const getShortDescription = (description) => {
    const words = description.split(' ');
    return words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');
};

/**
 * Обрабатывает отправку формы добавления транзакции
 * @param {Event} event - Событие отправки формы
 */
const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const descriptionInput = document.getElementById('description');
    
    if (!amountInput.value || !categoryInput.value || !descriptionInput.value) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount)) {
        alert('Пожалуйста, введите корректную сумму');
        return;
    }
    
    const transaction = {
        id: generateId(),
        date: new Date(),
        amount: amount,
        category: categoryInput.value,
        description: descriptionInput.value.trim()
    };
    
    addTransaction(transaction);
    renderTransactionsTable();
    transactionForm.reset();
};

/**
 * Обрабатывает клик по таблице (удаление или просмотр деталей)
 * @param {Event} event - Событие клика
 */
const handleTableClick = (event) => {
    const deleteBtn = event.target.closest('.delete-btn');
    const tableRow = event.target.closest('tr[data-id]');
    
    if (deleteBtn && tableRow) {
        const id = tableRow.dataset.id;
        deleteTransaction(id);
        renderTransactionsTable();
    } else if (tableRow) {
        const id = tableRow.dataset.id;
        const transaction = getTransactionById(id);
        if (transaction) {
            showTransactionDetails(transaction);
        } else {
            alert('Транзакция не найдена');
        }
    }
};

/**
 * Отображает детали транзакции
 * @param {Object} transaction - Объект транзакции
 */
const showTransactionDetails = (transaction) => {
    transactionDetails.innerHTML = `
        <h2>Детали транзакции</h2>
        <p><strong>Дата:</strong> ${formatDate(transaction.date)}</p>
        <p><strong>Категория:</strong> ${transaction.category}</p>
        <p><strong>Сумма:</strong> ${transaction.amount.toFixed(2)}</p>
        <p><strong>Описание:</strong> ${transaction.description}</p>
    `;
};

// Инициализация обработчиков событий
export const initEventListeners = () => {
    transactionForm.addEventListener('submit', handleFormSubmit);
    transactionsTable.addEventListener('click', handleTableClick);
};
