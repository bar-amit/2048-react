import "./Tile.css";

function Tile({ value = 0 }) {
  return (
    <div className={`tile tile_theme_${value}`}>{value === 0 ? "" : value}</div>
  );
}

export default Tile;
