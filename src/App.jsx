import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import Header from "./components/Header";
import PlantForm from "./components/PlantForm";
import PlantCard from "./components/PlantCard";
import PlantFilter from "./components/PlantFilter";

import NotificationManager from "./components/NotificationManager";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const [plants, setPlants] = useState([]);

  const [filterName, setFilterName] = useState("");
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [filterNeedsWater, setFilterNeedsWater] = useState(false);
  const [filterType, setFilterType] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role);
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, [token]);

  useEffect(() => {
    fetch("http://localhost:8000/plants", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          setToken(null);
          throw new Error("Token expired or unauthorized");
        }

        if (!res.ok) throw new Error("Failed to fetch plants");
        return res.json();
      })
      .then((data) => setPlants(data))
      .catch((err) => console.error("Error loading plants:", err.message));
  }, [token]);

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        setToken(null); // выбросить на логин
        throw new Error("Token expired or unauthorized");
      }

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        setToken(null); // выбросить на логин
        throw new Error("Token expired or unauthorized");
      }
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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ favourite: newValue }),
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        setToken(null); // выбросить на логин
        throw new Error("Token expired or unauthorized");
      }

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

  const paginatedPlants = (isFiltering ? filteredPlants : plants).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(
    (isFiltering ? filteredPlants.length : plants.length) / itemsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filterName, filterFavorite, filterNeedsWater, filterType]);

  if (!token) {
    return <Login onLogin={setToken} />;
  }

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
        <Header
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
      </div>

      <PlantForm isDarkMode={isDarkMode} onAddPlant={addPlant} role={role} />

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
              role={role}
            />
          ))}
        </div>
      ) : (
        // Показываем полный список, если фильтра нет
        // <div
        //   style={{
        //     display: "grid",
        //     gridTemplateColumns: "repeat(3, 1fr)",
        //     gap: "1.5rem",
        //     padding: "1rem",
        //     alignItems: "stretch",
        //   }}
        // >
        //   {plants.map((plant) => (
        //     <PlantCard
        //       key={plant.id}
        //       plant={plant}
        //       onWater={waterPlant}
        //       onDelete={deletePlant}
        //       onToggleFavorite={toggleFavorite}
        //       isDarkMode={isDarkMode}
        //       role={role}
        //     />
        //   ))}
        // </div>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
              justifyItems: "center",
              padding: "2rem",
            }}
          >
            {paginatedPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onWater={waterPlant}
                onDelete={deletePlant}
                onToggleFavorite={toggleFavorite}
                isDarkMode={isDarkMode}
                role={role}
              />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              style={{
                color: "black",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
            >
              ⬅
            </button>
            <span style={{ margin: "0 1rem" }}>
              {currentPage} from {totalPages}
            </span>
            <button
              style={{
                color: "black",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              ➡
            </button>
          </div>
        </div>
      )}

      <main style={{ padding: "1rem", position: "relative", zIndex: 1 }}>
        <NotificationManager />
      </main>
    </div>
  );
}
