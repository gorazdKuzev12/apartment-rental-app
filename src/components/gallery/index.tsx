"use client";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Album from "../album";

const Gallery = () => {
  const { language } = useLanguage(); // Get the current language from the context
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null); // Track selected image index
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null); // Track selected album index

  const translations: {
    [key: string]: {
      overlayTexts: string[];
      viewGallery: string;
    };
  } = {
    SR: {
      overlayTexts: [
        "Eksterijer",  // Exterior
        "Interijer",   // Interior
        "Proslave",    // Events/Celebrations
        "Opustanje",   // Relaxation
      ],
      viewGallery: "Pogledajte celu galeriju",
    },
    EN: {
      overlayTexts: [
        "Exterior",
        "Interior",
        "Events",
        "Relaxation",
      ],
      viewGallery: "View Full Gallery",
    },
    DE: {
      overlayTexts: [
        "Außenbereich",  // Exterior
        "Innenbereich",  // Interior
        "Feierlichkeiten", // Events/Celebrations
        "Entspannung",    // Relaxation
      ],
      viewGallery: "Vollständige Galerie ansehen",
    },
  };

  // Different albums for each section
  const albums = {
    exterior: [
      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/ynbrmyc8q8p4xbxw1g9c.jpg", alt: "Exterior 2" },

      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/g6xto0ihphpdnnei5wro.jpg", alt: "Exterior 5" },

      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/rtyrosfavnuau4oshoc9.jpg", alt: "Exterior 1" },
      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/ri0ovj6z2hz2hjp1pwqv.jpg", alt: "Exterior 3" },
      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/x09bx0iwzqn8kcalzduf.jpg", alt: "Exterior 4" },
      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/sz4zeturu6epfnjeimyj.jpg", alt: "Exterior 6" }
    ],
    interior: [
      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6695_rosge8.jpg", alt: "Interior 7" },

      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6700_adg7qh.jpg", alt: "Interior 5" },

      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6716_zrhnzb.jpg", alt: "Interior 4" },

      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6717_za4r1a.jpg", alt: "Interior 3" },

      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6701_kacigj.jpg", alt: "Interior 2" },

      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6697_lxg2yv.jpg", alt: "Interior 1" },

      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6693_xzalps.jpg", alt: "Interior 9" },

      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6698_jdi0re.jpg", alt: "Interior 6" },
      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6694_euwmsb.jpg", alt: "Interior 8" },
    ],
    events: [
      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6712_qdkbfv.jpg", alt: "Proslave 2" },

      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6710_j66xie.jpg", alt: "Proslave 1" },
      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6706_rvkmor.jpg", alt: "Proslave 3" },
      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6707_w0lxk5.jpg", alt: "Proslave 4" }
    ],
    relaxation: [
      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6704_ljtxp8.jpg", alt: "Relaxation 1" },
      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6703_lxyhbi.jpg", alt: "Relaxation 2" },
      { src: "https://res.cloudinary.com/dw9cab9ab/image/upload/v1/IMG_6705_ax4det.jpg", alt: "Relaxation 3" }
    ],
  };

  const galleryImages = [
    { src: albums.exterior[0].src, alt: "Exterior" },
    { src: albums.interior[0].src, alt: "Interior" },
    { src: albums.events[0].src, alt: "Events" },
    { src: albums.relaxation[0].src, alt: "Relaxation" },
  ];

  const handleImageClick = (index: number) => {
    setSelectedAlbum(index); // Set selected album based on the clicked image
    setSelectedImageIndex(0); // Start with the first image of that album
  };

  const handleCloseAlbum = () => {
    setSelectedImageIndex(null); // Close the album
    setSelectedAlbum(null); // Reset the album
  };

  return (
    <>
      <GallerySection>
        <ImageGrid>
          {galleryImages.map((image, index) => (
            <ImageWrapper key={index} onClick={() => handleImageClick(index)}>
              <Image src={image.src} alt={image.alt} />
              <Overlay>
                <OverlayText>{translations[language].overlayTexts[index]}</OverlayText>
              </Overlay>
            </ImageWrapper>
          ))}
        </ImageGrid>
        <ButtonWrapper>
          <Link href="/gallery" passHref>
            <ViewButton>{translations[language].viewGallery}</ViewButton>
          </Link>
        </ButtonWrapper>
      </GallerySection>

      {selectedImageIndex !== null && selectedAlbum !== null && (
        <Album
          images={
            selectedAlbum === 0
              ? albums.exterior
              : selectedAlbum === 1
              ? albums.interior
              : selectedAlbum === 2
              ? albums.events
              : albums.relaxation
          }
          currentIndex={selectedImageIndex}
          onClose={handleCloseAlbum}
        />
      )}
    </>
  );
};

const GallerySection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;

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
  width: 100%;
  padding-top: 75%; /* 4:3 Aspect Ratio */
  overflow: hidden;

  @media (max-width: 768px) {
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; // Ensures image covers the container
  transition: transform 0.3s ease;
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
  margin-top: 4rem;
  margin-bottom: 3rem;

  position: relative;

 

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }


  @media (max-width: 768px) {
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
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Montserrat";
  background-color: #1a513a;
  color: #fff;
  &:hover {

    color: #1a513a;
  border: 2px solid #1a513a;
  background-color: white;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
`;

export default Gallery;
