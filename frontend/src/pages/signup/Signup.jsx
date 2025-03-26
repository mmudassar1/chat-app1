import React from "react";
import GenderCheckbox from "./GenderCheckbox";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-[400px] mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-transparent bg-clip-padding backdrop-filter backdrop-blur-lg ">
        <h1 className="text-3xl font-semibold text-center text-gray-400">
          Signup
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Full Name </span>
            </label>
            <input
              className="w-full input input-bordered h-10 rounded-md"
              type="text"
              placeholder="John Doe"
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
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Password </span>
            </label>
            <input
              className="w-full input input-bordered h-10 rounded-md"
              type="text"
              placeholder="Enter Password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Confirm Password </span>
            </label>
            <input
              className="w-full input input-bordered h-10 rounded-md"
              type="text"
              placeholder="Confirm Password"
            />
          </div>

            <GenderCheckbox />

          <a
            href="#"
            className=" text-sm hover:underline hover:text-blue-600 inline-block"
          >
            Already have an acount?

          </a>
          <button className="btn btn-block btn-sm mt-2 rounded-md">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
