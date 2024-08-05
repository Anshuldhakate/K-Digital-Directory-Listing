import React, { useState, useEffect } from 'react';
import { Modal, Button, Grid, List, ListItem, ListItemText, Checkbox, ListItemSecondaryAction, Typography, Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store';
import './AddProductsModal.css';

const categories = {
  products: ['Pipes', 'Tubing', 'Pipe Fittings', 'Forged Fittings', 'Flanges', 'Valves', 'Gaskets'],
  materials: ['Alloy Steel', 'Aluminium', 'Carbon Steel', 'Copper Nickel', 'Duplex Steel'],
  grades: {
    Aluminium: ['F11 Pipes', 'F22 Pipes', 'F5 Pipes', 'F9 Pipes', 'F91 Pipes'],
    'Alloy Steel': ['A1 Pipes', 'A2 Pipes', 'A3 Pipes'],
    'Carbon Steel': ['C1 Pipes', 'C2 Pipes', 'C3 Pipes'],
    'Copper Nickel': ['C1 Pipes', 'C2 Pipes'],
    'Duplex Steel': ['D1 Pipes', 'D2 Pipes'],
  },
};

// Dummy pricing logic with unit
const getPrice = (product, material, grades) => {
  // In a real application, pricing logic should be more complex and based on actual data.
  const price = (product && material && grades.length) ? (Math.random() * 500).toFixed(0) : '';
  return price ? `${price} /KG` : '';
};

const AddProductModal = ({ isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setPrice(getPrice(selectedProduct, selectedMaterial, selectedGrades));
  }, [selectedProduct, selectedMaterial, selectedGrades]);

  const handleProductChange = (product) => {
    setSelectedProduct(product);
    setSelectedMaterial('');
    setSelectedGrades([]);
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    setSelectedGrades([]);
  };

  const handleGradeToggle = (grade) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const handleSubmit = () => {
    if (selectedProduct && selectedMaterial && selectedGrades.length > 0 && price) {
      const newProduct = {
        id: Date.now(),
        name: selectedProduct,
        material: selectedMaterial,
        grade: selectedGrades.join(', '),
        details: `Material: ${selectedMaterial}\nGrades: ${selectedGrades.join(', ')}`,
        price,
      };

      dispatch(addProduct(newProduct));
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-content">
        <Typography variant="h6" className="modal-title">Add Products</Typography>
        <Grid container spacing={2} className="modal-grid">
          <Grid item xs={4} className="list-container">
            <Typography variant="subtitle1">Products ({selectedProduct ? '1' : '0'})</Typography>
            <List>
              {categories.products.map((product) => (
                <ListItem
                  button
                  key={product}
                  onClick={() => handleProductChange(product)}
                  className={`list-item ${selectedProduct === product ? 'selected' : ''}`}
                >
                  <ListItemText primary={product} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={4} className="list-container">
            <Typography variant="subtitle1">Material ({selectedMaterial ? '1' : '0'})</Typography>
            <List>
              {categories.materials.map((material) => (
                <ListItem
                  button
                  key={material}
                  onClick={() => handleMaterialChange(material)}
                  className={`list-item ${selectedMaterial === material ? 'selected' : ''}`}
                >
                  <ListItemText primary={material} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={4} className="list-container">
            <Typography variant="subtitle1">Grades ({selectedGrades.length})</Typography>
            <List>
              {categories.grades[selectedMaterial]?.map((grade) => (
                <ListItem key={grade} className="list-item">
                  <ListItemText primary={grade} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={() => handleGradeToggle(grade)}
                      checked={selectedGrades.includes(grade)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Material</TableCell>
              <TableCell>Grades</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{selectedProduct}</TableCell>
              <TableCell>{selectedMaterial}</TableCell>
              <TableCell>{selectedGrades.join(', ')}</TableCell>
              <TableCell>{price}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button onClick={handleSubmit} variant="contained" color="primary" className="submit-button">
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default AddProductModal;
