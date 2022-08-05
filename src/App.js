import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

function App() {
  return (
    <div>
      {getCategories()}
      {getProductsFromCategoryAndQuery()}
    </div>
  );
}

export default App;
