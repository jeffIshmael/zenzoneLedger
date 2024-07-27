import React, { useEffect } from "react";
import { contractAddress, contractAbi } from "../config/Contract";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useDisconnect,
} from "wagmi";
import { useRouter } from "next/navigation";
import { resourceLimits } from "worker_threads";
import Image from "next/image";

const CreatedApplication = () => {
  const { data, error, isPending, refetch } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getOffsetProposal",
    args: [0],
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

  const result = (data as Result) || {};

  const Timestamp = Number(result.timestamp);
  const FormattedDate = new Date(Timestamp * 1000).toLocaleString();

  interface DisplayFileProps {
    cid: string;
  }

  useEffect(() => {
    if (data) {
      console.log("we are live");
    }

    console.log("Not yet");
  }, [data]);

  return (
    <div>
      <section>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Proposed Applications
            </h1>
          </div>
          <div>
            {!result && (
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
              <div className="flex flex-col p-4 shadow-md rounded-xl bg-gray-800 text-white w-fit">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm">
                    <small>
                      By:{" "}
                      <span className="text-blue-400">
                        {`${result.offsetterAdd.slice(
                          0,
                          6
                        )}...${result.offsetterAdd.slice(-6)}`}
                      </span>
                      {"   "}
                      {"   "} At:{" "}
                      <span className="text-pretty">{FormattedDate}</span>
                    </small>
                  </div>
                  <div className="mt-4">
                    {result.approved === false ? (
                      <p className="text-gray-400">Not Approved</p>
                    ) : (
                      <p className="text-green-500">Approved</p>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="">
                    <Image
                      alt="App Icon"
                      height="100"
                      src={
                        "/static/images/image.png"
                      }
                      width="100"
                      className="object-cover rounded-xl"
                    />
                    <a
                      href={
                        "https://ipfs.io/ipfs/QmVEcc3od4NiCttLWbxvwTyMUPwTkYZ5MRGUBGa4xFPQ8m"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View File
                    </a>
                  </div>
                  <div className="flex flex-col justify-between ">
                    <div className="">
                      <h3
                        className="text-slate-300 mb-0.5"
                        style={{ fontStyle: "italic" }}
                      >
                        <p className="text-gray-300 text-sm">
                          {result.estAmount}
                        </p>
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col space-y-2 space-x-10 items-center">
                    <button className="text-white bg-blue-500 px-4 py-2 rounded-md mr-2 self-end">
                      Approve
                    </button>
                    <button className="text-white bg-red-500 px-4 py-2 rounded-md self-end">
                      Disapprove
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Description</p>
                  <p>{result.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default CreatedApplication;
