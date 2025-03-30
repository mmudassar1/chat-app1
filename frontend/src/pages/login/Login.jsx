import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-[400px] mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-transparent bg-clip-padding backdrop-filter backdrop-blur-lg ">
        <h1 className="text-3xl font-semibold text-center text-gray-400">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Username </span>
            </label>
            <input
              className="w-full input input-bordered h-10 rounded-md"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Password </span>
            </label>
            <input
              className="w-full input input-bordered h-10 rounded-md"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 inline-block"
          >
            {" "}
            Dont't have an acount?
          </Link>
          <button className="btn btn-block btn-sm mt-2 rounded-md"
            disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span>: "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
