import React, { useState } from "react";
import { Link } from "react-router-dom";
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

// Floating Label Input
const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: transparent;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 5px;
    font-size: 0.85rem;
    color: #007bff;
  }
`;

// Floating Label
const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  background: white;
  padding: 0 5px;
  font-size: 1rem;
  color: #888;
  transition: 0.2s ease-out;
  pointer-events: none;
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "john@gmail.com",
    password: "Pass1234",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data.user) toast.success("Login successful!");
    } catch (error: any) {
      toast.error(`Error: ${error.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlaceCentre>
      <FormContainer>
        <FormTitle>Login</FormTitle>
        <Form onSubmit={handleLogin}>
          <InputContainer>
            <Input
              type="email"
              name="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Label>Email address</Label>
          </InputContainer>

          <InputContainer>
            <Input
              type="password"
              name="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Label>Password</Label>
          </InputContainer>

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <p>
          Not a user? <StyledLink to="/register">Register here</StyledLink>
        </p>
      </FormContainer>
    </PlaceCentre>
  );
};

export default LoginForm;
