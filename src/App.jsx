import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import PlantForm from "./components/PlantForm";
import PlantCard from "./components/PlantCard";
import PlantFilter from "./components/PlantFilter";

import NotificationManager from "./components/NotificationManager";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const [plants, setPlants] = useState([]);

  const [filterName, setFilterName] = useState("");
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [filterNeedsWater, setFilterNeedsWater] = useState(false);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/plants")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch plants");
        return res.json();
      })
      .then((data) => setPlants(data))
      .catch((err) => console.error("Error loading plants:", err.message));
  }, []);

  const isFiltering =
    filterName.trim() !== "" ||
    filterFavorite ||
    filterNeedsWater ||
    filterType !== "";

  const addPlant = (plant) => {
    setPlants((prev) => [...prev, plant]);
  };

  const waterPlant = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/plants/${id}/water`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error("Failed to water plant");

      const result = await response.json();

      setPlants((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, lastWatered: result.lastWatDay } : p
        )
      );
    } catch (error) {
      console.error("Error watering plant:", error.message);
    }
  };

  const deletePlant = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/plants/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete plant");
      }

      setPlants((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting plant:", error.message);
      alert("Failed to delete the plant. Please try again.");
    }
  };

  const toggleFavorite = async (id) => {
    const plant = plants.find((p) => p.id === id);
    const newValue = plant.favourite ? 0 : 1;

    try {
      const response = await fetch(
        `http://localhost:8000/plants/${id}/favourite`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favourite: newValue }),
        }
      );

      if (!response.ok) throw new Error("Failed to toggle favorite");

      const result = await response.json();

      setPlants((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, favourite: result.favourite } : p
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
    }
  };

  function daysSince(dateString) {
    const now = new Date();
    const last = new Date(dateString);
    return Math.floor((now - last) / (1000 * 60 * 60 * 24));
  }

  const filteredPlants = plants.filter((plant) => {
    const matchName = plant.name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const matchFavorite = filterFavorite ? plant.favourite : true;
    const matchType = filterType ? plant.type === filterType : true;
    const matchWater = filterNeedsWater
      ? daysSince(plant.lastWatDay) >= plant.waterFreq
      : true;

    return matchName && matchFavorite && matchType && matchWater;
  });

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

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
      <div style={{ marginTop: "10rem" }}>
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>

      <PlantForm isDarkMode={isDarkMode} onAddPlant={addPlant} />

      <PlantFilter
        filterName={filterName}
        setFilterName={setFilterName}
        filterFavorite={filterFavorite}
        setFilterFavorite={setFilterFavorite}
        filterNeedsWater={filterNeedsWater}
        setFilterNeedsWater={setFilterNeedsWater}
        filterType={filterType}
        setFilterType={setFilterType}
        allTypes={[...new Set(plants.map((p) => p.type))]}
        isDarkMode={isDarkMode}
      />

      {isFiltering ? (
        // Показываем отфильтрованный список
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            justifyItems: "center",
            padding: "2rem",
          }}
        >
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onWater={waterPlant}
              onDelete={deletePlant}
              onToggleFavorite={toggleFavorite}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      ) : (
        // Показываем полный список, если фильтра нет
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            padding: "1rem",
            alignItems: "stretch",
          }}
        >
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onWater={waterPlant}
              onDelete={deletePlant}
              onToggleFavorite={toggleFavorite}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )}

      <main style={{ padding: "1rem", position: "relative", zIndex: 1 }}>
        <NotificationManager />
      </main>
    </div>
  );
}

export default App;
