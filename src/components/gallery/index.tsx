// src/components/Gallery.tsx

"use client";
import styled from "styled-components";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext"; // Import the useLanguage hook

const Gallery = () => {
  const { language } = useLanguage(); // Get the current language from the context
  const translations: {
    [key: string]: {
      overlayTexts: string[];
      viewGallery: string;
    };
  } = {
    SR: {
      overlayTexts: [
        "Udoban boravak",
        "Luksuzna soba",
        "Prekrasna priroda",
        "Moderan dizajn",
      ],
      viewGallery: "Pogledajte celu galeriju",
    },
    EN: {
      overlayTexts: [
        "Comfortable Stay",
        "Luxury Room",
        "Beautiful Nature",
        "Modern Design",
      ],
      viewGallery: "View Full Gallery",
    },
    DE: {
      overlayTexts: [
        "Komfortabler Aufenthalt",
        "Luxuszimmer",
        "Schöne Natur",
        "Modernes Design",
      ],
      viewGallery: "Vollständige Galerie ansehen",
    },
  };

  return (
    <GallerySection>
      <ImageGrid>
        <ImageWrapper>
          <Image src="/image1.jpg" alt="1-BEDROOM PHASE I" />
          <Overlay>
            <OverlayText>{translations[language].overlayTexts[0]}</OverlayText>
          </Overlay>
        </ImageWrapper>
        <ImageWrapper>
          <Image src="/image4.jpg" alt="1-BEDROOM PHASE II" />
          <Overlay>
            <OverlayText>{translations[language].overlayTexts[1]}</OverlayText>
          </Overlay>
        </ImageWrapper>
        <ImageWrapper>
          <Image src="/image5.jpg" alt="2-BEDROOM PHASE I" />
          <Overlay>
            <OverlayText>{translations[language].overlayTexts[2]}</OverlayText>
          </Overlay>
        </ImageWrapper>
        <ImageWrapper>
          <Image src="/image8.jpg" alt="2-BEDROOM PHASE II" />
          <Overlay>
            <OverlayText>{translations[language].overlayTexts[3]}</OverlayText>
          </Overlay>
        </ImageWrapper>
      </ImageGrid>
      <ButtonWrapper>
        <Link href="/gallery" passHref>
          <ViewButton>{translations[language].viewGallery}</ViewButton>
        </Link>
      </ButtonWrapper>
    </GallerySection>
  );
};

const GallerySection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // Full viewport height
  padding: 2rem;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 1rem;
    height: auto;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  height: 75%; // Full height for the grid

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%; // Full height for the wrapper

  @media (max-width: 768px) {
    height: auto;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // Ensures image covers the container
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-transform: uppercase;
  font-family: "Arial", sans-serif; /* Change this to your desired font */

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

const OverlayText = styled.span`
  color: #fff;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  margin-top: 3rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 2px;
    background-color: #1a513a;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
    &::before,
    &::after {
      height: 1px;
    }
  }
`;

const ViewButton = styled.button`
  background-color: transparent;
  color: #1a513a;
  border: 2px solid #1a513a;
  padding: 1.3rem 1.8rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1a513a;
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
  }
`;

export default Gallery;
