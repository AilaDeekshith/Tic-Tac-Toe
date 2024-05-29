import { useState } from "react";



export default function Players({initialName,symbol,isActive,onChangeName}){

    const [isEditing,setIsEditing] = useState(false);
    const [name,setName] = useState(initialName);

    let nameTag = <span className="player-name">{name}</span>

    if(isEditing){
        nameTag = <input type="text" onChange={handleChange} value={name}required></input>
    }

    function handleEditClick(){
        setIsEditing(isEditing => !isEditing);
        if(isEditing){
            onChangeName(symbol,name);
        }
    }

    function handleChange(event){
        setName(event.target.value);
    }


    return(
        <li className={isActive?"active":undefined}>
            <span className="player">
                {nameTag}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
        </li>
    )
}