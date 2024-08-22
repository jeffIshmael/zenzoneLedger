import Image from "next/image";
import React, { useEffect, useState } from "react";
import { contractAddress, contractAbi } from "@/app/Blockchain/CarbonTraceAbi";
import { useReadContract, useAccount } from "wagmi";
import AllApplications from "../(Application)/OffSetApplication/AllApplications";

const ValidatorDashboard = () => {
  const { address } = useAccount();
  const [activeSection, setActiveSection] = useState("section");
  const { data } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getValidator",
    args: [address],
  });

  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "contractBalance",
    args: [],
  });

  const { data: approvedProposals } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getApprovedProposals",
    args: [],
  });

  const { data: allprops, error, isPending } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getOffsetProposals",
    args: [],
  });

  console.log(allprops);

  interface Result {
    approved: boolean;
    category: string;
    description: string;
    estAmount: number;
    ipfsHash: string;
    offsetterAdd: string;
    proposalId: number;
    timestamp: number;
  }

  const results = (allprops as Result[]) || {};

  const handleButtonClick = (sectionName: string) => {
    setActiveSection(sectionName); // Update active section on dashboard
  };

  const proposals = approvedProposals as [];

  console.log(approvedProposals);
  console.log(balance);
  useEffect(() => {
    if (data) {
      console.log(data);
    }
    console.log("Not yet");
  }, [data]);

  return (
    <div>
      <div className="min-h-screen bg-gray-50/50">
        <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
          <div className="relative border-b border-white/20">
            <a className="flex items-center gap-4 py-6 px-8" href="/">
              <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                CarbonTrace
              </h6>
            </a>
            <button
              className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
              type="button"
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
          <div className="m-4">
            <ul className="mb-4 flex flex-col gap-1">
              <li>
                <button
                  onClick={() => handleButtonClick("section")}
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                  </svg>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    dashboard
                  </p>
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleButtonClick("All Applications")}
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    All Appplications
                  </p>
                </button>
              </li>
              <li>
                <a className="" href="#">
                  <button
                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5 text-inherit"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      notifactions
                    </p>
                  </button>
                </a>
              </li>
            </ul>
            <ul className="mb-4 flex flex-col gap-1">
              <li className="mx-3.5 mt-4 mb-2">
                <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">
                  auth pages
                </p>
              </li>

              <li>
                <a className="" href="#">
                  <button
                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5 text-inherit"
                    >
                      <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      Wallet
                    </p>
                  </button>
                </a>
              </li>
              <li>
                <a className="" href="#">
                  <button
                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5 text-inherit"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      sign out
                    </p>
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <div className="p-4 xl:ml-80">
          <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
            <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
              <div className="capitalize">
                <nav aria-label="breadcrumb" className="w-max">
                  <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                    <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                      <a href="#">
                        <p className="block antialiased font-sans text-sm leading-normal text-white font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                          dashboard
                        </p>
                      </a>
                      <span className="text-white text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                        /
                      </span>
                    </li>
                    <li className="flex items-center text-white antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                      {activeSection === "section" ? (
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          home
                        </p>
                      ) : (
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          All Applications
                        </p>
                      )}
                    </li>
                  </ol>
                </nav>
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white"></h6>
              </div>

              <div className="relative flex flex-col bg-clip-border rounded-xl bg-gray-100 text-gray-700 shadow-md">
                <div className="p-2 text-right">
                  <div className="flex items-center">
                    <Image
                      src="/static/images/wallet.png"
                      alt="wallet"
                      width={50}
                      height={50}
                      className="mr-2 shadow-md shadow-slate-300 rounded-lg"
                    />

                    <p className="truncate block antialiased font-sans text-lg  leading-normal font-normal text-blue-gray-600">
                      <strong className="text-black mr-2">
                        {Number(balance) / 10 ** 18} cUSD
                      </strong>
                    </p>
                  </div>
                  <div className="">
                    <p className="truncate block antialiased font-sans  leading-relaxed font-normal text-blue-gray-600">
                      <strong className="text-gray-500">
                        Contract Balance
                      </strong>
                      &nbsp;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          {activeSection === "section" && (
            <div className="mt-12">
              <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clipRule="evenodd"
                      ></path>
                      <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600"></p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                      {results.length}
                    </h4>
                  </div>
                  <div className="border-t border-blue-gray-50 p-4">
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong className="text-green-500">
                        Pending Applications
                      </strong>
                      &nbsp;
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clipRule="evenodd"
                      ></path>
                      <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600"></p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                      {proposals?.length}
                    </h4>
                  </div>
                  <div className="border-t border-blue-gray-50 p-4">
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong className="text-green-500">
                        Approved Applications
                      </strong>
                      &nbsp;
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clipRule="evenodd"
                      ></path>
                      <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600"></p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {results.length}
                    </h4>
                  </div>
                  <div className="border-t border-blue-gray-50 p-4">
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong className="text-green-500">
                        New Applications
                      </strong>
                      &nbsp;
                    </p>
                  </div>
                </div>
              </div>
             
            </div>
          )}

          {activeSection === "All Applications" && <AllApplications />}

          <div className="text-blue-gray-600">
            <footer className="py-2">
              <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between"></div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidatorDashboard;
