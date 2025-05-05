/** @typedef {Object} Transaction
 * @property {string} id - Уникальный идентификатор
 * @property {string} date - Дата и время
 * @property {number} amount - Сумма
 * @property {string} category - Категория
 * @property {string} description - Описание
 */

const transactions = [];
const form = document.getElementById("transaction-form");
const tableBody = document.querySelector("#transaction-table tbody");
const totalDisplay = document.getElementById("total");
const fullDesc = document.getElementById("description-content");

/**
 * Генерирует уникальный ID
 * @returns {string}
 */
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Добавляет новую транзакцию в таблицу и массив
 * @param {Transaction} transaction
 */
function renderTransaction(transaction) {
  const row = document.createElement("tr");
  row.dataset.id = transaction.id;
  row.className = transaction.amount > 0 ? "green" : "red";

  row.innerHTML = `
    <td>${transaction.id}</td>
    <td>${transaction.date}</td>
    <td>${transaction.category}</td>
    <td>${transaction.description.split(" ").slice(0, 4).join(" ")}...</td>
    <td><button data-id="${transaction.id}" class="delete-btn">Удалить</button></td>
  `;

  row.addEventListener("click", (e) => {
    if (!e.target.classList.contains("delete-btn")) {
      fullDesc.textContent = transaction.description;
    }
  });

  tableBody.appendChild(row);
}

/**
 * Удаляет транзакцию из таблицы и массива
 * @param {string} id
 */
function deleteTransaction(id) {
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions.splice(index, 1);
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) row.remove();
    calculateTotal();
  }
}

/**
 * Подсчитывает общую сумму транзакций
 */
function calculateTotal() {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  totalDisplay.textContent = total;
}

// Обработка добавления
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  if (isNaN(amount) || !category || !description.trim()) {
    alert("Пожалуйста, заполните все поля корректно.");
    return;
  }

  const transaction = {
    id: generateId(),
    date: new Date().toLocaleString(),
    amount,
    category,
    description
  };

  transactions.push(transaction);
  renderTransaction(transaction);
  calculateTotal();
  form.reset();
});

// Обработка удаления
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;
    deleteTransaction(id);
  }
});
