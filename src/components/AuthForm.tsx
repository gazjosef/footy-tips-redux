import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type AuthFormProps = {
  mode: "login" | "register";
};

interface FormData {
  email: string;
  password: string;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    try {
      let result;
      if (mode === "login") {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }

      const { data: responseData, error } = result;

      console.log("Supabase response data:", responseData);
      console.log("Supabase error:", error);

      if (error) {
        toast.error(error.message);
        return;
      }

      if (mode === "register") {
        // Usually, email confirmation is required, so no immediate session
        toast.info(
          "Registration successful! Please check your email to confirm your account before logging in."
        );
        // Optionally, navigate to login page or stay here
        navigate("/login");
      } else {
        // On login, if no error, user is authenticated, navigate to dashboard
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      // Unexpected errors
      console.error(err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center capitalize">
          {mode}
        </h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full px-4 py-2 mb-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="w-full px-4 py-2 mb-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}
