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
        <img src={editIcon} alt="Edit" className="icon"  onClick={()=>handleEditClick(event, index, item)}/>
        <img src={deleteIcon} alt="My Icon" className="icon"  onClick={() => handleDeleteClick(index)}/>
          {/* <button type='button' onClick={()=>handleEditClick(event, index, item)}>Edit</button> */}
          {/* <button type='button' onClick={() => handleDeleteClick(index)}>Delete</button> */}
         </td>
      </tr>
    );
}

export default ReadOnlyRow