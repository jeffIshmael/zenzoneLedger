"use client";

import React, { useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { contractAbi, contractAddress } from "../Blockchain/CarbonTraceAbi";

const Offsetters = () => {
  const { data, refetch } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getOffsetters",
  });

  interface Offsetter {
    category: string;
    compName: string;
    description: string;
    email: string;
    offSetCat: string;
    offsetterAdd: string;
    offsetterId: number;
    phoneNo: number;
    regPin: number;
  }

  const offsetters = (data as Offsetter[]) || [];

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div
      className="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col bg-white
  dark:bg-gray-600 rounded-lg"
    >
      <h3
        className="flex items-center pt-1 pb-1 px-8 text-lg font-semibold
      capitalize dark:text-gray-300"
      >
        <span>Top Organisations</span>
        <button className="ml-2">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 256 512">
            <path
              d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
                  0l-22.6-22.6c-9.4-9.4-9.4-24.6
                  0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6
                  0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
                  136c9.5 9.4 9.5 24.6.1 34z"
            ></path>
          </svg>
        </button>
      </h3>

      <div>
        <ul className="pt-1 pb-2 px-3 overflow-y-auto">
          {offsetters.length === 0 && (
            <div>No registered offset organisations</div>
          )}

          {offsetters.map((offsetter: Offsetter, index: number) => (
            <li className="mt-2" key={index}>
              <a
                className="p-5 flex flex-col justify-between
                      bg-gray-100 dark:bg-gray-200 rounded-lg"
                href="#"
              >
                <div
                  className="flex items-center justify-between
                          font-semibold capitalize dark:text-gray-700"
                >
                  <span>{offsetter.compName}</span>

                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 fill-current mr-1
                                  text-gray-600"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M14 12l-4-4v3H2v2h8v3m12-4a10
                                      10 0 01-19.54 3h2.13a8 8 0
                                      100-6H2.46A10 10 0 0122 12z"
                      ></path>
                    </svg>
                    <span>{offsetter.category}</span>
                  </div>
                </div>

                <p
                  className="text-sm font-medium leading-snug
                          text-gray-600 my-3"
                >
                  {offsetter.description}
                </p>

                <div className="flex justify-between">
                  <div className="flex">
                    <img
                      className="h-6 w-6 rounded-full mr-3"
                      src="https://i.pinimg.com/originals/b7/06/0b/b7060b60f6ee1beeedf7d648dabd89a1.jpg"
                      alt=""
                    />

                    <span
                      className="text-blue-500
                                      font-semibold"
                    >
                      {offsetter.offSetCat}
                    </span>
                  </div>

                  <p
                    className="text-sm font-medium leading-snug
                              text-gray-600"
                  ></p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Offsetters;
