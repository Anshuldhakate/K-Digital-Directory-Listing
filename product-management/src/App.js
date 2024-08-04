import React, { useState } from 'react';
import { Container, Button, Typography, Snackbar, Alert } from '@mui/material';
import ProductList from './components/ProductList';
import AddProductModal from './components/AddProductModal';
import './App.css';

function App() {
  const [products, setProducts] = useState([
    { name: 'Stainless Steel 304 Pipe', material: 'Stainless Steel', grade: '304', details: 'Material: Stainless Steel\nUnit Length: 6-12 meter\nShape: Round', price: '350 / KG' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddProduct = ({ selectedProduct, selectedMaterial, selectedGrades }) => {
    selectedGrades.forEach((grade) => {
      setProducts((prevProducts) => [
        ...prevProducts,
        { name: selectedProduct, material: selectedMaterial, grade, details: '', price: '' },
      ]);
    });
    setSnackbarOpen(true);
  };

  return (
    <Container className="App">
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        + Add Products
      </Button>
      <ProductList products={products} setProducts={setProducts} />
      {isModalOpen && (
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddProduct}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Product(s) added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
