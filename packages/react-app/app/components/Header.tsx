"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import {  useAccount, useReadContract } from "wagmi";
import Link from "next/link";
import { contractAddress, contractAbi } from "@/app/Blockchain/CarbonTraceAbi";

export default function Header() {
  const { isConnected, address } = useAccount();
  const [isRegistered, setIsRegistered] = useState(false);

  const { data, refetch } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getStruct",
    args: [address],
  });
  console.log(data);

  interface Struct {
    addr: string;
    data: string;
    structType: number;
  }

  const struct = (data as Struct) || {};
  const registered = struct.structType === 0 ? false :  true;

  useEffect(() => {
    if (!data) {
      async () => {
        await refetch();
        setIsRegistered(registered);
      };
    }
    setIsRegistered(registered);
  }, [data]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 items-center justify-center  p-2 sm:items-stretch sm:justify-start">
            <img
              src={"/static/images/carbon.png"}
              width={50}
              height={50}
              alt="logo"
              className="cursor-pointer rounded-md"
            />

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Home
              </Link>

              { (registered && isConnected) && (<Link
                href="/Dashboard"
                className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Dashboard
              </Link>)}

              <Link
                href="/ProposedOffsets"
                className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Proposed offsets
              </Link>
              <Link
                href="/ApprovedOffsets"
                className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Approved offsets
              </Link>
              <Link
                href="/"
                className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
              >
                About
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0  right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
            <ConnectButton
              showBalance={{
                smallScreen: true,
                largeScreen: false,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
