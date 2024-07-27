import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { contractAddress, contractAbi } from "@/config/Contract";
import BuyerDashboard from "../components/BuyerDashboard";
import OffsetterDashboard from "@/components/OffsetterDashboard";
// import ValidatorDashboard from "@/components/ValidatorDashboard";

const Dashboard = () => {
  // console.log(data);
  const { address, isConnected } = useAccount();
  const [buyer, setBuyer] = useState(true);
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
      console.log("we are live");
      if (result.structType === 2){
        setBuyer(false);
      }
    }
    console.log("Not yet");
  }, [result]);

  console.log(data);

  


   

  return <>{buyer ? <BuyerDashboard /> : <OffsetterDashboard />}</>;
};

export default Dashboard;
