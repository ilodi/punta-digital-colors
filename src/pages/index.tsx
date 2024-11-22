import { useState } from "react";
import { colorsData } from "./colorsData";
import styles from "../styles/_home.module.css";

// Componente de detalles del color
const ColorDetails = ({ color }) => (
  <div 
    className={styles.colorDetails} 
    style={{ backgroundColor: color.hex }}
  >
    <h2>Información del color</h2>
    <p><strong>Nombre:</strong> {color.name}</p>
    <p><strong>Hex:</strong> {color.hex}</p>
    <p><strong>RGB:</strong> {color.rgb}</p>
  </div>
);

// Componente para la caja de color
const ColorBox = ({ color, onClick, setSearch }) => (
  <div
    className={styles.colorBox}
    style={{ backgroundColor: color.hex }}
    onClick={() => {
      onClick(color);
      setSearch(color.name);
    }}
  >
    <p>{color.name}</p>
  </div>
);

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

  const filterColors = search
    ? colorsData.filter(color =>
        color.name.toLowerCase().includes(search.toLowerCase())
      )
    : colorsData;

  // Función para limpiar el campo de búsqueda
  const clearSearch = () => {
    setSearch('');
    setSelectedColor(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.leftSide}>
          <div className={styles.topLestSide}>
            <h1 className={styles.title}>Color Finder | PUNTA DIGITAL</h1>
            <div>
              <input
                type="text"
                placeholder="¿Cuál es tu color favorito de la lista?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
              <button
                className={styles.clearButton}
                onClick={clearSearch}
              >
                Limpiar
              </button>
            </div>
          </div>

          <div className={styles.bottomLestSide}>
            {filterColors.length === 0 ? (
              <h4 className={styles.noResults}>No se encontraron resultados</h4>
            ) : (
              <div className={styles.colorGrid}>
                {filterColors.map((color,index) => (
                  <ColorBox
                    key={index}
                    color={color}
                    onClick={(color) => {
                      setSelectedColor(color);
                      setSearch(color.name);
                    }}
                    setSearch={setSearch}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.rightSide}>
          {selectedColor && <ColorDetails color={selectedColor} />}
        </div>
      </div>
    </div>
  );
}
