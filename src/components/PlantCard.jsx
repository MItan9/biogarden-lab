import React from "react";

export default function PlantCard({ plant, onDelete, onToggleFavorite }) {
  const simple = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
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
      fill="currentColor"
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
    <div
      style={{
        borderRadius: "8px",
        padding: "1rem",
        margin: "1rem auto",
        maxWidth: "600px",
        background: "rgba(255,255,255,0.8)",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>
          {plant.name}{" "}
          <span style={{ fontWeight: "normal", fontSize: "0.9rem" }}>
            ({plant.type})
          </span>
        </h3>
        <button
          onClick={() => onToggleFavorite(plant.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        >
          {plant.favorite ? liked : simple}
        </button>
      </div>

      {plant.image && (
        <img
          src={plant.image}
          alt="plant"
          style={{
            width: "100%",
            maxHeight: "200px",
            objectFit: "cover",
            marginTop: "0.5rem",
            borderRadius: "6px",
          }}
        />
      )}

      <p style={{ margin: "0.5rem 0" }}>
        Water every {plant.wateringFrequency} day(s)
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => onDelete(plant.id)}>Delete</button>
      </div>
    </div>
  );
}
