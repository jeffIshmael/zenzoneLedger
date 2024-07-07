import React, { useState } from "react";
// import {CONTRACT_ADDRESS} from "../"
import { contractAddress, contractAbi } from "../config/Contract";
import { useWriteContract, useAccount, useConnect } from "wagmi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { InjectedConnector } from "wagmi/connectors/InjectedConnector";

const SignUpAsCreator = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const { isConnected } = useAccount();
  const router = useRouter();
  const { writeContractAsync } = useWriteContract();

  //   const { connect } = useConnect({
  //     connector: new InjectedConnector(),
  //   });

  //   useEffect(() => {
  //     connect();
  //   }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect wallet");
      console.log("Please connect wallet");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: "registerContentCreator",
        args: [
          data.fullname as string,
          data.username as string,
          data.bio as string,
          data.instagramLink as string,
          data.facebookLink as string,
          data.LinkedinLink as string,
          data.twitterLink as string,
          data.tiktokLink as string,
          data.email as string,
        ],
      });
      if (hash) {
        console.log(hash);
        toast("successfully signed up");
        router.push("/");
      }
    } catch (e: any) {
      console.log(e);
      toast.error("Failed to sign you up, try again.");
      return;
    }
  }

  return (
    <div className="flex items-center justify-center mt-2">
      <div
        style={{
          width: "90%",
          maxWidth: "600px",
          padding: "20px",
          border: "2px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h1 className="text-center text-2xl font-bold">
          Sign Up as Influencer
        </h1>

        <form onSubmit={submit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="fullname"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
              }}
              className="bg-gray-300 rounded-md"
              required
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="username"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
              }}
              className="bg-gray-300 rounded-md"
              required
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="bio"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
              }}
              className="bg-gray-300 rounded-md"
              required
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="instagramLink"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Instagram Link
            </label>
            <input
              type="url"
              id="instagramLink"
              value={instagramLink}
              onChange={(e) => setInstagramLink(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
              }}
              className="bg-gray-300 rounded-md"
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="facebookLink"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Facebook Link
            </label>
            <input
              type="url"
              id="facebookLink"
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
              }}
              className="bg-gray-300 rounded-md"
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="linkedinLink"
              style={{ display: "block", marginBottom: "5px" }}
            >
              LinkedIn Link
            </label>
            <input
              type="url"
              id="linkedinLink"
              value={linkedinLink}
              onChange={(e) => setLinkedinLink(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
              }}
              className="bg-gray-300 rounded-md"
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="twitterLink"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Twitter Link
            </label>
            <input
              type="url"
              id="twitterLink"
              value={twitterLink}
              onChange={(e) => setTwitterLink(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
              }}
              className="bg-gray-300 rounded-md"
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="tiktokLink"
              style={{ display: "block", marginBottom: "5px" }}
            >
              TikTok Link
            </label>
            <input
              type="url"
              id="tiktokLink"
              value={tiktokLink}
              onChange={(e) => setTiktokLink(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
              }}
              className="bg-gray-300 rounded-md"
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
              }}
              className="bg-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpAsCreator;
