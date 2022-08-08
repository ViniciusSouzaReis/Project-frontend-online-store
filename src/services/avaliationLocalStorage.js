const PRODUCT_KEY = 'avaliationList';

if (!JSON.parse(localStorage.getItem(PRODUCT_KEY))) {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify([]));
}
const readProductCard = () => JSON.parse(localStorage.getItem(PRODUCT_KEY));

const saveProductCard = (product) => localStorage
  .setItem(PRODUCT_KEY, JSON.stringify(product));

export const getListAvaliation = () => readProductCard();

export const addAvaliation = (product) => {
  if (product) {
    const favoriteProducts = readProductCard();
    saveProductCard([...favoriteProducts, product]);
  }
};
