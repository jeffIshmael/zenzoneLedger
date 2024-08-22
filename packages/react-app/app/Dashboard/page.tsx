"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { contractAddress, contractAbi } from "@/app/Blockchain/CarbonTraceAbi";
import BuyerDashboard from "../components/BuyerDashboard";
import OffsetterDashboard from "../components/OffsetterDashboard";
import ValidatorDashboard from "../components/ValidatorDashboard";
// import ValidatorDashboard from "@/components/ValidatorDashboard";

const Dashboard = () => {
  // console.log(data);
  const { address, isConnected } = useAccount();
  const [buyer, setBuyer] = useState(false);
  const [offsetter, setOffSetter] = useState(false);
  const [validator, setValidator] = useState(false);
  const { data, refetch } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getStruct",
    args: [address],
  });
  interface Result {
    addr: string;
    data: string;
    structType: number;
  }

  const result = (data as Result) || {};

  useEffect(() => {
    if (result) {
      if (result.structType === 1) {
        setBuyer(true);
      } else if (result.structType === 2) {
        setOffSetter(true);
      } else if (result.structType === 3) {
        setValidator(true);
      }
    }
    console.log("Not yet");
  }, [result]);

  console.log(data);

  return (
    <>
      {buyer && <BuyerDashboard />}
      {offsetter && <OffsetterDashboard />}
      {validator && <ValidatorDashboard />}
    </>
  );
};

export default Dashboard;
