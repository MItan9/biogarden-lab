import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function daysSince(dateString) {
  const now = new Date();
  const last = new Date(dateString);
  const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function PlantCard({
  plant,
  onWater,
  onDelete,
  onToggleFavorite,
  isDarkMode,
}) {
  const hasShown = useRef(false);

  const simple = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={isDarkMode ? "white" : "currentColor"}
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
      fill="#00BFFF"
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

  const needsWatering = daysSince(plant.lastWatered) >= plant.wateringFrequency;

  const showToastMessage = () => {
    if (needsWatering) {
      toast.error(`${plant.name} needs water!`, {
        position: "bottom-right",
        toastId: `water-${plant.id}`,
      });

      hasShown.current = true;

      setTimeout(() => {
        hasShown.current = false;
      }, 5000);
    }
  };

  return (
    <div
      onMouseEnter={showToastMessage}
      style={{
        border: `2px solid ${needsWatering ? "red" : "#ccc"}`,
        borderRadius: "8px",
        padding: "1rem",
        margin: "1rem auto",
        maxWidth: "600px",
        background: isDarkMode
          ? "rgba(0, 0, 0, 0.5)"
          : "rgba(255, 255, 255, 0.5)",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <ToastContainer />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, color: isDarkMode ? "white" : "black" }}>
          {plant.name}{" "}
          <span
            style={{
              fontWeight: "normal",
              fontSize: "0.9rem",
            }}
          >
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

      <p style={{ margin: "0.5rem 0", color: isDarkMode ? "white" : "black" }}>
        Last watered: {daysSince(plant.lastWatered)} days ago
      </p>
      <p style={{ margin: "0.5rem 0", color: isDarkMode ? "white" : "black" }}>
        Water every {plant.wateringFrequency} day(s)
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => onWater(plant.id)}
          style={{
            background: isDarkMode ? "rgb(38, 86, 39)" : " rgb(76, 175, 80)",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Water
        </button>

        <button
          onClick={() => onDelete(plant.id)}
          style={{
            background: " rgb(255, 0, 0)",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
