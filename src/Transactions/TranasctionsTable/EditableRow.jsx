import React from "react";
import saveIcon from '../../assets/saveIcon.svg'
import cancelIcon from '../../assets/cancelIcon.svg'

const EditableRow = ({ editedFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
      <td>
        <input
          placeholder="Enter Date"
          name="date"
          type="date"
          value={editedFormData.date}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          placeholder="Enter Type"
          name="type"
          value={editedFormData.type}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          placeholder="Enter Category"
          name="category"
          value={editedFormData.category}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          placeholder="Enter Amount"
          name="amount"
          value={editedFormData.amount}
          onChange={handleEditFormChange}
        />
      </td>
      <td></td>
      <td>
        <input
          placeholder="Enter Description"
          name="description"
          value={editedFormData.description}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
      
        <button type="submit"><img src={saveIcon} alt="Edit" className="icon"  /></button>
        <img src={cancelIcon} alt="Edit" className="icon"  onClick={handleCancelClick}/>
      </td>
    </tr>
  );
};

export default EditableRow;
