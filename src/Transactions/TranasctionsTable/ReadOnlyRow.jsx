import React from 'react'
import editIcon from '../../assets/editIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'

const ReadOnlyRow = ({item, index, handleEditClick, handleDeleteClick} ) => {
    console.log(index)
    return (
      <tr>
        <td>{item.date}</td>
        <td>{item.type}</td>
        <td>{item.category}</td>
        <td>{item.amount}</td>
        <td>{item.balance}</td>
        <td>{item.description}</td>
        <td>
        <img src={editIcon} alt="Edit" className="tableIcon"  onClick={()=>handleEditClick(event, index, item)}/>
        <img src={deleteIcon} alt="Delete" className="tableIcon"  onClick={() => handleDeleteClick(index)}/>
      
         </td>
      </tr>
    );
}

export default ReadOnlyRow