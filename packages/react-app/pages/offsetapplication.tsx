import Link from "next/link";
import React, { useRef, useState } from "react";
// import { PINATA_JWT } from "@/IPFS/Pinata";
import { contractAddress, contractAbi } from "../config/Contract";
import { useWriteContract, useAccount, useConnect } from "wagmi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const OffsetApplication = () => {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputFile = useRef(null);
  const { writeContractAsync, isPending, isSuccess, error } =
    useWriteContract();
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0OGRhNzE2MC03NTc2LTRmNWEtYTc0Ny0wODNkMGI1NjMxZjMiLCJlbWFpbCI6ImplZmZpc2htYWVsMTQxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkOGU1NjI1ODhjOTI2OTgyM2QxZiIsInNjb3BlZEtleVNlY3JldCI6IjY4MjZlMDU2ODdiZmJmMjVjMTU5NGE4OTg0NjQ0NDE4YjRlOTdmYjhiNGExY2VhN2QwOTYzNjcxMmUwZTRiNTkiLCJleHAiOjE3NTM1ODAwODF9.IDS83Co8Y0izBh0WU3yHEKiOv55GBrVaKE0iB_-x1sI";
//   QmVEcc3od4NiCttLWbxvwTyMUPwTkYZ5MRGUBGa4xFPQ8m

  const uploadFile = async (fileToUpload: any) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", fileToUpload);

      const request = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: data,
        }
      );

      const response = await request.json();
      setCid(response.IpfsHash);
      console.log(response.IpfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    uploadFile(selectedFile);
  };

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
        functionName: "makeOffsetProposal",
        args: [
          data.category as string,
          data.description as string,
          cid as string,
          BigInt(Number(data.estAmount)),
        ],
      });
      if (hash) {
        console.log(hash);
        toast("Application Successful");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex items-center flex-col justify-center min-h-screen bg-gray-900">
        <div className="mt-2">
          <Link href={"/"}>
            <div className="bg-gray-300 rounded-lg ">
              <h1 className="text-2xl font-bold mb-6 text-center p-4 text-black">
                Offset project application Form
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex w-full max-w-xl bg-gray-700 rounded-lg p-8 shadow-lg ">
          <form className="space-y-4" onSubmit={submitForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="category"
                  className="block font-medium mb-2 text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300 text-black"
                >
                  <option value="">Select a category</option>
                  <option value="Forestry & Conservation">
                    Forestry & Conservation
                  </option>
                  <option value="Renewable Energy">Renewable Energy</option>
                  <option value="Community Projects">Community Projects</option>
                  <option value="Waste to energy">Waste to energy</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="estAmount"
                  className="block font-medium text-white"
                >
                  Estimated amount (in cUSD)
                </label>
                <input
                  id="estAmount"
                  name="estAmount"
                  placeholder="in cUSD"
                  className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300 text-black"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="upload"
                className="block font-medium mb-2 text-white"
              >
                Detailed form <br />
                <span className="text-xs">
                  NB: Upload a file that explains in details
                </span>
              </label>
              <input
                id="upload"
                name="upload"
                type="file"
                ref={inputFile}
                onChange={handleChange}
                required
                className="border w-fit border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block font-medium text-white"
              >
                Brief description
              </label>
              <textarea
                required
                id="description"
                name="description"
                className="w-full border h-24 text-black border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OffsetApplication;
