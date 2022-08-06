export async function getCategories(param) {
  let url;
  if (param) url = `https://api.mercadolibre.com/sites/MLB/search?category=${param}`; else url = 'https://api.mercadolibre.com/sites/MLB/categories';

  const response = await fetch(url);
  const data = await response.json();
  console.log(url);
  return data;
}

export async function getProductsFromCategoryAndQuery(id, categories = 'MLB') {
  // const url = `https://api.mercadolibre.com/sites/MLB/search?q=${id}`;
  const url2 = `https://api.mercadolibre.com/sites/${categories}/search?q=$${id}`;

  const response = await fetch(url2);
  const data = await response.json();
  return data;
}

// export async function getCategory(category) {
//   const url = `https://api.mercadolibre.com/sites/MLB/search?category=${category}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// }
