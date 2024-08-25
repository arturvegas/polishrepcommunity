// Function to fetch JSON data and display it in the table
async function loadProducts() {
    try {
        const response = await fetch('output.txt'); // Assuming 'data.txt' is available on the server
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON data

        const tableBody = document.querySelector('#products-table tbody');
        const searchInput = document.getElementById('search-input');

        // Function to render products
        function renderProducts(products) {
            tableBody.innerHTML = ''; // Clear existing table rows
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.price} zł</td>
                    <td><img src="${product.image}" alt="${product.name}"></td>
                    <td><a href="${product.link}" target="_blank">Link</a></td>
                    <td>${product.category}</td>
                    <td>${product.batch}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Render all products initially
        renderProducts(data);

        // Add event listener for the search input
        searchInput.addEventListener('input', function () {
            const searchText = searchInput.value.toLowerCase();
            const filteredProducts = data.filter(product =>
                product.name.toLowerCase().includes(searchText) ||
                product.category.toLowerCase().includes(searchText)
            );
            renderProducts(filteredProducts);
        });
    } catch (error) {
        console.error('Error loading the products:', error);
    }
}

// Call the function to load products when the page loads
window.onload = loadProducts;