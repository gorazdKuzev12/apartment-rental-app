// src/pages/gallery.tsx

"use client";
import { useState, useEffect, SetStateAction } from "react";
import styled from "styled-components";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/LanguageContext"; // Import the useLanguage hook

const images = [
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg",
  "/image4.jpg",
  "/image5.jpg",
  "/image7.jpg",
  "/image8.jpg",
  "/image9.jpg",
  "/image10.jpg",
  "/image11.jpg",
  "/image12.jpg",
  "/image13.jpg",
  // Add more image paths as needed
];

const translations: {
  [key: string]: { welcome: string; explore: string; gallery: string };
} = {
  SR: {
    welcome: "Dobrodošli u našu galeriju",
    explore: "Istražite našu izvanrednu kolekciju slika",
    gallery: "Galerija",
  },
  EN: {
    welcome: "Welcome to Our Gallery",
    explore: "Explore our exquisite collection of images",
    gallery: "Gallery",
  },
  DE: {
    welcome: "Willkommen in unserer Galerie",
    explore: "Entdecken Sie unsere exquisite Sammlung von Bildern",
    gallery: "Galerie",
  },
};

const GalleryPage = () => {
  const { language } = useLanguage(); // Get the current language from the context
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const openModal = (index: SetStateAction<number | null>) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const showPreviousImage = (e: { stopPropagation?: () => void }) => {
    e.stopPropagation?.();
    setSelectedImageIndex((prevIndex) =>
      (prevIndex ?? 0) > 0 ? (prevIndex ?? 0) - 1 : images.length - 1
    );
  };

  const showNextImage = (e: { stopPropagation?: () => void }) => {
    e.stopPropagation?.();
    setSelectedImageIndex((prevIndex) =>
      (prevIndex ?? 0) < images.length - 1 ? (prevIndex ?? 0) + 1 : 0
    );
  };

  const handleKeyDown = (e: { key?: any; stopPropagation?: () => void }) => {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      showPreviousImage(e);
    } else if (e.key === "ArrowRight") {
      showNextImage(e);
    }
  };

  useEffect(() => {
    if (selectedImageIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex]);

  return (
    <>
      <Header />
      {selectedImageIndex !== null && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <NavButton onClick={showPreviousImage} style={{ left: "10px" }}>
              &#9664;
            </NavButton>
            <ModalImage src={images[selectedImageIndex]} alt="Selected" />
            <NavButton onClick={showNextImage} style={{ right: "10px" }}>
              &#9654;
            </NavButton>
          </ModalContent>
        </ModalOverlay>
      )}
      <HeroSection>
        <HeroOverlay>
          <HeroContent>
            <HeroTitle>{translations[language].welcome}</HeroTitle>
            <HeroSubtitle>{translations[language].explore}</HeroSubtitle>
          </HeroContent>
        </HeroOverlay>
      </HeroSection>
      <TitleSection>
        <Title>{translations[language].gallery}</Title>
      </TitleSection>
      <GallerySection>
        <ImageGrid>
          {images.map((src, index) => (
            <ImageWrapper key={index} onClick={() => openModal(index)}>
              <Image src={src} alt={`Gallery Image ${index + 1}`} />
            </ImageWrapper>
          ))}
        </ImageGrid>
      </GallerySection>
      <Footer />
    </>
  );
};

const HeroSection = styled.section`
  width: 100%;
  height: 60vh;
  background: url("/image1.jpg") center/cover no-repeat; /* Ensure you have this image in your public folder */
  position: relative;

  @media (max-width: 768px) {
    height: 40vh;
  }

  @media (max-width: 480px) {
    height: 30vh;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HeroContent = styled.div`
  color: white;
  padding: 0 1rem;

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const TitleSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    height: 15vh;
  }

  @media (max-width: 480px) {
    height: 10vh;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #1a513a;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const GallerySection = styled.section`
  padding: 2rem;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding-bottom: 75%; /* 4:3 Aspect Ratio */
  background-color: #ddd;
  cursor: pointer;

  @media (max-width: 480px) {
    padding-bottom: 100%; /* 1:1 Aspect Ratio */
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: white;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 480px) {
    max-width: 95%;
    max-height: 95%;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const NavButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export default GalleryPage;
