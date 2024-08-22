"use client";

import React from "react";
import { contractAddress, contractAbi } from "@/app/Blockchain/CarbonTraceAbi";
import { useWriteContract, useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


import Image from "next/image";

const OffSignUp = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { writeContractAsync, isPending } =
    useWriteContract();

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      console.log("Please connect your wallet");
      toast("Please connect your wallet");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    console.log(address);

    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: "registerOffsetter",
        args: [
          data.companyname as string,
          data.regpin !== undefined ? BigInt(Number(data.regpin)) : BigInt(0),
          data.category as string,
          data.offsetCategory as string,
          data.description as string,
          data.email as string,
          data.phone !== undefined ? BigInt(Number(data.phone)) : BigInt(0),
        ],
      });
      if (hash) {
        console.log(hash);
        toast("Registration Successful");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            src="/static/images/pexels-prathsnap-4258043.jpg"
            alt="image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 h-full w-full opacity-70"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to ZenZone Ledger.
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Simplifying carbon credit tracking for a greener future.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to ZenZone Ledger.
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Simplifying carbon credit tracking for a greener future.
              </p>
            </div>

            <h1 className="text-2xl text-black items-center font-semibold ml-4">
              Register Offsetter
            </h1>
            <form onSubmit={submitForm} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CompanyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>

                <input
                  type="text"
                  id="CompanyName"
                  name="companyname"
                  required
                  className="mt-1 h-8 block text-black w-full rounded-sm border border-gray-300 focus:border-gray-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FounderName"
                  className="block text-sm font-medium text-gray-700"
                >
                  License No.
                </label>

                <input
                  type="number"
                  id="RegNo"
                  name="regNo"
                  required
                  className="mt-1 h-8 block text-black w-full rounded-sm border border-gray-300 focus:border-gray-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Category{" "}
                </label>

                <select
                  id="Category"
                  name="category"
                  required
                  className="mt-1 h-8 block text-black w-full rounded-sm border border-gray-300 focus:border-gray-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  <option value="Manufacturing">Corporate Offsetters</option>
                  <option value="Energy Production">
                    Government and Public Sector Offsetters
                  </option>
                  <option value="Transportation">
                    Non-Profit and Non-Governmental Organizations (NGOs)
                  </option>
                  <option value="Mining and Extraction">Individual</option>
                </select>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Offsetcategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Offset Category{" "}
                </label>

                <select
                  id="OffsetCategory"
                  name="offsetCategory"
                  required
                  className="mt-1 h-8 block text-black w-full rounded-sm border border-gray-300 focus:border-gray-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  <option value="Manufacturing">Forestry & Conservation</option>
                  <option value="Energy Production">Renewable Energy</option>
                  <option value="Transportation">Community Projects</option>
                  <option value="Mining and Extraction">Waste to energy</option>
                </select>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Brief Description{" "}
                </label>

                <textarea
                  id="Description"
                  name="description"
                  className="mt-1 h-16  block text-black w-full rounded-sm border border-gray-300 focus:border-gray-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  required
                  className="mt-1 h-8 block text-black w-full rounded-sm border border-gray-300 focus:border-gray-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Telephone Number
                </label>

                <input
                  type="tel"
                  id="Phone"
                  name="phone"
                  required
                  className="mt-1 h-8 block text-black w-full rounded-sm border border-gray-300 focus:border-gray-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline">
                    {" "}
                    terms and conditions{" "}
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className={`inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 ${
                    isPending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isPending ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 0l3 2.647A7.962 7.962 0 0120 12H16c0-3.042-1.135-5.824-3-7.938z"
                      ></path>
                    </svg>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default OffSignUp;