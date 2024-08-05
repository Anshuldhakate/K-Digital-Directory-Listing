import React, { useState } from 'react';
import ProductRow from './ProductRow';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, setSearchQuery } from '../store';
import AddProductModal from './AddProductModal';

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [bulkEdit, setBulkEdit] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = useSelector((state) => state.products.filteredProducts.length > 0 ? state.products.filteredProducts : state.products.products);
  const dispatch = useDispatch();

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleMaterialChange = (e) => {
    setSelectedMaterial(e.target.value);
  };

  const applyFilter = () => {
    dispatch(setFilter({ filterType: 'product', value: selectedProduct }));
    dispatch(setFilter({ filterType: 'material', value: selectedMaterial }));
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const applySearch = () => {
    dispatch(setSearchQuery(searchInput));
  };

  const handleBulkEditChange = (e) => {
    setBulkEdit(e.target.value);
  };

  const applyBulkEdit = () => {
    console.log('Bulk edit applied:', bulkEdit);
  };

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleAddProduct = ({ selectedProduct, selectedMaterial, selectedGrades }) => {
    const newProducts = selectedGrades.map((grade) => ({
      name: `${selectedMaterial} ${grade} ${selectedProduct}`,
      material: selectedMaterial,
      grade,
      details: `Material: ${selectedMaterial}\nGrade: ${grade}`,
      price: 'N/A',
    }));
    console.log('New Products Added:', newProducts);
  };

  const uniqueProductNames = Array.from(new Set(products.map(product => product.name)));
  const uniqueMaterials = Array.from(new Set(products.map(product => product.material)));
  const productCount = products.length;
  const selectedCount = selectedProducts.size;

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
          <button style={styles.addButton} onClick={() => setIsModalOpen(true)}>+ Add Products</button>
          <div style={styles.checkboxCount}>
            <span style={styles.countNumber}>{selectedCount}/{productCount}</span> Products
          </div>
        </div>
      <div style={styles.header}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search Products..."
            style={styles.searchInput}
            value={searchInput}
            onChange={handleSearchInput}
          />
          <button style={styles.searchButton} onClick={applySearch}>Search</button>
        </div>

        <div style={styles.filterAndEditContainer}>
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

          <div style={styles.bulkEditContainer}>
            <select style={styles.bulkEditDropdown} onChange={handleBulkEditChange}>
              <option value="">Bulk Edit</option>
              <option value="Edit Option 1">Edit Option 1</option>
              <option value="Edit Option 2">Edit Option 2</option>
            </select>
            <button style={styles.applyButton} onClick={applyBulkEdit}>Apply</button>
          </div>

          <div style={styles.countBox}>
            Products: <span style={styles.countNumber}>{productCount}</span>
          </div>
        </div>

        
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Select</th>
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
              onCheckboxChange={handleCheckboxChange}
              isChecked={selectedProducts.has(product.id)}
            />
          ))}
        </tbody>
      </table>

      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddProduct} />
    </div>
  );
};

const styles = {
  container: {
    width: '95%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f6fa',
    borderRadius: '8px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '10px',
  },
  addButton: {
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
    marginBottom: '10px',
  },
  checkboxCount: {
    padding: '10px 20px',
    borderRadius: '20px',
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  countNumber: {
    marginLeft: '5px',
    fontSize: '18px',
    color: '#000',
  },
  searchContainer: {
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'stretch',
    marginBottom: '10px',
  },
  searchInput: {
    padding: '10px',
    width: '29%',
    borderRadius: '20px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  searchButton: {
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    marginBottom: '10px',
  },
  filterAndEditContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '10px',
  },
  filterDropdown: {
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    marginRight: '10px',
  },
  bulkEditContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '10px',
  },
  bulkEditDropdown: {
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    marginRight: '10px',
  },
  applyButton: {
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    marginBottom: '10px',
  },
  countBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '20px',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    border: "1px solid black",
  },
  tableHeader: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },

  // Media queries for responsiveness
  '@media (min-width: 600px)': {
    searchContainer: {
      flexDirection: 'row',
    },
    searchInput: {
      width: '30%',
      marginBottom: '0',
      marginRight: '10px',
    },
    filterContainer: {
      flexDirection: 'row',
    },
    bulkEditContainer: {
      flexDirection: 'row',
    },
  },

  '@media (min-width: 900px)': {
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    filterAndEditContainer: {
      justifyContent: 'space-between',
    },
    filterDropdown: {
      marginRight: '20px',
    },
    bulkEditDropdown: {
      marginRight: '20px',
    },
  },
};


export default ProductList;
