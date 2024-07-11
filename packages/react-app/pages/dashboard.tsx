import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { contractAddress, contractAbi } from "@/config/Contract";
import CreatorDashboard from "@/components/CreatorDashboard";
import ClientDashboard from "@/components/ClientDashboard";

const Dashboard = () => {
  
  const [isClient, setIsClient] = useState(true);
  const { address } = useAccount();
  const { data, refetch } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "isClient",
    args: [address],
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      // await getDetails();
      console.log("one");
    } else {
      async () => {
        await refetch();
        console.log(data);
        // await getDetails();
        console.log("done");
      };
    }
    if (data === true) {
      // await refetchClient();
      setIsClient(true);
      console.log("isClient");
    } else if (data === false) {
      // await refetchCreator();
      setIsClient(false);
      console.log("creator");
    } else {
      console.log("unable to");
    }
  }, [data]);

  // console.log(data);

  return <>{isClient ? <ClientDashboard /> : <CreatorDashboard />}</>;
};

export default Dashboard;
