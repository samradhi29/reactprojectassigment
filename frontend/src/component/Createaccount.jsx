import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const server = "https://popx-hl6a.onrender.com";
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    companyName: "",
    isAgency: "yes",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Form Data:", formData);
      const response = await axios.post(`${server}/register`, formData);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error creating account", error);
    }
    setLoading(false);
  };

  const renderInputField = (label, type, name, placeholder) => (
    <fieldset className="mb-3 w-[100%] border border-gray-300 p-1 rounded-md">
      <legend className="text-gray-700 font-medium text-sm">{label}{name !== "companyName" && <span className="text-red-500">*</span>}</legend>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-1 border-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
      />
    </fieldset>
  );

  return (
    <div className="h-[80vh] bg-white p-6 flex flex-col justify-start items-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Create your <span className="text-purple-700">PopX account</span>
      </h1>
      <form className="flex flex-col gap-2 text-left w-[80%] max-w-[700px]" onSubmit={handleSubmit}>
        {renderInputField("Full Name", "text", "fullName", "Enter your full name")}
        {renderInputField("Phone number", "tel", "phoneNumber", "Enter your phone number")}
        {renderInputField("Email address", "email", "email", "Enter your email")}
        {renderInputField("Password", "password", "password", "Enter your password")}
        {renderInputField("Company name", "text", "companyName", "Enter your company name")}

        <div className="mt-4 mb-6">
          <legend className="text-sm">Are you an Agency?<span className="text-red-500">*</span></legend>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="isAgency"
                value="yes"
                checked={formData.isAgency === "yes"}
                onChange={handleChange}
                className="accent-purple-500"
              />
              Yes
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="isAgency"
                value="no"
                checked={formData.isAgency === "no"}
                onChange={handleChange}
                className="accent-purple-500"
              />
              No
            </label>
          </div>
        </div>

        <div className="mt-4 mb-4">
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 text-base w-[100%]"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
} 
