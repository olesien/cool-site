import React, { useState } from "react";
import "../register/register.css";
import { toast } from "react-toastify";
import axios from "axios";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    user_role: 1, 
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveFormData = async (data: Record<string, any>) => {
    try {
      const response = await axios.post("http://localhost:8080/users/add", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const apiResponse = response.data; 
      toast.success(apiResponse.message || "Registration successful!");
      console.log("User added:", apiResponse.data);
    } catch (error) {
      console.error("Error saving data:", error);
  
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred";
        toast.error(`Error: ${errorMessage}`);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    await saveFormData(formData);

    setFormData({
      username: "",
      password: "",
      user_role: 1,
    });
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
