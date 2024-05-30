"use client";
import { useState } from "react";
import styled from "styled-components";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Function to convert Firestore Timestamp to a readable date
const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString();
};

const AdminPanel = () => {
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
  });
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "Bookings"), {
      ...newCustomer,
      status: "Pending",
    });
    fetchCustomers();
  };

  const fetchCustomers = async () => {
    const querySnapshot = await getDocs(collection(db, "Bookings"));
    const customersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCustomers(customersList);
    setLoading(false);
  };

  const handleAuthenticate = () => {
    if (password === "kristinaperica12345") {
      setAuthenticated(true);
      fetchCustomers();
    } else {
      alert("Incorrect password");
    }
  };

  const handleStatusChange = async (id, status) => {
    const bookingDoc = doc(db, "Bookings", id);
    await updateDoc(bookingDoc, { status });
    fetchCustomers();
  };

  if (!authenticated) {
    return (
      <Container>
        <Section>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <Button onClick={handleAuthenticate}>Authenticate</Button>
          </Form>
        </Section>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container>
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
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <Td>{customer.name}</Td>
                  <Td>{customer.email}</Td>
                  <Td>{customer.phone}</Td>
                  <Td>{formatDate(customer.checkIn)}</Td>
                  <Td>{formatDate(customer.checkOut)}</Td>
                  <Td>{customer.status}</Td>
                  <Td>
                    {customer.status === "Pending" && (
                      <>
                        <Button
                          onClick={() =>
                            handleStatusChange(customer.id, "Accepted")
                          }
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() =>
                            handleStatusChange(customer.id, "Cancelled")
                          }
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {customer.status === "Accepted" && (
                      <Button
                        onClick={() =>
                          handleStatusChange(customer.id, "Cancelled")
                        }
                      >
                        Cancel
                      </Button>
                    )}
                    {customer.status === "Cancelled" && (
                      <Button
                        onClick={() =>
                          handleStatusChange(customer.id, "Accepted")
                        }
                      >
                        Accept
                      </Button>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 0.5rem;
`;

export default AdminPanel;
