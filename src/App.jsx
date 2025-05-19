import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import PlantForm from "./components/PlantForm";
import PlantCard from "./components/PlantCard";

import NotificationManager from "./components/NotificationManager";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const [plants, setPlants] = useState(() => {
    const saved = localStorage.getItem("plants");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

  const addPlant = (plant) => {
    setPlants((prev) => [...prev, plant]);
  };

  const deletePlant = (id) => {
    setPlants(plants.filter((p) => p.id !== id));
  };

  const toggleFavorite = (id) => {
    setPlants(
      plants.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: isDarkMode
            ? "rgba(0, 0, 0, 0.3)"
            : "rgba(255, 255, 255, 0.3)",
          zIndex: -1,
        }}
      />

      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <PlantForm isDarkMode={isDarkMode} onAddPlant={addPlant} />
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onDelete={deletePlant}
          onToggleFavorite={toggleFavorite}
        />
      ))}

      <main style={{ padding: "1rem", position: "relative", zIndex: 1 }}>
        <NotificationManager />
      </main>
    </div>
  );
}

export default App;
