import React, { useState } from "react";
import "../help/help.css";
import { toast } from "react-toastify";
import axios from "axios";

const Help: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveFormData = async (data: Record<string, any>) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/message/add",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Message has been saved successfully!");
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          toast.error(`Error: ${JSON.stringify(error.response.data)}`);
        } else if (error.message) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error("Unknown error occurred");
        }
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
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="form-container">
      <form className="help-form" onSubmit={handleSubmit}>

      <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
        />

        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Enter the subject"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message"
          rows={4}
          required
        ></textarea>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Help;
