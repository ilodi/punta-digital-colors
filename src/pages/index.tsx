import { useState } from "react";
import {colorsData} from "./colorsData";

import styles from "../styles/_home.module.css";

//fragments
//filterColor
const filterColor = (search, colors) =>{
  return search
  ? colors.filter((color) => 
    color.name.toLowerCase().includes(search.toLowerCase())
  ) : colors;
}

//colorDetails
const ColorDetails = ({color}) =>(
  <div
   className={styles.colorDetails}>
      <h2>Información del color</h2>
      <p><strong>Nombre:</strong> {color.name} </p>
      <p><strong>Hex:</strong> {color.hex} </p>
      <p><strong>RGB:</strong> {color.rgb} </p>
    </div>
);

//colorBoxDatail
const ColorBox = ({color, onClick}) => (
  <div 
  className={styles.colorBox}
  style={{ backgroundColor: color.hex }}
  onClick={() => onClick(color)}>
    <p>{color.name}</p>
  </div>
);

//mainnpx eslint --init
export default function Home(){
  const [search, setSearch] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

  const filterColors = filterColor(search, colorsData); 
  const clearSearch = () => setSearch('');

  return (
    <div  className={styles.container}>
        <h1 
          className={styles.title}>Color Finder | PUNTA DIGITAL
        </h1>
        <input 
          type="text"
          placeholder="¿Cuál es tu color favorito de la lista?"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
          className={styles.searchInput}
          />
        <div   
          onClick={clearSearch} 
          className={styles.clearSearch}>
          <p>Limpiar</p>
        </div>
  
      <div className={styles.colorGrid}>
        { filterColors.map((color)=>(
            <ColorBox
              key = {color.hex}
              color = {color}
              onClick = {setSelectedColor}
              />
          ))
        }
      </div>

      { selectedColor && 
      <ColorDetails 
        color={selectedColor}/>
      }

    </div>
  )
}