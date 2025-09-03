import React, { useContext, useState } from "react";
import { IoRemoveOutline } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();
  const goToLogin = () => navigateTo("/login");
  const goToHome = () => navigateTo("/");

  // Validate DOB format: dd/mm/yyyy
  const isValidDOB = (dateStr) => {
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return dobRegex.test(dateStr);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!isValidDOB(dob)) {
      toast.error("DOB must be in format dd/mm/yyyy");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/patient/register",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          password,
          role: "Patient",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="flex">
      <div className="w-1/3 h-screen bg-[#76dbcf] flex flex-col place-content-center items-center rounded-r-full">
        <h2 className="text-4xl font-bold text-center">Hello, We are Ucpians!</h2>
        <IoRemoveOutline size={80} />
        <p className="text-2xl mb-6 text-center">Already Have an Account?</p>
        <button
          className="w-40 rounded-2xl h-10 font-semibold border-2 border-black"
          onClick={goToLogin}
        >
          Sign In
        </button>
        <button
          className="w-44 mt-5 rounded-2xl h-10 font-semibold border-2 border-black"
          onClick={goToHome}
        >
          Home
        </button>
      </div>
      <div className="w-2/3 h-screen flex flex-col place-content-center">
        <h2 className="text-4xl mb-5 text-center font-bold">Register</h2>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleRegistration}
        >
          <div className="flex w-full justify-around mb-6">
            <input
              className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-around mb-6">
            <input
              className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
              type="tel"
              placeholder="Phone Number (e.g. 03XXXXXXXXX)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-around mb-6">
            <input
              className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
              type="text"
              placeholder="CNIC No. (e.g. 35202-1234567-8)"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
              type="text"
              placeholder="Date of Birth (dd/mm/yyyy)"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-around mb-6">
            <label className="w-96 h-10 bg-zinc-200 rounded-2xl px-4">
              <select
                className="w-full h-10 bg-zinc-200 border-0 outline-none rounded-2xl"
                name="selectedGender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="nosay">Prefer not to say</option>
              </select>
            </label>
            <input
              className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-center mt-3">
            <button
              className="w-96 bg-[#76dbcf] rounded-2xl h-10 font-semibold"
              type="submit"
            >
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
