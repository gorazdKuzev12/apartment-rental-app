// components/BookNow.js
"use client";
import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookNow = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <BookNowSection>
      <Container>
        <LeftColumn>
          <Title>Get In Touch With Our Leasing Team Today</Title>
          <Description>
            Our team is happy to answer any questions on availability, pricing,
            and to schedule a tour to find your new home.
          </Description>
        </LeftColumn>
        <RightColumn>
          <Form>
            <InputWrapper>
              <Label htmlFor="name">Name*</Label>
              <Input type="text" id="name" name="name" required />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="email">Email*</Label>
              <Input type="email" id="email" name="email" required />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="phone">Phone</Label>
              <Input type="tel" id="phone" name="phone" />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="move-in-date">Move-In Date</Label>
              <StyledDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select a date"
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="move-out-date">Move-Out Date</Label>
              <StyledDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select a date"
              />
            </InputWrapper>
            <CheckboxWrapper>
              <Label>How many guests</Label>
              <CheckboxContainer>
                <CheckboxLabel>
                  <Checkbox type="checkbox" name="1-bedroom" />1
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox type="checkbox" name="2-bedroom" />2
                </CheckboxLabel>
              </CheckboxContainer>
            </CheckboxWrapper>
            <ButtonWrapper>
              <SubmitButton type="submit">Book</SubmitButton>
            </ButtonWrapper>
          </Form>
        </RightColumn>
      </Container>
    </BookNowSection>
  );
};

const BookNowSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  gap: 2rem;
`;

const LeftColumn = styled.div`
  flex: 1;
  min-width: 300px;
`;

const RightColumn = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1a513a;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #717171;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #5e5e5e;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
color: black
  margin: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const SubmitButton = styled.button`
  background-color: #1a513a;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;

  &:hover {
    background-color: #16432a;
  }
`;

export default BookNow;
