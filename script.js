document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = calculateTotal();

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            };
            expenses.push(newExpense);
            saveExpensesTolocal();
            renderExpenses();
            updateTotal();

            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        }
    });

    function calculateTotal() {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = `${totalAmount.toFixed(2)}`;
    }

    function saveExpensesTolocal() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function renderExpenses() {
        expenseList.innerHTML = '';

        const sortedExpenses = expenses.slice().sort((a, b) => b.amount - a.amount);

        sortedExpenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;

          
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => {
                deleteExpense(expense.id);
            });

            li.appendChild(deleteButton);
            expenseList.appendChild(li);
        });
    }

    function deleteExpense(id) {
       
        expenses = expenses.filter(expense => expense.id !== id);
        saveExpensesTolocal();
        renderExpenses();
        updateTotal();
    }

  
    renderExpenses();
    updateTotal();
});
