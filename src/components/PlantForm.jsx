import React, { useState } from "react";
import "./PlantForm.css";

export default function PlantForm({ isDarkMode, onAddPlant }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState(7);
  const [lastWatered, setLastWatered] = useState(
    new Date().toISOString().split("T")[0]
  ); // today by default
  const [imageData, setImageData] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result); // base64 строка
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !type.trim()) return;

    const newPlant = {
      id: Date.now(),
      name,
      type,
      wateringFrequency: parseInt(wateringFrequency),
      lastWatered: new Date(lastWatered).toISOString(),
      favorite: false,
      image: imageData || null,
    };

    console.log("New plant added:", newPlant);

    onAddPlant(newPlant);
    setName("");
    setType("");
    setImageData(null);
    setWateringFrequency(7);
    setLastWatered(new Date().toISOString().split("T")[0]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form-container ${isDarkMode ? "form-dark" : "form-light"}`}
    >
      <h2 style={{ textAlign: "center", margin: 0 }}>Add New Plant</h2>
      <div className="form-row">
        <label htmlFor="plantName" className="form-label">
          Plant name:
        </label>
        <input
          id="plantName"
          type="text"
          placeholder="e.g., Ficus"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
      </div>
      <div className="form-row">
        <label htmlFor="plantType" className="form-label">
          Plant type:
        </label>
        <input
          type="text"
          placeholder="e.g., Succulent"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="input-field"
        />
      </div>

      <div className="file-upload-wrapper">
        <button
          type="button"
          className={`file-upload-button ${
            isDarkMode ? "btn-dark" : "btn-light"
          }`}
        >
          Upload Image
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-upload-input"
        />
      </div>

      {imageData && (
        <img
          src={imageData}
          alt="Preview"
          style={{
            maxWidth: "10%",
            height: "auto",
            borderRadius: "8px",
            marginTop: "0.5rem",
          }}
        />
      )}
      <div className="form-row">
        <label htmlFor="wateringFrequency" className="form-label">
          Watering Frequency(in days):
        </label>
        <input
          type="number"
          min="1"
          value={wateringFrequency}
          onChange={(e) => setWateringFrequency(e.target.value)}
          required
          className="input-field"
        />
      </div>
      <div className="form-row">
        <label htmlFor="lastWatered" className="form-label">
          Last watered day:
        </label>
        <input
          type="date"
          value={lastWatered}
          onChange={(e) => setLastWatered(e.target.value)}
          required
          className="input-field"
        />
      </div>

      <button
        type="submit"
        className={`submit-button ${isDarkMode ? "btn-dark" : "btn-light"}`}
      >
        Add Plant
      </button>
    </form>
  );
}
