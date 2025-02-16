import React, { useState } from "react";
import { supabase } from "../src/supabase";
import { toast } from "react-toastify";
import styled from "styled-components";
import PlaceCentre from "../ui/PlaceCentre";

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
  gap: 1.5rem;
`;

const FloatingLabelWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 0.75rem 0.25rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: transparent;
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #4caf50;
    box-shadow: 0 0 4px rgba(76, 175, 80, 0.5);
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: scale(0.85) translateY(-1.5rem);
    color: #4caf50;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  background: white;
  padding: 0 5px;
  font-size: 1rem;
  color: #777;
  transition: all 0.2s ease-in-out;
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

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
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
    <PlaceCentre>
      <FormContainer>
        <FormTitle>Register</FormTitle>
        <Form onSubmit={handleRegister}>
          <FloatingLabelWrapper>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
            />
            <Label htmlFor="email">Email</Label>
          </FloatingLabelWrapper>
          <FloatingLabelWrapper>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <Label htmlFor="password">Password</Label>
          </FloatingLabelWrapper>
          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </Form>
      </FormContainer>
    </PlaceCentre>
  );
};

export default RegisterForm;
