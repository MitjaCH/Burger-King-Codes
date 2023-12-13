document.addEventListener('DOMContentLoaded', function () {
    fetch('burgerKing.CSV')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split(';'));

            const codesList = document.getElementById('codesList');

            rows.forEach(row => {
                const [id, name, preis, anzahl] = row;

                const card = document.createElement('div');
                card.classList.add('bg-gray-200', 'p-4', 'rounded', 'shadow-md');

                card.innerHTML = `
                    <p class="text-lg font-semibold">${name}</p>
                    <p>ID: ${id}</p>
                    <p>Price: ${preis} CHF</p>
                    <p>Quantity: ${anzahl}</p>
                `;
                codesList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching CSV:', error));

    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function () {
        const searchQuery = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.bg-gray-200');

        cards.forEach(card => {
            const cardName = card.querySelector('.text-lg').textContent.toLowerCase();
            if (cardName.includes(searchQuery)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
