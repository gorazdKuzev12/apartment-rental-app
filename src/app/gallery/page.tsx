// src/pages/gallery.tsx

"use client";
import { useState, useEffect, SetStateAction } from "react";
import styled from "styled-components";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/LanguageContext"; // Import the useLanguage hook

const images = [
  // Exterior
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/rtyrosfavnuau4oshoc9.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/ynbrmyc8q8p4xbxw1g9c.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/ri0ovj6z2hz2hjp1pwqv.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/x09bx0iwzqn8kcalzduf.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/g6xto0ihphpdnnei5wro.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/sz4zeturu6epfnjeimyj.jpg",

  // Proslave (Events)
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6710_j66xie.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6712_qdkbfv.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6706_rvkmor.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6707_w0lxk5.jpg",

  // Relaxation
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6704_ljtxp8.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6703_lxyhbi.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6705_ax4det.jpg",

  // Interior
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6697_lxg2yv.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6701_kacigj.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6717_za4r1a.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6716_zrhnzb.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6700_adg7qh.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6698_jdi0re.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6695_rosge8.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6694_euwmsb.jpg",
  "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6693_xzalps.jpg",


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




export default GalleryPage;
