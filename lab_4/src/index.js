/**
 * Главный модуль приложения
 * @module main
 */

import { initEventListeners, renderTransactionsTable } from './ui.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    renderTransactionsTable();
});