import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import ProductList from './components/ProductList';
import AddProductModal from './components/AddProductModal';
import './App.css';

function App() {
  const [products, setProducts] = useState([
    { name: 'Stainless Steel 304 Pipe', material: 'Stainless Steel', grade: '304', details: 'Material: Stainless Steel\nUnit Length: 6-12 meter\nShape: Round', price: '350 / KG' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = ({ selectedProduct, selectedMaterial, selectedGrades }) => {
    const newProducts = selectedGrades.map((grade) => ({
      name: `${selectedMaterial} ${grade} ${selectedProduct}`,
      material: selectedMaterial,
      grade,
      details: `Material: ${selectedMaterial}\nGrade: ${grade}`,
      price: 'N/A',
    }));
    setProducts((prev) => [...prev, ...newProducts]);
  };

  return (
    <Container className="App">
      <Typography variant="h4" component="h1" gutterBottom className="heading">
        Product Management Dashboard
      </Typography>
      <ProductList 
        products={products} 
        onAddProductClick={() => setIsModalOpen(true)} 
      />
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddProduct} 
      />
    </Container>
  );
}

export default App;
