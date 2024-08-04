import React from 'react';
import ProductRow from './ProductRow';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../store';

const ProductList = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const handleQuickEdit = (updatedProduct) => {
    dispatch(updateProduct({ id: updatedProduct.id, updatedProduct }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search Products..."
          style={styles.searchInput}
        />
        <button style={styles.searchButton}>Search</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Product</th>
            <th style={styles.tableHeader}>Action</th>
            <th style={styles.tableHeader}>Product Details</th>
            <th style={styles.tableHeader}>Price in Unit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id} // Ensure unique key
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
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  searchInput: {
    flex: 1,
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  searchButton: {
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
