export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categories, id) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${id}`;
  // const url2 = `https://api.mercadolibre.com/sites/MLB/${categories}search?q=$${id}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}
