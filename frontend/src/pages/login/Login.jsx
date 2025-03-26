import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-[400px] mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-transparent bg-clip-padding backdrop-filter backdrop-blur-lg ">
        <h1 className="text-3xl font-semibold text-center text-gray-400">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Username </span>
            </label>
            <input
              className="w-full input input-bordered h-10 rounded-md"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Password </span>
            </label>
            <input
              className="w-full input input-bordered h-10 rounded-md"
              type="text"
              placeholder="Enter your Password"
            />
          </div>
          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-600 inline-block"
          >
            {" "}
            Dont't have an acount?
          </a>
          <button className="btn btn-block btn-sm mt-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
