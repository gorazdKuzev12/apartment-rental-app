// pages/admin.js
"use client";
import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/header";
import Footer from "@/components/footer";

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
  });
  const [customers, setCustomers] = useState([]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "kristinaperica12345") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    setCustomers([...customers, newCustomer]);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
    });
  };

  return (
    <>
      <Header />
      <Container>
        {!isAuthenticated ? (
          <PasswordForm onSubmit={handlePasswordSubmit}>
            <PasswordLabel>Enter Admin Password</PasswordLabel>
            <PasswordInput
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <PasswordButton type="submit">Submit</PasswordButton>
          </PasswordForm>
        ) : (
          <>
            <Section>
              <SectionTitle>Add New Customer</SectionTitle>
              <Form onSubmit={handleAddCustomer}>
                <Input
                  type="text"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                  placeholder="Customer Name"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  placeholder="Customer Email"
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleInputChange}
                  placeholder="Customer Phone"
                  required
                />
                <Input
                  type="date"
                  name="checkIn"
                  value={newCustomer.checkIn}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="date"
                  name="checkOut"
                  value={newCustomer.checkOut}
                  onChange={handleInputChange}
                  required
                />
                <Button type="submit">Add Customer</Button>
              </Form>
            </Section>
            <Section>
              <SectionTitle>Booked Customers</SectionTitle>
              <Table>
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                    <Th>Check-In</Th>
                    <Th>Check-Out</Th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={index}>
                      <Td>{customer.name}</Td>
                      <Td>{customer.email}</Td>
                      <Td>{customer.phone}</Td>
                      <Td>{customer.checkIn}</Td>
                      <Td>{customer.checkOut}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Section>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: #f5f5f5;
  min-height: 100vh;
`;

const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PasswordLabel = styled.label`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333;
`;

const PasswordInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PasswordButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background: #1a73e8;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #155ab6;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #1a513a;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background: #1a513a;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #218838;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 1rem;
  background: #f8f8f8;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

export default AdminPage;
