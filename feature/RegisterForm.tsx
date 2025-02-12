// src/RegisterForm.tsx
import React, { useState } from "react";
import { supabase } from "../src/supabase"; // Adjust the path as necessary
import { toast } from "react-toastify";
import styled from "styled-components";

// Styled Components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      toast.error(`Error: ${error.message}`);
      return;
    }

    if (data.user) {
      toast.success(
        "Registration successful! Please check your email for verification."
      );
    }
  };

  return (
    <FormContainer>
      <FormTitle>Register</FormTitle>
      <Form onSubmit={handleRegister}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
