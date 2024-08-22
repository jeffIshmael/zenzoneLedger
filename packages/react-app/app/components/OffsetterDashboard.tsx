"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { contractAddress, contractAbi } from "@/app/Blockchain/CarbonTraceAbi";
import { useBalance, useAccount, useReadContract } from "wagmi";
import MyApplications from "../(Application)/OffSetApplication/MyApplications";
import Buyers from "./Buyers";
// import { checkCUSDBalance } from "../Blockchain/cUSDBal";

const OffsetterDashboard = () => {
  const { address } = useAccount();
  const [activeSection, setActiveSection] = useState("section");
  const [balance, setBalance] = useState(0);

  const { data: offsetter } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getOffsetter",
    args: [address],
  });

  // useEffect(() => {
  //   const fetchBalance = async () => {
  //     try {
  //       const mybal = await checkCUSDBalance('0x4821ced48Fb4456055c86E42587f61c1F39c6315');
  //       setBalance(mybal);
  //     } catch (error) {
  //       console.error("Failed to fetch balance:", error);
  //     } 
  //   };

  //   fetchBalance();
  // }, [address]);

  // console.log(mybal);

  interface Result {
    category: string;
    compName: string;
    description: string;
    email: string;
    offSetCat: string;
    offsetterAdd: string;
    offsetterId: number;
    phoneNo: number;
    proposalIds: [];
    regPin: number;
  }

  const result = (offsetter as Result) || {};

  const { data, error, isPending } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "myOffsets",
    args: [result.proposalIds],
  });

  console.log(data);

  interface Application {
    approved: boolean;
    category: string;
    description: string;
    estAmount: number;
    ipfsHash: string;
    offsetterAdd: string;
    proposalId: number;
    timestamp: number;
  }

  const applications = (data as Application[]) || [];

  const getDate = (Timestamp: number) => {
    const FormattedDate = new Date(Timestamp * 1000).toLocaleString();
    return FormattedDate;
  };

  useEffect(() => {
    if (data) {
      console.log("we are live");
    }
    console.log("Not yet");
  }, [data]);

  // useEffect(() => {
  //   if (mybal) {
  //     console.log(mybal);
  //   }
  //   console.log("No yet");
  // }, [mybal]);

  const handleButtonClick = (sectionName: string) => {
    setActiveSection(sectionName); // Update active section on dashboard
  };

  console.log(data);
  console.log(address);

  return (
    <div className="bg-gray-100">
      <div className="h-screen w-full flex overflow-hidden select-none">
        <nav className="w-24 flex flex-col items-center bg-white dark:bg-gray-800 py-4">
          <Link href={"/"}>
            <div>
              <svg
                className="h-8 w-8 fill-current text-blue-600 dark:text-blue-300"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3m6.82
                          6L12 12.72 5.18 9 12 5.28 18.82 9M17 16l-5 2.72L7 16v-3.73L12
                          15l5-2.73V16z"
                ></path>
              </svg>
            </div>
          </Link>

          <ul className="mt-2 text-gray-700 dark:text-gray-400 capitalize">
            {/* <!-- Links --> */}

            <li className="mt-3 p-2 text-blue-600 dark:text-blue-300 rounded-lg">
              <button
                onClick={() => {
                  handleButtonClick("section");
                }}
                className=" flex flex-col items-center"
              >
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9
							17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10
							8h-8v10h8V11m-10 4H3v6h8v-6z"
                  ></path>
                </svg>
                <span className="text-xs mt-2">DashBoard</span>
              </button>
            </li>

            <li
              className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300
				rounded-lg"
            >
              <button
                onClick={() => {
                  handleButtonClick("applications");
                }}
                className=" flex flex-col items-center"
              >
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M23 3v-.5a2.5 2.5 0 00-5 0V3c-.55 0-1 .45-1 1v4c0
							.55.45 1 1 1h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1
							0h-3v-.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V3M6
							11h9v2H6v-2m0-4h9v2H6V7m16 4v5c0 1.11-.89 2-2 2H6l-4
							4V4a2 2 0 012-2h11v2H4v13.17L5.17 16H20v-5h2z"
                  ></path>
                </svg>
                <span className="text-xs text-center mt-2">
                  my applications
                </span>
              </button>
            </li>

            <li
              className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300
				rounded-lg"
            >
              <a href="#" className=" flex flex-col items-center">
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M21 18v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0
							012-2h14a2 2 0 012 2v1h-9a2 2 0 00-2 2v8a2 2 0 002
							2m0-2h10V8H12m4 5.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0
							011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5z"
                  ></path>
                </svg>
                <span className="text-xs mt-2">earnings</span>
              </a>
            </li>

            <li
              className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300
				rounded-lg"
            >
              <a href="#" className=" flex flex-col items-center">
                <svg className="fill-current h-5 w-5" viewBox="0 0 512 512">
                  <path
                    d="M505 442.7L405.3
							343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7
							44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208
							208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7
							17l99.7 99.7c9.4 9.4 24.6 9.4 33.9
							0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7
							0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128
							57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
                <span className="text-xs mt-2">funding opportunities</span>
              </a>
            </li>

            <li
              className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300
				rounded-lg"
            >
              <a href="#" className=" flex flex-col items-center">
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M19 19H5V8h14m0-5h-1V1h-2v2H8V1H6v2H5a2 2 0 00-2
							2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m-2.47
							8.06L15.47 10l-4.88 4.88-2.12-2.12-1.06 1.06L10.59
							17l5.94-5.94z"
                  ></path>
                </svg>
                <span className="text-xs mt-2">History</span>
              </a>
            </li>

            <li className="mt-3 p-2 hover:text-blue-600 rounded-lg">
              <a href="#" className=" flex flex-col items-center">
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0
							001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"
                  ></path>
                </svg>
                <span className="text-xs mt-2">Applications</span>
              </a>
            </li>
          </ul>

          <div
            className="mt-auto flex items-center p-2 text-blue-700 bg-purple-200
			dark:text-blue-500 rounded-full"
          >
            <a href="#">
              <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M12 1c-5 0-9 4-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 017-7
						7 7 0 017 7v2h-4v8h4v1h-7v2h6a3 3 0
						003-3V10c0-5-4.03-9-9-9z"
                ></path>
              </svg>
            </a>
          </div>
        </nav>

        <main
          className="my-1 pt-2 pb-2 px-10 flex-1 bg-gray-200 dark:bg-black rounded-l-lg
		transition duration-500 ease-in-out overflow-y-auto"
        >
          {activeSection === "section" && (
            <>
              <div className="flex flex-col capitalize text-3xl text-slate-200">
                <span className="font-semibold">hello,</span>
                <span>{result.compName}!</span>
              </div>
              <div className="flex">
                <Buyers />

                {applications.length === 0 ? (
                  <div
                    className="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col
				bg-purple-300 rounded-lg text-white"
                  >
                    <h3
                      className="flex items-center pt-1 pb-1 px-8 text-lg font-bold
					capitalize"
                    >
                      <span>Offsetting project applications</span>
                      <button className="ml-2">
                        <svg
                          className="h-5 w-5 fill-current"
                          viewBox="0 0 256 512"
                        >
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

                    <div className="flex flex-col items-center mt-12">
                      <img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png"
                        alt=" empty schedule"
                      />

                      <span className="font-bold mt-8">
                        Your do not have any applications yet.
                      </span>

                      <span className="text-purple-500">
                        Make your application
                      </span>

                      <Link href={"/OffSetApplication"}>
                        <button className="mt-8 bg-purple-800 rounded-lg py-2 px-4">
                          Apply
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div
                    className="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col
				bg-purple-300 rounded-lg text-white"
                  >
                    <h3
                      className="flex items-center pt-1 pb-1 px-8 text-lg font-bold
					capitalize"
                    >
                      <span>Offsetting project applications</span>
                      <button className="ml-2">
                        <svg
                          className="h-5 w-5 fill-current"
                          viewBox="0 0 256 512"
                        >
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
                    {applications.map(
                      (application: Application, index: number) => (
                        <div key={index}>
                          <div className="flex flex-col m-2 bg-slate-600 rounded-md p-2">
                            <h1>{application.category}</h1>
                            <p>{application.description}</p>
                            <small>
                              {getDate(Number(application.timestamp))}
                            </small>
                          </div>
                        </div>
                      )
                    )}
                    <Link href={"/OffSetApplication"}>
                      <div className="ml-32">
                        <button className="mt-8 items-center bg-purple-800 rounded-lg py-2 px-4">
                          Apply
                        </button>
                      </div>
                    </Link>
                  </div>
                )}
                {/* <div
                  className="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col
				bg-purple-300 rounded-lg text-white"
                >
                  <h3
                    className="flex items-center pt-1 pb-1 px-8 text-lg font-bold
					capitalize"
                  >
                    
                    <span>Offsetting project applications</span>
                    <button className="ml-2">
                      <svg
                        className="h-5 w-5 fill-current"
                        viewBox="0 0 256 512"
                      >
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

                  <div className="flex flex-col items-center mt-12">
                    <img
                      src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png"
                      alt=" empty schedule"
                    />

                    <span className="font-bold mt-8">
                      Your do not have any applications yet.
                    </span>

                    <span className="text-purple-500">
                      Make your application
                    </span>

                    <Link href={"/OffSetApplication"}>
                      <button className="mt-8 bg-purple-800 rounded-lg py-2 px-4">
                        Apply
                      </button>
                    </Link>
                  </div>
                </div> */}
              </div>
            </>
          )}
          {activeSection === "applications" && <MyApplications />}
        </main>

        <aside
          className="w-1/4 my-1 mr-1 px-6 py-4 flex flex-col bg-gray-200 dark:bg-black
		dark:text-gray-400 rounded-r-lg overflow-y-auto"
        >
          {/* <!-- Right side NavBar --> */}

          <div className="flex items-center justify-between">
            {/* <!-- Info --> */}

            <a href="#" className="relative">
              {/* <!-- Left side --> */}

              <span>
                <svg
                  className="h-5 w-5 hover:text-red-600 dark-hover:text-red-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </span>

              <div className="absolute w-2 h-2 left-0 mb-6 ml-2 bottom-0">
                <span
                  className="px-2 py-1 bg-red-600 rounded-full text-white
						text-xs"
                >
                  7
                </span>
              </div>
            </a>

            <div className="flex items-center">
              {/* <!-- Right side --> */}

              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://i.pinimg.com/originals/68/e1/e1/68e1e137959d363f172dc3cc50904669.jpg"
                alt="tempest profile"
              />

              <button className="ml-1 focus:outline-none">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 192 512">
                  <path
                    d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72
							72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72
							72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0
							352c0 39.8 32.2 72 72 72s72-32.2
							72-72-32.2-72-72-72-72 32.2-72 72z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <span className="mt-4 text-gray-600">
            Earnings available for withdrawal.
          </span>
          <span className="mt-1 text-3xl font-semibold">{balance} cUSD</span>

          <button
            className="mt-8 flex items-center py-4 px-3 text-white rounded-lg
			bg-green-400 shadow focus:outline-none"
          >
            {/* <!-- Action --> */}

            <svg className="h-5 w-5 fill-current mr-2 ml-3" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
            </svg>

            <span>Withdraw</span>
          </button>

          <div className="mt-12 flex items-center">
            {/* <!-- Payments --> */}
            <span>Payments</span>
            <button className="ml-2 focus:outline-none">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 256 512">
                <path
                  d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
						0l-22.6-22.6c-9.4-9.4-9.4-24.6
						0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3
						103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1
						34z"
                ></path>
              </svg>
            </button>
          </div>
          {applications.length === 0 ? (
            <div className="flex items-center justify-center">
              <p>No proposed applications</p>
            </div>
          ) : (
            applications
              .filter((application: Application) => application.approved)
              .map((application: Application, index: number) => (
                <a
                  key={index}
                  href="#"
                  className="mt-8 p-4 flex justify-between bg-gray-300 rounded-lg font-semibold capitalize"
                >
                  <div className="flex">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1RZ5sKLtFG-Q2xfXlLa5DbFsmF52Gc-C49B4s63CtSxLkzQY&s"
                      alt="veldora profile"
                    />
                    <div className="flex flex-col ml-4">
                      <span>United Nations</span>
                      <span className="text-sm text-gray-600">approved</span>
                    </div>
                  </div>
                  <span>{Number(application.estAmount) / 10 ** 18} ETH</span>
                </a>
              ))
          )}
        </aside>
      </div>
    </div>
  );
};

export default OffsetterDashboard;
