// components/AboutUs.js
"use client";
import styled from "styled-components";

const AboutUs = () => {
  return (
    <AboutSection>
      <Container>
        <LeftColumn>
          <Logo src="/logo.png" alt="Cilla Smaragdis Logo" />
          <Tagline>Luxury Apartments</Tagline>
          <Title>NoCo Life in the Heart of Greeley</Title>
          <Separator />
        </LeftColumn>
        <RightColumn>
          <Description>
            In the heart of Greeley, Cilla Smaragdis offers deluxe living and
            newly designed apartments within walking distance to countless
            shops, restaurants, and schools. If you've been searching for a
            balance between amazing amenities and high-end finishes in a central
            location - your search is over. Quietly tucked away, yet close to
            all of life's modern conveniences, see why Cilla Smaragdis is the
            perfect place to call home.
          </Description>
          <ViewButton>View Gallery</ViewButton>
        </RightColumn>
      </Container>
    </AboutSection>
  );
};

const AboutSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; // Full viewport height
  padding: 0 2rem;
  background-color: #f9f9f9;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  gap: 2rem;
`;

const LeftColumn = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RightColumn = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 1rem;
`;

const Tagline = styled.h2`
  font-size: 1.75rem;
  font-style: italic;
  margin-bottom: 0.5rem;
  color: #a8a8a8;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a513a;
`;

const Separator = styled.hr`
  width: 50px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #717171;
`;

const ViewButton = styled.button`
  background-color: transparent;
  color: #1a513a;
  border: 2px solid #1a513a;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1a513a;
    color: #fff;
  }
`;

export default AboutUs;
