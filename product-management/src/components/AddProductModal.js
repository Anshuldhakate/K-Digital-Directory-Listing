import React, { useState } from 'react';
import { Modal, Button, Grid, List, ListItem, ListItemText, Checkbox, ListItemSecondaryAction, Divider, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store'; // Import addProduct action
import './AddProductModal.css';

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

const AddProductModal = ({ isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedGrades, setSelectedGrades] = useState([]);
  const dispatch = useDispatch();

  const handleProductChange = (product) => {
    setSelectedProduct(product);
    setSelectedMaterial(''); // Reset material selection
    setSelectedGrades([]); // Reset grade selection
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    setSelectedGrades([]); // Reset grade selection
  };

  const handleGradeToggle = (grade) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const handleSubmit = () => {
    if (selectedProduct && selectedMaterial && selectedGrades.length > 0) {
      dispatch(addProduct({
        id: Date.now(), // Generate a unique ID
        name: selectedProduct,
        material: selectedMaterial,
        grade: selectedGrades.join(', '), // Combine selected grades
        details: `Material: ${selectedMaterial}\nGrades: ${selectedGrades.join(', ')}`,
        price: 'TBD', // Placeholder price
      }));
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-content">
        <Typography variant="h6" gutterBottom className="modal-title">Add Products</Typography>
        <Grid container spacing={2} className="modal-grid">
          <Grid item xs={4} className="list-container">
            <Typography variant="subtitle1" gutterBottom>Products</Typography>
            <List className="list">
              {categories.products.map((product) => (
                <ListItem button onClick={() => handleProductChange(product)} key={product} className={`list-item ${selectedProduct === product ? 'selected' : ''}`}>
                  <ListItemText primary={product} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={4} className="list-container">
            <Typography variant="subtitle1" gutterBottom>Material</Typography>
            <List className="list">
              {categories.materials.map((material) => (
                <ListItem button onClick={() => handleMaterialChange(material)} key={material} className={`list-item ${selectedMaterial === material ? 'selected' : ''}`}>
                  <ListItemText primary={material} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={4} className="list-container">
            <Typography variant="subtitle1" gutterBottom>Grades</Typography>
            <List className="list">
              {categories.grades[selectedMaterial]?.map((grade) => (
                <ListItem key={grade} button onClick={() => handleGradeToggle(grade)} className="list-item">
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
        <Button onClick={handleSubmit} variant="contained" color="primary" className="submit-button">
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default AddProductModal;
