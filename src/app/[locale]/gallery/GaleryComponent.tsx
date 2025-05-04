"use client";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/LanguageContext";

interface ImageData {
  src: string;
  alt: {
    sr: string;
    en: string;
    de: string;
    [key: string]: string; // in case you have more languages
  };
}

interface NavigationItem {
  slug: string;
  label: any;
  translations: any;
  id: string;
  order:number;
}

interface GaleryComponentProps {
  images: ImageData[];
  navigationItems: any;
}

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

const getOptimizedImageUrl = (
  url: string,
  options: { width?: number; height?: number; quality?: string; format?: string } = {}
) => {
  const { width = 800, height = 600, quality = "auto", format = "auto" } = options;
  return url.replace(
    "/upload/",
    `/upload/w_${width},h_${height},c_fill,f_${format},q_${quality}/`
  );
};

const GaleryComponent = ({ images, navigationItems }: GaleryComponentProps) => {
  const { language } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const showPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) =>
      (prevIndex ?? 0) > 0 ? (prevIndex ?? 0) - 1 : images.length - 1
    );
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) =>
      (prevIndex ?? 0) < images.length - 1 ? (prevIndex ?? 0) + 1 : 0
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      showPreviousImage(e as any);
    } else if (e.key === "ArrowRight") {
      showNextImage(e as any);
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
      <Header navigationItems={navigationItems} />

      {/* Modal Overlay */}
      {selectedImageIndex !== null && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <NavButtonLeft onClick={showPreviousImage}>&#9664;</NavButtonLeft>
            {isLoading && <LoadingSpinner />}
            <AnimatedModalImage
              key={selectedImageIndex}
              alt={images[selectedImageIndex].alt[language] ?? "Gallery Image"}
              src={images[selectedImageIndex].src}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
            <NavButtonRight onClick={showNextImage}>&#9654;</NavButtonRight>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Hero Section */}
      <HeroSection>
        <HeroOverlay>
          <HeroContent>
            <HeroTitle>{translations[language].welcome}</HeroTitle>
            <HeroSubtitle>{translations[language].explore}</HeroSubtitle>
          </HeroContent>
        </HeroOverlay>
      </HeroSection>

      {/* Gallery Grid */}
      <GallerySection>
        <ImageGrid>
          {images.map((image, index) => (
            <ImageWrapper key={index} onClick={() => openModal(index)}>
              <StyledImage
                src={getOptimizedImageUrl(image.src)}
                alt={image.alt[language] ?? "Gallery Image"}
                loading="lazy"
              />
              <ImageOverlay>
                <ImageCaption>{image.alt[language]}</ImageCaption>
              </ImageOverlay>
            </ImageWrapper>
          ))}
        </ImageGrid>
      </GallerySection>

      <Footer navigationItems={navigationItems} languageCode={language} />
    </>
  );
};

export default GaleryComponent;

/* =========================================
   Animations and Styled-Components
   ========================================= */

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeInImage = keyframes`
  from { opacity: 0; transform: translateX(10px); }
  to { opacity: 1; transform: translateX(0); }
`;

const HeroSection = styled.section`
  width: 100%;
  height: 60vh;
  background: url("https://res.cloudinary.com/dw9cab9ab/image/upload/v1/image1_ybvcap.jpg")
    center/cover no-repeat;
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
  font-family: "Montserrat", sans-serif;
  border-top: 1px solid white;
  text-transform: lowercase;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  font-style: italic;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const GallerySection = styled.section`
  padding: 3rem 6rem 0 6rem;
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #eee;
  cursor: pointer;
  border-radius: 8px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s ease;
  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

const ImageCaption = styled.p`
  color: white;
  font-size: 1.2rem;
  text-align: center;
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
  animation: ${fadeIn} 0.3s ease-in forwards;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  position: relative;
  width: 90vw;
  max-width: 1200px;
  height: 80vh;
  background: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${scaleUp} 0.3s ease-out forwards;
  @media (max-width: 480px) {
    width: 95vw;
    height: 90vh;
  }
`;

const AnimatedModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  animation: ${fadeInImage} 0.4s ease-in-out;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const navButtonBase = `
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: white;
  background: rgba(0, 0, 0, 0.35);
  border: 2px solid white;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: background 0.3s ease, transform 0.3s ease;
  z-index: 10;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: scale(1.1);
  }
`;

const NavButtonLeft = styled.div`
  ${navButtonBase}
  left: 10px;
`;

const NavButtonRight = styled.div`
  ${navButtonBase}
  right: 10px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 2rem;
  font-weight: bold;
  color: #444;
  cursor: pointer;
  z-index: 11;
  background: transparent;
  &:hover {
    color: #222;
  }
`;