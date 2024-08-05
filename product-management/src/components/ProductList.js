import React, { useState } from 'react';
import ProductRow from './ProductRow';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../store';

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const products = useSelector((state) => state.products.filteredProducts.length > 0 ? state.products.filteredProducts : state.products.products);
  const dispatch = useDispatch();

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleMaterialChange = (e) => {
    setSelectedMaterial(e.target.value);
  };

  const applyFilter = () => {
    dispatch(setFilter({ product: selectedProduct, material: selectedMaterial }));
  };

  const uniqueProductNames = Array.from(new Set(products.map(product => product.name)));
  const uniqueMaterials = Array.from(new Set(products.map(product => product.material)));

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search Products..."
          style={styles.searchInput}
          onChange={handleProductChange}
        />
      </div>

      <div style={styles.filterContainer}>
        <select style={styles.filterDropdown} onChange={handleProductChange}>
          <option value="">Products</option>
          {uniqueProductNames.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
        <select style={styles.filterDropdown} onChange={handleMaterialChange}>
          <option value="">Materials</option>
          {uniqueMaterials.map((material, index) => (
            <option key={index} value={material}>{material}</option>
          ))}
        </select>
        <button style={styles.applyButton} onClick={applyFilter}>Filter</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Products</th>
            <th style={styles.tableHeader}>Action</th>
            <th style={styles.tableHeader}>Product Details</th>
            <th style={styles.tableHeader}>Price in Unit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '10px',
  },
  addProductButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  filterDropdown: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  applyButton: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
};

export default ProductList;
