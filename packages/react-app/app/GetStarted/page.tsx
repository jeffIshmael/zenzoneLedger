"use client";

import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-200 ">
      <div className="flex flex-col items-center justify-center mt-12 sm:flex-row sm:items-center sm:justify-center sm:space-x-6 sm:space-y-0 p-2 w-96 sm:w-auto mx-auto">
        <div className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-white shadow-gray-500 p-4">
          <h1 className="font-bold text-3xl mb-4 text-black">
            Sign up{" "}
            <span>
              <small className="text-small font-normal text-sm">as</small>
            </span>
          </h1>
          <div className="flex justify-center">
            <Link href={"/SignUp"}>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                type="button"
              >
                Carbon credit buyer
              </button>
            </Link>

            <Link href={"/OffSignUp"}>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline "
                type="button"
              >
                Offsetter
              </button>
            </Link>
          </div>
          <div className="mt-2">
            <Link href={"/ValiSignUp"}>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Validator
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;