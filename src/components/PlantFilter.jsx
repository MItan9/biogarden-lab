import React from "react";

export default function PlantFilter({
  filterName,
  setFilterName,
  filterFavorite,
  setFilterFavorite,
  filterNeedsWater,
  setFilterNeedsWater,
  filterType,
  setFilterType,
  allTypes,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <input
        type="text"
        placeholder="Search by name..."
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="">All Types</option>
        {allTypes.map((type, i) => (
          <option key={i} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          checked={filterFavorite}
          onChange={(e) => setFilterFavorite(e.target.checked)}
        />
        Favorites
      </label>

      <label>
        <input
          type="checkbox"
          checked={filterNeedsWater}
          onChange={(e) => setFilterNeedsWater(e.target.checked)}
        />
        Needs water
      </label>
    </div>
  );
}
