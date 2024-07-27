import React, { useEffect, useState } from "react";
import { contractAddress, contractAbi } from "../config/Contract";
import { useAccount, useReadContract } from "wagmi";

// QmXag5aDfyfSxMyqPvV5vP9sL2EtpJab99EXCfAvgX8G2B

const Purchased = () => {
  const { isConnected, address } = useAccount();
  
  const { data, refetch } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getCarbonCredits",
    args: [address],
  });
  console.log(data);

  interface Credit {
    buyerAdd: string;
    estAmount: number;
    ipfsHash: string;
    proposalId: number;
    timestamp: number;
  }

  const credits = (data as Credit) || {};

  const Timestamp = Number(credits?.timestamp);
  const FormattedDate = new Date(Timestamp * 1000).toLocaleString();
  

  useEffect(() => {
    if (data) {
      console.log("we have it");
    }
    console.log("Not yet");
  }, [data]);

  return (
    
    <div >
      <div>
        {!credits || !isConnected && <div>No bought credits</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {credits.map((credit: Credit, index: number) => ( */}
          <div
            // key={index}
            className="rounded-lg p-2 shadow-lg flex flex-col bg-slate-300 items-center ml-1 "
          >
            <img
              src={`https://ipfs.io/ipfs/QmXag5aDfyfSxMyqPvV5vP9sL2EtpJab99EXCfAvgX8G2B/${(
                Number(credits.estAmount) /
                10 ** 18
              ).toString()}.png`}
              width={250}
              height={250}
              alt="cert"
              className="mb-4"
            />
            <p className="text-lg font-semibold">
              {Number(credits.estAmount) / 10 ** 18} carbon credits
            </p>
            <h3 className="text-gray-500">{FormattedDate}</h3>
          </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default Purchased;
