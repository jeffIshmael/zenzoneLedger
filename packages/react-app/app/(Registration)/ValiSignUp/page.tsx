"use client";
import React from "react";
import Image from "next/image";
import { useAccount, useWriteContract } from "wagmi";
import {contractAbi, contractAddress} from "@/app/Blockchain/CarbonTraceAbi";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ValiSignUp = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { writeContractAsync } =
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
        functionName: "registerValidator",
        args: [
          data.FullName as string,
          data.licenseNo !== undefined ? BigInt(Number(data.licenseNo)) : BigInt(0),    
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
    <div>
      {/* <Header /> */}
      <div className="flex flex-col items-center justify-center h-screen bg-slate-400">
        <div className="flex flex-col items-center justify-center mt-2">
          <div className="flex flex-col items-center justify-center rounded-md bg-gray-600 shadow-lg shadow-gray-500 p-4">
            <Link href={"/"}>
              <Image
                src={"/static/images/logo.png"}
                width={50}
                height={50}
                alt="logo"
                className="rounded-lg"
              />
            </Link>
            <h1 className="font-bold text-3xl mb-4 text-black mt-3">
              Register as Validator
            </h1>
            <form onSubmit={submitForm} className="flex flex-col items-center justify-center">
              <label htmlFor="Full Name" className="font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="FullName"
                id="Full Name"
                placeholder="Enter fullname"
                className="border border-gray-300 rounded text-black p-2 mb-4"
                required
              />
              <label htmlFor="licence No." className="font-semibold">
                License No.
              </label>
              <input
                type="number"
                name="licenceNo"
                placeholder="Input License No."
                className="border border-gray-300 text-black rounded p-2 mb-4"
                required
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