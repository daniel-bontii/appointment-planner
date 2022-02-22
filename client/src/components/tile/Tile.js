import React from "react";

export const Tile = ({ tile }) => {
  const handleDelete = async(id) =>{
    // e.preventDefault();
    console.log('trying to delete')
    try {
      await fetch(`http://localhost:4001/aplanner/api/v1/contacts/${id}`,{
        method: 'DELETE'
      });
      window.location = "/";    
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="tile-container">
      {Object.values(tile).map((value, index) => (
        <p key={index} className={`${index === 0 ? "tile-title" : ""} tile`}>
          {value}
        </p>
        
      ))}
      <button onClick={()=>handleDelete(tile.id)}>Delete</button>
    </div>
  );
};
