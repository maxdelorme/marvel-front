const getFavoritesFromStorage = (type) => {
  const stringFavorites = localStorage.getItem(type);
  return JSON.parse(stringFavorites) || [];
};

export default getFavoritesFromStorage;
