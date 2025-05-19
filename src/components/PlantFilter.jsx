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
  isDarkMode,
}) {
  const simple = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={isDarkMode ? "white" : "black"}
      width="24"
      height="24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  );

  const liked = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#FFD700"
      stroke={isDarkMode ? "#FFD700" : "black"}
      strokeWidth={1.5}
      width="24"
      height="24"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006
      5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527
      1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354
      7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273
      -4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434
      2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
  return (
    <div style={{ justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          padding: "1.5rem",

          borderRadius: "12px",
          margin: "1rem auto",
          //   maxWidth: "900px",
          background: isDarkMode
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(255, 255, 255, 0.5)",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            margin: 0,
            color: isDarkMode ? "white" : "black",
            width: "100%",
          }}
        >
          Filter
        </h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          style={{
            flex: "1 1 250px",
            padding: "0.6rem 1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            flex: "1 1 200px",
            padding: "0.6rem 1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">All Types</option>
          {allTypes.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button
          onClick={() => setFilterFavorite((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
            color: isDarkMode ? "#00BFFF" : "#0077cc",
          }}
          title="Filter by favorites"
        >
          {filterFavorite ? liked : simple}
        </button>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            color: isDarkMode ? "white" : "black",
            gap: "0.5rem",
          }}
        >
          <input
            type="checkbox"
            checked={filterNeedsWater}
            onChange={(e) => setFilterNeedsWater(e.target.checked)}
            style={{
              width: "18px",
              height: "18px",
              cursor: "pointer",
            }}
          />
          Needs Water
        </label>
      </div>
    </div>
  );
}
