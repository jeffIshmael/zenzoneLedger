"use client";

import React, { useEffect } from "react";
import { contractAddress, contractAbi } from "@/app/Blockchain/CarbonTraceAbi";
import {
  useAccount,
  useReadContract,

} from "wagmi";
import Image from "next/image";

const MyApplications = () => {
  const {  address } = useAccount();

  const { data: offsetter } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getOffsetter",
    args: [address],
  });

  interface Result {
    category: string;
    compName: string;
    description: string;
    email: string;
    offSetCat: string;
    offsetterAdd: string;
    offsetterId: number;
    phoneNo: number;
    proposalIds: [];
    regPin: number;
  }

  const result = (offsetter as Result) || {};

  const { data, error, isPending } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "myOffsets",
    args: [result.proposalIds],
  });

  console.log(data);

  interface Application {
    approved: boolean;
    category: string;
    description: string;
    estAmount: number;
    ipfsHash: string;
    offsetterAdd: string;
    proposalId: number;
    timestamp: number;
  }

  const applications = (data as Application[]) || [];

  const getDate = (Timestamp: number) => {
    const FormattedDate = new Date(Timestamp * 1000).toLocaleString();
    return FormattedDate;
  };

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
            
            {error && (
              <div className="flex h-screen items-center justify-center">
                <p>
                  Error fetching proposals, connect wallet if not connected and
                  try again
                </p>
              </div>
            )}

            {applications.length === 0 && (
              <div className="flex h-screen items-center justify-center">
                <p>No proposed applications</p>
              </div>
            )}


            {isPending ? (
              <div>Fetching..</div>
            ) : (
              applications.map((application: Application, index: number) => (
                <div
                  key={index}
                  className="flex flex-col rounded-md bg-gray-700 shadow-md w-fit p-2"
                >
                  <div className="flex justify-between items-center ">
                    <div className="text-sm">
                      <small>
                         At:{" "}
                        <span className="text-pretty">
                          {getDate(Number(application.timestamp))}
                        </span>
                      </small>
                    </div>
                    <div className="mt-12">
                      {application.approved === false ? (
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
                        src={"/static/images/image.png"}
                        width="100"
                        className="object-cover rounded-xl"
                      />
                      <a
                        href={`https://ipfs.io/ipfs/${application.ipfsHash}`}
                        //   target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View File
                      </a>
                    </div>
                    <div className="flex flex-col justify-between "></div>
                  </div>
                  <div className="">
                    <h3 className="text-slate-300 font-semibold mb-0.5">
                      {" "}
                      Category:{" "}
                      <span
                        className="font-normal"
                        style={{ fontStyle: "italic" }}
                      >
                        {application.category}
                      </span>
                    </h3>
                  </div>
                  <div className="mt-2">
                    <p className="font-semibold">Description</p>
                    <p>{application.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyApplications;
