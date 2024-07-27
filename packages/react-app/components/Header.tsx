import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useConnect, useAccount, useReadContract } from "wagmi";
import { injected } from "wagmi/connectors";
import Link from "next/link";
import { contractAbi, contractAddress } from "@/config/Contract";

export default function Header() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();
  const { isConnected , address} = useAccount();
  const [isRegistered, setIsRegistered] = useState(false);

  const { data, refetch } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "registered",
    args: [address],
  });

  const registered = (data as boolean);


  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, []);

  useEffect(() => {
    if (!data) {
      async () =>{
        await refetch();
        setIsRegistered(registered);
      }
    } setIsRegistered(registered);
  }, [data]);


  return (
    <Disclosure as="nav" >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center  p-2 sm:items-stretch sm:justify-start">
                
                
                  <img
                    src={"/static/images/logo.jpg"}
                    width={150}
                    height={150}
                    alt="logo"
                    className="cursor-pointer rounded-lg"
                  />
                
                
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Home
                  </Link>
                  {isConnected && isRegistered ? (
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      Dashboard
                    </Link>
                  ): null}
                  <Link
                    href="/"
                    className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Proposed offsets
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Approved offsets
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    About
                  </Link>


                  
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                {!hideConnectBtn && (
                  <ConnectButton
                    showBalance={{
                      smallScreen: true,
                      largeScreen: false,
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-4">
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-black py-2 pl-3 pr-4 text-base font-medium text-black"
              >
                Home
              </Disclosure.Button>
              {isRegistered && (<Disclosure.Button
                as="a"
                href="/dashboard"
                className="block border-l-4 border-black py-2 pl-3 pr-4 text-base font-medium text-black"
              >
                Dashboard
              </Disclosure.Button>)}
              <Disclosure.Button
                as="a"
                href="/"
                className="block border-l-4 border-black py-2 pl-3 pr-4 text-base font-medium text-black"
              >
                Proposed offsets
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/"
                className="block border-l-4 border-black py-2 pl-3 pr-4 text-base font-medium text-black"
              >
                Approved offsets
              </Disclosure.Button>
              {/* Add here your custom menu elements */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
