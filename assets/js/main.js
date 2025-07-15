// Configuration
const CONFIG = {
    API_URL: 'https://oracles-api.sidathsoeun.fr/oracle_api.php',
    API_KEY: 'SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!'
};

// Zodiac Signs
const ZODIAC_SIGNS = [
    { id: 'belier', name: 'Bélier', symbol: '♈' },
    { id: 'taureau', name: 'Taureau', symbol: '♉' },
    { id: 'gemeaux', name: 'Gémeaux', symbol: '♊' },
    { id: 'cancer', name: 'Cancer', symbol: '♋' },
    { id: 'lion', name: 'Lion', symbol: '♌' },
    { id: 'vierge', name: 'Vierge', symbol: '♍' },
    { id: 'balance', name: 'Balance', symbol: '♎' },
    { id: 'scorpion', name: 'Scorpion', symbol: '♏' },
    { id: 'sagittaire', name: 'Sagittaire', symbol: '♐' },
    { id: 'capricorne', name: 'Capricorne', symbol: '♑' },
    { id: 'verseau', name: 'Verseau', symbol: '♒' },
    { id: 'poissons', name: 'Poissons', symbol: '♓' }
];

// DOM Elements
const elements = {
    fetchBtn: document.getElementById('fetch-btn'),
    loading: document.getElementById('loading'),
    resultsContainer: document.getElementById('horoscope-results')
};

// Initialize the app
function init() {
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    elements.fetchBtn.addEventListener('click', fetchHoroscopes);
}

// Fetch all horoscopes from API
async function fetchHoroscopes() {
    elements.loading.classList.remove('hidden');
    elements.resultsContainer.innerHTML = '';

    try {
        const response = await fetch(CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_key: CONFIG.API_KEY
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error || !data.horoscope) {
            throw new Error('Réponse API invalide');
        }

        displayHoroscopes(data.horoscope);

    } catch (error) {
        console.error("Erreur:", error);
        showError(error.message);
    } finally {
        elements.loading.classList.add('hidden');
    }
}

// Display all horoscopes
function displayHoroscopes(horoscopeData) {
    elements.resultsContainer.innerHTML = '';

    // Create a title with the API message
    const title = document.createElement('h2');
    title.className = 'oracle-title';
    title.textContent = "Oracle du jour";
    elements.resultsContainer.appendChild(title);

    // Create cards for each zodiac sign
    ZODIAC_SIGNS.forEach(sign => {
        const prediction = horoscopeData[sign.name] || 'Aucune prédiction disponible';
        const card = createZodiacCard(sign, prediction);
        elements.resultsContainer.appendChild(card);
    });
}

// Create a zodiac card element
function createZodiacCard(sign, prediction) {
    const card = document.createElement('article');
    card.className = 'zodiac-card';
    
    card.innerHTML = `
        <header class="zodiac-header">
            <h3>${sign.symbol} ${sign.name}</h3>
        </header>
        <div class="zodiac-content">
            <p class="prediction">${prediction}</p>
        </div>
    `;
    
    return card;
}

// Show error message
function showError(message) {
    const errorCard = document.createElement('div');
    errorCard.className = 'error-message';
    errorCard.innerHTML = `
        <h3>Erreur</h3>
        <p>${message}</p>
        <p>Veuillez réessayer plus tard</p>
    `;
    elements.resultsContainer.appendChild(errorCard);
}

// Start the application
document.addEventListener('DOMContentLoaded', init);