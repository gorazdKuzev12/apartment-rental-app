import { useState, useEffect } from "react";
import styled from "styled-components";

interface AlbumProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
}

const Album: React.FC<AlbumProps> = ({ images, currentIndex, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Add event listener for key presses
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentImageIndex]); // Dependencies: currentImageIndex, onClose

  return (
    <AlbumOverlay onClick={onClose}>
      <AlbumContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ImageContainer>
          <Title>{images[currentImageIndex].alt}</Title> {/* Title over image */}
          <AlbumImage src={images[currentImageIndex].src} alt={images[currentImageIndex].alt} />
        </ImageContainer>
        <NavButton left onClick={handlePrev}>
          ‹
        </NavButton>
        <NavButton right onClick={handleNext}>
          ›
        </NavButton>
      </AlbumContainer>
    </AlbumOverlay>
  );
};

const AlbumOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const AlbumContainer = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  z-index: 1001;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlbumImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

const Title = styled.h2`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 1.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  z-index: 1002;
`;

const NavButton = styled.button<{ left?: boolean; right?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 3rem;
  color: white;
  cursor: pointer;
  z-index: 1001;

  ${(props) => (props.left ? "left: 10px;" : "")}
  ${(props) => (props.right ? "right: 10px;" : "")}
`;

export default Album;
