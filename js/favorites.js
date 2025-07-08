const FAVORITES_KEY = 'weatherAppFavorites';

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveFavorite(city) {
  const favorites = getFavorites();
  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function renderFavorites(onSelect) {
  const container = document.getElementById('favoritesList');
  const favorites = getFavorites();

  container.innerHTML = '';
  favorites.forEach((city) => {
    const btn = document.createElement('button');
    btn.textContent = city;
    btn.className =
      'bg-white text-gray-800 px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 text-sm';
    btn.addEventListener('click', () => onSelect(city));
    container.appendChild(btn);
  });
}
