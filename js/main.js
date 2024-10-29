const apiKey = 'b633ccf57cea47019cdc6bb4e1418268'; // Reemplaza con tu clave de API
const baseUrl = 'https://newsapi.org/v2/everything?language=es&apiKey=' + apiKey;

async function fetchNews(keyword = '') {
    let searchUrl = baseUrl;

    // Si hay una palabra clave, se agrega a la URL
    if (keyword) {
        searchUrl += `&q=${keyword}`;
    } else {
        // Para obtener todas las noticias, se añade un término de búsqueda
        searchUrl += '&q=general'; // Puedes cambiar "general" por otro término si lo prefieres
    }
    
    try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.status === "ok") {
            displayNews(data.articles);
        } else {
            console.error('Error al obtener noticias:', data.message);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}

function displayNews(articles) {
    const container = document.querySelector('.article-conteiner');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas noticias

    // Verificar si hay artículos
    if (articles.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No se encontraron resultados para la búsqueda.';
        container.appendChild(noResultsMessage);
        return; // Salir si no hay artículos
    }

    articles.forEach(article => {
        // Verificar que el artículo tenga datos relevantes
        if (article.title && article.urlToImage && article.description) {
            const articleCard = document.createElement('article');
            articleCard.classList.add('article-card');

            articleCard.innerHTML = `
                <figure class="article-image">
                    <img src="${article.urlToImage}" alt="${article.title}">
                </figure>
                <div class="article-content">
                    <a href="${article.url}" class="card-category">${article.source.name}</a>
                    <h3 class="card-title">${article.title}</h3>
                    <p class="card-excerpt">${article.description}</p>
                </div>
            `;
            
            container.appendChild(articleCard);
        }
    });
}

// Asignar eventos a los botones
document.getElementById('ver-todos').addEventListener('click', () => fetchNews());
document.getElementById('Tecnologia').addEventListener('click', () => fetchNews('tecnología'));
document.getElementById('Anime').addEventListener('click', () => fetchNews('anime'));
document.getElementById('Streaming').addEventListener('click', () => fetchNews('streaming'));
document.getElementById('Deporte').addEventListener('click', () => fetchNews('deporte'));
document.getElementById('Ciencia').addEventListener('click', () => fetchNews('ciencia'));

// Funcionalidad del buscador
document.getElementById('search__button').addEventListener('click', () => {
    const searchInput = document.getElementById('idPokemon').value.trim(); // Eliminar espacios en blanco
    if (searchInput) {
        fetchNews(searchInput); // Llama a la búsqueda con el texto ingresado
    } else {
        console.log('El campo de búsqueda está vacío'); // Mensaje para depuración
    }
});

// Cargar todas las noticias al abrir la página
fetchNews();
