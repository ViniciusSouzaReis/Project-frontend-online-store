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
    const favoriteProducts = readProductCard();
    saveProductCard([...favoriteProducts, product]);
    const repeatsProducts = favoriteProducts.filter((e) => e.id === product.id);
    if (repeatsProducts.length > 0) {
      const noRepeats = favoriteProducts.filter((myProd) => myProd.id !== product.id);
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
      saveProductCard([...favoriteProducts, product]);
    }
  }
};

export const removeProduct = (product) => {
  const favoriteProducts = readProductCard();
  saveProductCard(favoriteProducts
    .filter((myProduct) => myProduct.id !== product.id));
};
