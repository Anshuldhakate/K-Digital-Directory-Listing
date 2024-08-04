import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../store';
import { TableRow, TableCell, TextField, Button } from '@mui/material';

const ProductRow = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState(product);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateProduct({ id: product.id, updatedProduct: editDetails }));
    setIsEditing(false);
  };

  return (
    <TableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell>
        {isEditing ? (
          <Button variant="contained" onClick={handleSave}>Save</Button>
        ) : (
          <Button variant="outlined" onClick={() => setIsEditing(true)}>Quick Edit</Button>
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            variant="outlined"
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
