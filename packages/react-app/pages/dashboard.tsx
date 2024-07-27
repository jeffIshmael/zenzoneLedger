import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { contractAddress, contractAbi } from "@/config/Contract";
import BuyerDashboard from "../components/BuyerDashboard";
import OffsetterDashboard from "@/components/OffsetterDashboard";

const Dashboard = () => {
  // console.log(data);

  return (
    <>
      <OffsetterDashboard />
    </>
  );
};

export default Dashboard;
