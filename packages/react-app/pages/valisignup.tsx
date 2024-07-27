import React from "react";
import Header from "../components/Header";
import Image from "next/image";

const ValiSignUp = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-slate-200">
        <div className="flex flex-col items-center justify-center mt-2">
          <div className="flex flex-col items-center justify-center rounded-md bg-gray-400 shadow-lg shadow-gray-500 p-4">
            <Image
              src={"/static/images/logo.jpg"}
              width={150}
              height={150}
              alt="logo"
              className="rounded-lg"
            />
            <h1 className="font-bold text-3xl mb-4 text-black mt-3">
              Register as Validator
            </h1>
            <form className="flex flex-col items-center justify-center">
              <label htmlFor="Full Name" className="font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="Full Name"
                id="Full Name"
                placeholder="Enter fullname"
                className="border border-gray-300 rounded text-black p-2 mb-4"
              />
              <label htmlFor="licence No." className="font-semibold">
                License No.
              </label>
              <input
                type="text"
                placeholder="Input License No."
                className="border border-gray-300 text-black rounded p-2 mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValiSignUp;
