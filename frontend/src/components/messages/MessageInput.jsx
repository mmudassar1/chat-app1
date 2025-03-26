import React from "react";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className="input input-bordered w-full rounded-lg text-sm block p-2.5 bg-gray-700 text-white"
          placeholder="Type a message…"
        />
        <button
          type="submit"
          className="inset-y-0 right-0 absolute flex items-center cursor-pointer pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
