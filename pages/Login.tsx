import React, { useState } from "react";
import styled from "styled-components";
import Container from "../ui/Container.js";
import FormWrapper from "../ui/FormWrapper.js";
import StyledForm from "../ui/StyledForm.js";
import InputField from "../ui/InputField.js";
import Label from "../ui/Label.js";
// import LoginButton from "../ui/LoginButton.js";

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { createClient } from "@supabase/supabase-js";

// Supabase client setup
// const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_ANON_KEY");

// Validation schema
// const validationSchema = Yup.object({
//   email: Yup.string().email("Invalid email format").required("Required"),
//   password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
// });

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  //   const handleSubmit = async (values: { email: string; password: string }) => {
  //     setError(null);
  //     const { error } = await supabase.auth.signInWithPassword({
  //       email: values.email,
  //       password: values.password,
  //     });
  //     if (error) setError(error.message);
  //   };

  return (
    <Container>
      <FormWrapper>
        <h2>Login</h2>
        <StyledForm>
          <InputField>
            {/* <Field name="email" type="email" id="email" required /> */}
            <Label htmlFor="email">Email</Label>
            {/* <ErrorMessage name="email" component="span" className="error" /> */}
          </InputField>

          <InputField>
            {/* <Field name="password" type="password" id="password" required /> */}
            <Label htmlFor="password">Password</Label>
            {/* <ErrorMessage name="password" component="span" className="error" /> */}
          </InputField>

          {error && <ErrorBox>{error}</ErrorBox>}

          {/* <LoginButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </LoginButton> */}
        </StyledForm>
      </FormWrapper>
    </Container>
  );
};

export default Login;

// Styled Components

const ErrorBox = styled.div`
  background: #ffdddd;
  color: #d8000c;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
`;
