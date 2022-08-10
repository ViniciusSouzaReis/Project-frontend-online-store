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
        let limitedCount = curr.count + 1;
        if (curr.availableQuantity) {
          limitedCount = curr.count < curr.availableQuantity
            ? curr.count += 1 : curr.availableQuantity;
        }
        acc = {
          id: curr.id,
          name: curr.name,
          image: curr.image,
          count: limitedCount,
          availableQuantity: curr.availableQuantity,
        };
        return acc;
      }, {});
      saveProductCard([...noRepeats, countProduct]);
    } else {
      saveProductCard([...favoriteProducts, product]);
    }
  }
};

export const removeProduct = (product, secondParam = 'quantity') => {
  const favoriteProducts = readProductCard();
  if (secondParam === 'remove') {
    saveProductCard(favoriteProducts
      .filter((myProduct) => myProduct.id !== product.id));
  } else {
    const productDecrease = favoriteProducts.filter((e) => e.id === product.id);
    const noRepeats = favoriteProducts.filter((myProd) => myProd.id !== product.id);
    const countProduct = productDecrease.reduce((acc, curr) => {
      acc = {
        id: curr.id,
        name: curr.name,
        image: curr.image,
        count: curr.count - 1,
      };
      return acc;
    }, {});
    if (countProduct.count === 0) {
      saveProductCard(favoriteProducts
        .filter((myProduct) => myProduct.id !== product.id));
    } else saveProductCard([...noRepeats, countProduct]);
  }
};
