import React from 'react';
import { TableRow, TableCell, TextField, Button, Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../store';

const ProductRow = ({ product, onCheckboxChange, isChecked }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editDetails, setEditDetails] = React.useState(product);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateProduct({ id: product.id, updatedProduct: editDetails }));
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    onCheckboxChange(product.id);
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>
        {isEditing ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            value={editDetails.details}
            onChange={(e) => setEditDetails({ ...editDetails, details: e.target.value })}
          />
        ) : (
          product.details
        )}
      </TableCell>
      <TableCell>{product.price}</TableCell>
    </TableRow>
  );
};

export default ProductRow;
