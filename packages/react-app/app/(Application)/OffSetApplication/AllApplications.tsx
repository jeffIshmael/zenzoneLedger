"use client";

import React, { useEffect } from "react";
import { contractAddress, contractAbi } from "@/app/Blockchain/CarbonTraceAbi";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  
} from "wagmi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

const AllApplications = () => {

    const{isConnected} = useAccount();
    const{writeContractAsync} = useWriteContract();
  const { data, error, isPending } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getOffsetProposals",
    args: [],
  });

  console.log(data);

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

  const results = (data as Result[]) || {};


  function getDate(Timestamp: number) {
    const FormattedDate = new Date(Timestamp * 1000).toLocaleString();
    return FormattedDate;
  }

  const voteYes = async (proposalId : number) => {
    if(!isConnected){
      toast.error("Please connect your wallet");
      return;
    }
    try {
        const hash = await writeContractAsync({
          address: contractAddress,
          abi: contractAbi,
          functionName: "voteYes",
          args: [
            proposalId
          ],
        });
        if (hash) {
          console.log(hash);
          toast("Successful voted yes.");
        }
      } catch (error) {
        console.log(error);
      }
    
  }

  const voteNo = async (proposalId : number) => {
    if(!isConnected){
      toast.error("Please connect your wallet");
      return;
    }
    try {
        const hash = await writeContractAsync({
          address: contractAddress,
          abi: contractAbi,
          functionName: "voteNo",
          args: [
            proposalId
          ],
        });
        if (hash) {
          console.log(hash);
          toast("Successful voted no.");
        }
      } catch (error) {
        console.log(error);
      }
    
  }
  

  useEffect(() => {
    if (data) {
      console.log(data);
    }

    console.log("Not yet");
  }, [data]);

  return (
    <div>
      <section>
        <div>
             <div>
            {results.length === 0 && (
              <div className="flex h-screen items-center justify-center">
                <p>No proposed applications</p>
              </div>
            )}
            {error && (
              <div className="flex h-screen items-center justify-center">
                <p>
                  Error fetching proposals, connect wallet if not connected and
                  try again
                </p>
              </div>
            )}
            {isPending ? (
              <div>Fetching..</div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {results.map((result: Result, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-800 text-white rounded-xl p-2 shadow-md"
                  >
                    <div className="mb-2">
                      <div className="text-xs mb-1">
                        By:{" "}
                        <span className="text-blue-400">
                          {`${result.offsetterAdd.slice(
                            0,
                            6
                          )}...${result.offsetterAdd.slice(-6)}`}
                        </span>{" "}
                        At:{" "}
                        <span className="text-pretty">
                          {getDate(Number(result.timestamp))}
                        </span>
                      </div>
                      <div
                        className={
                          result.approved ? "text-green-500" : "text-gray-400"
                        }
                      >
                        {result.approved ? "Approved" : "Not Approved"}
                      </div>
                    </div>
                    <div className="flex mb-2">
                      <div className="mr-2">
                        <Image
                          alt="App Icon"
                          height="80"
                          src={"/static/images/image.png"}
                          width="80"
                          className="object-cover rounded-xl"
                        />
                        <a
                          href={`https://ipfs.io/ipfs/${result.ipfsHash}`}
                          rel="noopener noreferrer"
                          className="text-blue-500 underline block mt-1 text-xs"
                        >
                          View File
                        </a>
                      </div>
                      <div className="flex flex-col justify-between">

                      <h2 className="text-s mb-1 italic">Category: <span className="text-sm text-gray-300">{result.category}</span></h2>
                        <h3 className="text-s mb-1 italic">
                          Estimated Amount: <span><p className="text-sm text-gray-300">
                          {Number(result.estAmount)/10**18} cUSD
                        </p></span>
                        </h3>                      
                        
                      </div>
                    </div>
                    <div className="flex justify-between mb-2">
                      <button onClick={() => voteYes(Number(result.proposalId))}  className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                        Approve
                      </button>
                      <button onClick={()=> voteNo(Number(result.proposalId))} className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                        Disapprove
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="font-semibold text-xs">Description</p>
                      <p className="text-xs text-gray-300">
                        {result.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllApplications;
