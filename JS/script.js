const API_KEY = '9cb257911e2abfb098a015b1a4bb3881298d9ee87bd3bc82932d34dc24dd1524'; 
const BASE_URL = 'https://api.apitcg.com/api/one-piece/cards';

document.getElementById('searchBtn').addEventListener('click', () => {
  const name = document.getElementById('searchInput').value.trim();
  if (!name) return alert('Please enter a card name.');

  fetch(`${BASE_URL}?name=${encodeURIComponent(name)}`, {
    headers: {
      'x-api-key': API_KEY
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    })
    .then(data => {
      displayCards(data);
    })
    .catch(err => {
      console.error(err);
      document.getElementById('results').innerHTML = `<p>Error loading cards.</p>`;
    });
});

function displayCards(cards) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  if (!Array.isArray(cards) || cards.length === 0) {
    container.innerHTML = `<p>No cards found.</p>`;
    return;
  }

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';

    cardElement.innerHTML = `
      <h3>${card.name}</h3>
      <img src="${card.image}" alt="${card.name}" />
      <p><strong>Set:</strong> ${card.set}</p>
      <p><strong>Color:</strong> ${card.color}</p>
      <p><strong>Cost:</strong> ${card.cost ?? 'N/A'}</p>
    `;

    container.appendChild(cardElement);
  });
}
