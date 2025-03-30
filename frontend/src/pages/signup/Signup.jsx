import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import toast from "react-hot-toast";


const Signup = () => {


  const [input, setInput] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();
  const handleGenderChange = (gender) => {
    setInput({ ...input, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.password !== input.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    await signup(input);


  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-[400px] mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-transparent bg-clip-padding backdrop-filter backdrop-blur-lg ">
        <h1 className="text-3xl font-semibold text-center text-gray-400">
          Signup
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Full Name </span>
            </label>
            <input
              className="w-full input input-bordered h-10 rounded-md"
              type="text"
              placeholder="John Doe"
              value={input.fullName}
              onChange={(e) => setInput({ ...input, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Username </span>
            </label>
            <input
              className="w-full input input-bordered h-10 rounded-md"
              type="text"
              placeholder="johndoe"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Password </span>
            </label>
            <input
              className="w-full input input-bordered h-10 rounded-md"
              type="Password"
              placeholder="Enter Password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Confirm Password </span>
            </label>
            <input
              className="w-full input input-bordered h-10 rounded-md"
              type="Password"
              placeholder="Confirm Password"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox onChange={handleGenderChange} value={input.gender} />

          <Link
            to={"/login"}
            className=" text-sm hover:underline hover:text-blue-600 inline-block"
          >
            Already have an acount?
          </Link>
          <button
            className="btn btn-block btn-sm mt-2 rounded-md"
            disabled={loading}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
