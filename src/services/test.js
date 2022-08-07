// teste
const PRODUCT_KEY = 'shoppingList';

if (!JSON.parse(localStorage.getItem(PRODUCT_KEY))) {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify([]));
}
const readProductCard = () => JSON.parse(localStorage.getItem(PRODUCT_KEY));

const saveProductCard = (product) => localStorage
  .setItem(PRODUCT_KEY, JSON.stringify(product));

export const getProductsCard = () => readProductCard();

export const addProduct = (product) => {
  if (product) {
    const favoriteSongs = readProductCard();
    saveProductCard([...favoriteSongs, product]);
    const repeatsProducts = favoriteSongs.filter((e) => e.id === product.id);
    if (repeatsProducts.length > 0) {
      const noRepeats = favoriteSongs.filter((myProduct) => myProduct.id !== product.id);
      const countProduct = repeatsProducts.reduce((acc, curr) => {
        acc = {
          id: curr.id,
          name: curr.name,
          image: curr.image,
          count: curr.count += 1,
        };
        return acc;
      }, {});
      saveProductCard([...noRepeats, countProduct]);
    } else {
      saveProductCard([...favoriteSongs, product]);
    }
  }
};

export const removeSong = (product) => {
  const favoriteSongs = readProductCard();
  saveProductCard(favoriteSongs
    .filter((myProduct) => myProduct.id !== product.id));
};
