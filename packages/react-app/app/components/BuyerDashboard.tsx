"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { contractAddress, contractAbi } from "@/app/Blockchain/CarbonTraceAbi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useRouter } from "next/navigation";
import Purchased from "./Purchased";
import { toast } from "sonner";
import { ethers } from "ethers";
import Offsetters from "./Offsetters";
import { processCheckout } from "../Blockchain/TokenFunction";

const BuyerDashboard = () => {
  const { address, isConnected } = useAccount();
  const { isPending, writeContractAsync, error } = useWriteContract();

  const [activeSection, setActiveSection] = useState("section");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isPurchaseVisible, setIsPurchaseVisible] = useState(false);
  const router = useRouter();

  const { data, refetch } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getBuyer",
    args: [address],
  });

  console.log(data);

  interface Result {
    buyerAdd: string;
    buyerId: number;
    carbonIds: [];
    category: string;
    compName: string;
    description: string;
    email: string;
    phoneNo: number;
    regPin: number;
  }

  const result = (data as Result) || {};

  const { data: credits } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "myCredits",
    args: [result.carbonIds],
  });

  interface Credit {
    buyerAdd: string;
    estAmount: number;
    ipfsHash: string;
    proposalId: number;
    timestamp: number;
  }
  const creds = (credits as Credit[]) || [];
  console.log(creds);

  const getDate = (Timestamp: number) => {
    const FormattedDate = new Date(Timestamp * 1000).toLocaleString();
    return FormattedDate;
  };

  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "balanceOf",
    args: [address],
  });

  useEffect(() => {
    if (credits) {
      console.log("we are live");
    }
    console.log("Not yet");
  }, [credits]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const togglePurchaseVisibility = () => {
    setIsPurchaseVisible(!isPurchaseVisible);
  };

  const onClose = () => {
    setIsPurchaseVisible(false);
    setIsFormVisible(false);
  };

  const handleTokenSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect wallet.");
      console.log("Please connect wallet.");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const Amount = Number(data.token) * 10 ** 18;

    console.log(Amount);
    try {
      const paid = await processCheckout(Amount * 0.01);

      if (paid) {
        const hash = await writeContractAsync({
          address: contractAddress,
          abi: contractAbi,
          functionName: "getCarbz",
          args: [Amount],
        });

        if (hash) {
          console.log(hash);
          setIsFormVisible(false);
        } else {
          console.log(error);
          toast.error("failed to buy.");
        }
      } else {
        toast.error("unable to make payment.");
      }
    } catch (err) {
      toast.error("Failed.Ensure you have sufficient balance.");
    }
  };

  const handleAmountSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect wallet.");
      console.log("Please connect wallet.");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const Amount = Number(data.carbons);
    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: "buyCarbonCredits",
        args: [BigInt(Amount * 10 ** 18)],
      });
      if (hash) {
        console.log(hash);
        setIsPurchaseVisible(false);
        
      } else {
        console.log("An error occurred while creating your account.");
      }
    } catch (err: any) {
      if (err.reason) {
        console.log(err.reason);
        toast(err.reason);
      } else if (err.message) {
        console.log(err.message);
        toast("Unable to purchase.");
      }
    }
  };

  const handleButtonClick = (sectionName: string) => {
    setActiveSection(sectionName); // Update active section on dashboard
  };

  console.log(data);
  console.log(balance);
  console.log(address);
  // console.log(result.addr);

  // console.log(result);

  return (
    <div>
      <div className="h-screen w-full flex overflow-hidden select-none">
        <nav className="w-24 flex flex-col items-center bg-white dark:bg-gray-800 py-4">
          <div>
            <Link href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                className="fill-current h-5 w-5"
                viewBox="0 0 48 48"
              >
                <path d="M 24 2.9980469 C 23.042162 2.9980469 22.084349 3.3309171 21.316406 3.9941406 L 3.7871094 19.132812 A 1.0001 1.0001 0 0 0 3.7832031 19.134766 C 3.0520846 19.7701 2.8689211 20.781262 3.1621094 21.568359 C 3.4552977 22.355457 4.2597544 23 5.2304688 23 L 8 23 L 36 23 A 1.0001 1.0001 0 1 0 36 21 L 8 21 L 5.2304688 21 C 5.0811829 21 5.0689211 20.95454 5.0371094 20.869141 C 5.0052974 20.783741 4.9868251 20.739151 5.0957031 20.644531 L 22.623047 5.5058594 C 23.419161 4.8183063 24.580839 4.8183063 25.376953 5.5058594 L 32.345703 11.527344 A 1.0001 1.0001 0 0 0 34 10.769531 L 34 6 L 37 6 L 37 15.089844 A 1.0001 1.0001 0 0 0 37.345703 15.847656 L 42.904297 20.644531 C 43.013175 20.739151 42.994701 20.783738 42.962891 20.869141 C 42.931083 20.954543 42.918817 21 42.769531 21 L 40 21 A 1.0001 1.0001 0 0 0 39 22 L 39 42 C 39 42.56503 38.56503 43 38 43 L 31 43 C 30.43497 43 30 42.56503 30 42 L 30 32 C 30 30.354545 28.645455 29 27 29 L 21 29 C 19.354545 29 18 30.354545 18 32 L 18 42 C 18 42.56503 17.56503 43 17 43 L 10 43 C 9.4349698 43 9 42.56503 9 42 L 9 26 A 1.0001 1.0001 0 1 0 7 26 L 7 42 C 7 43.64497 8.3550302 45 10 45 L 17 45 C 18.64497 45 20 43.64497 20 42 L 20 32 C 20 31.445455 20.445455 31 21 31 L 27 31 C 27.554545 31 28 31.445455 28 32 L 28 42 C 28 43.64497 29.35503 45 31 45 L 38 45 C 39.64497 45 41 43.64497 41 42 L 41 23 L 42.769531 23 C 43.740246 23 44.544702 22.355457 44.837891 21.568359 C 45.131079 20.781262 44.947919 19.770146 44.216797 19.134766 A 1.0001 1.0001 0 0 0 44.212891 19.132812 L 39 14.632812 L 39 6 C 39 4.9045455 38.095455 4 37 4 L 34 4 C 32.904545 4 32 4.9045455 32 6 L 32 8.5859375 L 26.683594 3.9941406 C 25.915651 3.3309171 24.957838 2.9980469 24 2.9980469 z"></path>
              </svg>
            </Link>
          </div>

          <ul className="mt-2 text-gray-700 dark:text-gray-400 capitalize">
            <li className="mt-3 p-2 text-blue-600 dark:text-blue-300 rounded-lg">
              <button
                onClick={() => {
                  handleButtonClick("section");
                }}
              >
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9
							17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10
							8h-8v10h8V11m-10 4H3v6h8v-6z"
                  ></path>
                </svg>
                <span className="text-xs mt-2 text-center">DashBoard</span>
              </button>
            </li>

            <li
              className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300
				rounded-lg"
            >
              <a href="#" className=" flex flex-col items-center">
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M23 3v-.5a2.5 2.5 0 00-5 0V3c-.55 0-1 .45-1 1v4c0
							.55.45 1 1 1h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1
							0h-3v-.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V3M6
							11h9v2H6v-2m0-4h9v2H6V7m16 4v5c0 1.11-.89 2-2 2H6l-4
							4V4a2 2 0 012-2h11v2H4v13.17L5.17 16H20v-5h2z"
                  ></path>
                </svg>
                <span className="text-xs mt-2">Notifications</span>
              </a>
            </li>

            <li
              className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300
				rounded-lg"
            >
              <button
                onClick={() => {
                  handleButtonClick("CarbonCreds");
                }}
              >
                <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M21 18v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0
                              012-2h14a2 2 0 012 2v1h-9a2 2 0 00-2 2v8a2 2 0 002
                              2m0-2h10V8H12m4 5.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0
                              011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5z"
                  ></path>
                </svg>
                <span className="text-xs text-center mt-2">
                  Bought Carbon credits
                </span>
              </button>
            </li>
            {/* 
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
                <span className="text-xs mt-2">Find Organisations</span>
              </a>
            </li> */}

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
              <div className="flex flex-col capitalize text-3xl text-white">
                <span className="font-semibold">hello,</span>
                <span>{result.compName}!</span>
              </div>
              <div className="flex">
                <Offsetters />

                <div
                  className="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col
				bg-purple-300 rounded-lg text-white"
                >
                  <h3
                    className="flex items-center pt-1 pb-1 px-8 text-lg font-bold
					capitalize"
                  >
                    <span>Buy Carbon Credits</span>
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

                  <div
                    className={`relative ${isPurchaseVisible ? "blur-sm" : ""}`}
                  >
                    <div className="flex flex-col items-center mt-12">
                      <img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png"
                        alt="empty schedule"
                      />

                      <span className="font-bold mt-8">
                        No pending application.
                      </span>

                      <span className="text-purple-500">
                        Apply for Carbon Credits
                      </span>

                      <button
                        onClick={togglePurchaseVisibility}
                        className="mt-8 bg-purple-800 rounded-lg py-2 px-4"
                      >
                        Buy Carbon Credits
                      </button>
                    </div>
                  </div>

                  {isPurchaseVisible && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="relative bg-white p-4 rounded-lg shadow-md w-80">
                        <button
                          onClick={onClose}
                          className="absolute top-2 right-2 text-gray-400 hover:text-gray-800"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <div className="flex flex-col gap-2">
                          <h2 className="text-lg font-bold text-black">
                            Purchase Carbon Credits
                          </h2>
                          <small className="text-black">
                            <span className="italic">NB:</span> Each Carbon
                            Credit is equal to 1 CARBZ
                          </small>
                          <div className="flex space-x-1">
                            <form
                              onSubmit={handleAmountSubmit}
                              className="flex flex-col"
                            >
                              <input
                                type="text"
                                placeholder="input quantity"
                                // value={amount}
                                // onChange={handleChange}
                                name="carbons"
                                required
                                className="text-black w-full p-1 rounded-md"
                              />
                              <button
                                type="submit"
                                // disabled={!amount}
                                className="bg-blue-500 text-white rounded-lg w-fit p-1 mt-2 hover:bg-blue-400"
                              >
                                {isPending ? "..." : "Purchase"}
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeSection === "CarbonCreds" && <Purchased />}
        </main>
        <aside
          className="w-1/4 my-1 mr-1 px-6 py-4 flex flex-col bg-gray-200 dark:bg-black
        dark:text-gray-400 rounded-r-lg overflow-y-auto"
        >
          <div className="flex items-center justify-between">
            <a href="#" className="relative">
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

          <span className="mt-4 text-gray-600">Balance</span>
          <span className="mt-1 text-3xl font-semibold">
            {Number(balance) / 10 ** 18} CARBZ          </span>

          <button
            onClick={toggleFormVisibility}
            disabled={isFormVisible}
            className="mt-4 flex items-center py-4 px-3 text-white rounded-lg
          bg-green-400 shadow focus:outline-none"
          >
            <svg className="h-5 w-5 fill-current mr-2 ml-3" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
            </svg>

            <span>Buy CARBZ</span>
          </button>

          {isFormVisible && (
            <div className="flex top-4 w-80 right-4 bg-white p-4 rounded-lg shadow-md mt-50">
              <div className="flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="flex  text-gray-400 hover:text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-bold text-black">Purchase CARBZ</h2>
                  <small>
                    <span className="font-italic">NB:</span> Price of 1 CARBZ is
                    equal to 0.01 cUSD
                  </small>
                  <div className="flex space-x-1">
                    <form onSubmit={handleTokenSubmit}>
                      <input
                        type="text"
                        placeholder="input quantity"
                        // value={amount}
                        // onChange={handleChange}
                        name="token"
                        id="token"
                        required
                        className="text-black p-1 mr-1 bg-gray-200 border-solid border-gray-500 rounded-md"
                      />
                      <button
                        type="submit"
                        // disabled={!amount}
                        className="bg-blue-500 text-white rounded-lg w-fit p-1 mt-1 hover:bg-blue-400"
                      >
                        {isPending ? "..." : "Purchase"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 flex items-center">
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

          {creds.length === 0 && (
            <div className="text-white mt-6 text-center">No payments done.</div>
          )}

          {creds.map((cred: Credit, index: number) => {
            return (
              <button
                onClick={() => handleButtonClick("CarbonCreds")}
                className="mt-2 p-4 flex justify-between bg-gray-300 rounded-lg
          font-semibold capitalize"
                key={index}
              >
                <div className="flex">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1RZ5sKLtFG-Q2xfXlLa5DbFsmF52Gc-C49B4s63CtSxLkzQY&s"
                    alt="veldora profile"
                  />

                  <div className="flex flex-col ml-4">
                    <span>Carbon credits</span>
                    <span className="text-xs text-gray-600">
                      {getDate(Number(cred.timestamp))}
                    </span>
                  </div>
                </div>

                <span>{Number(cred.estAmount) / 10 ** 18} CARBZ</span>
              </button>
            );
          })}
        </aside>
      </div>
    </div>
  );
};

export default BuyerDashboard;
