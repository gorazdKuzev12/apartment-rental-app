"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";

const SCROLL_FRACTION = 0.5;

function getSeeMoreText(language: string) {
  switch (language) {
    case "sr":
      return "Vidi više";
    case "de":
      return "Mehr sehen";
    default:
      return "See More";
  }
}

const GalleryShowcaseScroll = ({
  galleryData,
  language,
}: {
  galleryData: any[];
  language: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoryImages, setSelectedCategoryImages] = useState<any[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const reorderedGalleryData = useMemo(() => {
    if (!galleryData) return [];
    return [...galleryData].sort((a, b) => {
      if (a.title.en === "Exterior") return -1;
      if (b.title.en === "Exterior") return 1;
      return 0;
    });
  }, [galleryData]);

  const numSlides = reorderedGalleryData.length;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const scrollInSection = window.scrollY - containerTop;
      const stepSize = window.innerHeight * SCROLL_FRACTION;
      const stepIndex = Math.floor(scrollInSection / stepSize);
      const clampedIndex = Math.max(0, Math.min(stepIndex, numSlides - 1));

      setCurrentSlide(clampedIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [numSlides]);

  const translateX = -currentSlide * 100;

  const openModal = (images: any[]) => {
    setSelectedCategoryImages(images);
    setModalOpen(true);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCategoryImages([]);
  };

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) =>
        prev === selectedCategoryImages.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 500);
  };

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedCategoryImages.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 500);
  };

  const [dimensions, setDimensions] = useState({ stepSize: 0, totalHeight: 0 });

  useEffect(() => {
    // This code only runs on the client side
    const stepSize = window.innerHeight * SCROLL_FRACTION;
    const totalHeight = numSlides * stepSize + window.innerHeight;
    setDimensions({ stepSize, totalHeight });

    // Handle window resize
    const handleResize = () => {
      const stepSize = window.innerHeight * SCROLL_FRACTION;
      const totalHeight = numSlides * stepSize + window.innerHeight;
      setDimensions({ stepSize, totalHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [numSlides]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen, nextImage, prevImage]);

  return (
    <>
      <Container ref={containerRef} style={{ height: `${dimensions.totalHeight}px` }}>
        <StickyContainer>
          <SlidesWrapper style={{ transform: `translateX(${translateX}vw)` }}>
            {reorderedGalleryData.map((slide, idx) => {
              const slideTitle = slide.title[language] || slide.title.en;

              return (
                <Slide
                  key={idx}
                  style={{ backgroundImage: `url(${slide.poster_image.src})` }}
                >
                  <Overlay>
                    <OverlayContent>
                      <CategoryTitle>{slideTitle}</CategoryTitle>
                      <SeeMoreButton onClick={() => openModal(slide.images)}>
                        {getSeeMoreText(language)}
                      </SeeMoreButton>
                    </OverlayContent>
                  </Overlay>
                </Slide>
              );
            })}
          </SlidesWrapper>
        </StickyContainer>
      </Container>

      {modalOpen && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <ImageWrapper>
              <AnimatedImage
                key={selectedCategoryImages[currentImageIndex].src}
                src={selectedCategoryImages[currentImageIndex].src}
                alt={
                  selectedCategoryImages[currentImageIndex].alt[language] ||
                  selectedCategoryImages[currentImageIndex].alt.en
                }
              />
              <ImageAlt>
                {selectedCategoryImages[currentImageIndex].alt[language] ||
                  selectedCategoryImages[currentImageIndex].alt.en}
              </ImageAlt>
            </ImageWrapper>

            <Navigation>
              <NavButton onClick={prevImage}>❮</NavButton>
              <NavButton onClick={nextImage}>❯</NavButton>
            </Navigation>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default GalleryShowcaseScroll;

/* ===== Styled Components ===== */

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const SlidesWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  transition: transform 0.3s ease;
`;

const Slide = styled.div`
  flex: 0 0 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const OverlayContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const CategoryTitle = styled.h2`
  color: white;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SeeMoreButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 80vw;
  max-height: 80vh;
  background-color: #222;
  border-radius: 10px;
  padding: 1rem;
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 3rem;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const swipeLeft = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const swipeRight = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const AnimatedImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  animation: ${fadeIn} 0.5s ease;

  &.swipe-left {
    animation: ${swipeLeft} 0.5s ease;
  }

  &.swipe-right {
    animation: ${swipeRight} 0.5s ease;
  }
`;

const ImageAlt = styled.div`
  margin-top: 1rem;
  color: white;
  font-size: 1.2rem;
  text-align: center;
`;

const Navigation = styled.div`
  position: absolute;
  top: 50%;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-50%);
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  border-radius: 50%;
  text-align: center;
  line-height: 3rem;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;
