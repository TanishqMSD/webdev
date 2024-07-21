document.getElementById('expenseForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents the default form submission

    const expenseList = document.getElementById("expenseList");

    const desc = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;

    if (desc && category && !isNaN(amount)) {
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${desc}</td>
            <td>${category}</td>
            <td>${amount}</td>
            <td><button class="removeBtn">Remove</button></td>
        `;

        expenseList.appendChild(newRow);

        document.forms.expenseForm.reset();
    }
});

document.getElementById('expenseList').addEventListener('click', (event) => {
    if (event.target.classList.contains('removeBtn')) {
        event.target.closest('tr').remove();
    }
});

document.getElementById('clearExpenses').addEventListener('click', () => {
    document.getElementById('expenseList').innerHTML = '';
});
