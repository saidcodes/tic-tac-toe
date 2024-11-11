import { useState } from "react";
export default function Player({ name, symbol,isActive,onNameChange}) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handelEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing){ onNameChange(symbol,playerName);}
   
  }
  
  function handelChange(event) {
    
    setPlayerName(event.target.value);
   

  }

  /*  const [playerSymbol,setPlayerSymbol]= useState(symbol);
  function editName(){
    setPlayerSymbol(playerSymbol==="X"? "O":"X")
  } */
  
  return (
    <li className= {isActive ? "active":""}>
      <span className="player">
        {isEditing === true ? (
          <input  type="text" required placeholder={playerName}  onChange={handelChange} />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handelEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
