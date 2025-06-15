import React, { useState, useEffect, useRef } from "react";
import "../style.css"; // Asegúrate de que contiene los estilos necesarios

const images = [
  "/public/galeria1.jpg",
  "/public/galeria2.jpg",
  "/public/galeria3.jpg",
  "/public/galeria4.jpg",
  "/public/galeria5.jpeg",
  "/public/galeria6.webp",
  "/public/galeria7.webp",
  "/public/galeria8.webp",
  "/public/galeria9.webp",
  "/public/galeria10.webp",
  "/public/galeria11.webp",
  "/public/galeria12.webp",
  "/public/galeria13.webp",
];

const Galeria = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const galleryRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(goToNext, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetInterval();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const setSlide = (index) => {
    setCurrentIndex(index);
    resetInterval();
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      galleryRef.current?.requestFullscreen().catch((err) => {
        console.error("Error al activar pantalla completa:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const resetInterval = () => {
    if (isAutoPlaying) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(goToNext, 3000);
    }
  };

  return (
    <div
      className={`gallery-container-react ${isFullscreen ? "fullscreen" : ""}`}
      ref={galleryRef}
    >
      <div className="main-slide">
        <img src={images[currentIndex]} alt={`Imagen ${currentIndex + 1}`} />
      </div>

      <div className="nav-container">
        <button className="nav left" onClick={goToPrevious}>
          &#10094;
        </button>
        <button className="nav right" onClick={goToNext}>
          &#10095;
        </button>
      </div>

      <div className="gallery-controls-bottom">
        <button
          className={`control-btn-react ${isAutoPlaying ? "active" : ""}`}
          onClick={toggleAutoPlay}
          title={isAutoPlaying ? "Pausar slideshow" : "Reproducir slideshow"}
        >
          {isAutoPlaying ? "❚❚" : "►"}
        </button>

        <button
          className="control-btn-react right-align"
          onClick={toggleFullscreen}
          title={
            isFullscreen
              ? "Salir de pantalla completa"
              : "Pantalla completa"
          }
        >
          {isFullscreen ? "⤢" : "⤡"}
        </button>
      </div>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "active" : ""}
            onClick={() => setSlide(index)}
          />
        ))}
      </div>

      <div className="thumbnails">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index + 1}`}
            className={index === currentIndex ? "active" : ""}
            onClick={() => setSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Galeria;
