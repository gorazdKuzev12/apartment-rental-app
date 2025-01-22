// src/pages/gallery.tsx

"use client";
import { useState, useEffect, SetStateAction } from "react";
import styled from "styled-components";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/LanguageContext"; // Import the useLanguage hook




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

const getOptimizedImageUrl = (url: string, options: { width?: number; height?: number; quality?: string; format?: string } = {}) => {
    const { width = 800, height = 600, quality = "auto", format = "auto" } = options;
    return url.replace(
      "/upload/",
      `/upload/w_${width},h_${height},c_fill,f_${format},q_${quality}/`
    );
  };
  
interface GaleryComponentProps {
  images: string[];
}

const GaleryComponent = ({ images }: GaleryComponentProps) => {
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
              <Image src={getOptimizedImageUrl(src)} alt={`Gallery Image ${index + 1}`} />
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
  background:url("https://res.cloudinary.com/dw9cab9ab/image/upload/v1/image1_ybvcap.jpg")center/cover no-repeat; /* Ensure you have this image in your public folder */
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
  background: #f8f9fa;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #eee;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const ModalContent = styled.div`
  position: relative;
  width: 90vw;  /* Ensures the modal doesn't exceed 90% of the viewport width */
  height: 90vh; /* Ensures the modal doesn't exceed 90% of the viewport height */
  background: white;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    width: 95vw;
    height: 95vh;
  }
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Ensures the image is fully visible and maintains its aspect ratio */
  display: block;
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




export default GaleryComponent;
