import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="bg-white font-sans flex flex-col  items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 pt-12 lg:pt-0">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
              <div className="">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <p className="sm:block">LocalBuzz</p>
                    <span className="text-zinc-500  md:block">
                      Hire local influencers
                    </span>
                    <p className="text-orange-600 md:block">in one click</p>
                  </h1>
                </div>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                  <Link href={"/signupcreator"}>
                    <button className="inline-flex items-center text-white bg-orange-500 hover:bg-orange-300 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto">
                      Get hired
                    </button>
                  </Link>
                  <Link href={"/signupclient"}>
                    <button className="inline-flex hover:ring-gray-400 hover:bg-gray-200 bg-gray-100 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto">
                      Hire influencers
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-16 ml-6 sm:mt-24 lg:mt-0 lg:col-span-5">
              {/* <p className="text-base ml-12 text-gray-600 sm:text-xl lg:text-lg xl:text-xl">
                LocalBuzz: Connect with local influencers and amplify your brand
                reach today!"
              </p> */}
              <div className="mt-12 ml-8">
                <div className="grid grid-cols-3 gap-6 sm:gap-6 xl:gap-8">
                  <div className="text-center sm:flex sm:items-center sm:justify-center">
                    <div className="sm:flex-shrink-0">
                      <div className="flow-root">
                        <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-orange-600 bg-orange-100 rounded-full">
                          Active Influencers
                        </div>
                        <p className="text-4xl font-bold text-gray-900">16K+</p>
                      </div>
                    </div>
                    {/* <!-- <div className="mt-3 sm:mt-0 sm:ml-3">
                      </div> --> */}
                  </div>
                  <div className="text-center sm:flex sm:items-center sm:justify-center">
                    <div className="sm:flex-shrink-0">
                      <div className="flow-root">
                        <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-orange-600 bg-orange-100 rounded-full">
                          Clients
                        </div>
                        <p className="text-4xl font-bold ml-4 text-gray-900">
                          28K+
                        </p>
                      </div>
                    </div>
                    {/* <!-- <div className="mt-3 sm:mt-0 sm:ml-3">
                    </div> --> */}
                  </div>
                  <div className="text-center sm:flex sm:items-center sm:justify-center">
                    <div className="sm:flex-shrink-0">
                      <div className="flow-root">
                        <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-orange-600 bg-orange-100 rounded-full">
                          Brands
                        </div>
                        <p className="text-4xl font-bold ml-4 text-gray-900">
                          18+
                        </p>
                      </div>
                    </div>
                    {/* <!-- <div className="mt-3 sm:mt-0 sm:ml-3">
                    </div> --> */}
                  </div>
                </div>
              </div>
              <div className="mt-12 flex justify-center space-x-3">
                <span className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full"
                    alt="User 1"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;width=40"
                  />
                </span>
                <span className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full"
                    alt="User 2"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;width=40"
                  />
                </span>
                <span className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full"
                    alt="User 3"
                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;width=40"
                  />
                </span>
                <span className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full"
                    alt="User 4"
                    src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;width=40"
                  />
                </span>
                <img
                  className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full"
                  src="https://images.unsplash.com/photo-1527718641255-324f8e2d0421?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="5"
                />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-5%">
          {/* <!-- component --> */}

          <div className="container flex flex-col justify-center mt-2 p-4 mx-auto md:p-8">
            <Link
              className="inline-flex px-1 py-1 gap-x-2 rounded-xl w-fit border-gray-400 border-2 hover:border-orange-500 items-center text-sm font-semibold text-gray-600 space-x-1"
              href="file:///home/ubuntu/Desktop/ui/influencers_list.html"
            >
              <span className="bg-orange-100 flex items-center justify-center gap-2 text-orange-800 text-sm font-semibold px-2.5 py-0.5 rounded-lg dark:bg-blue-900 dark:text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-orange-400"
                >
                  <path d="m3 11 18-5v12L3 14v-3z"></path>
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                </svg>
              </span>
              <span>View Influencers</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
            <p className="p-2 text-sm font-medium tracking-wider text-center uppercase"></p>
            <h2 className="mt-4 mb-1 text-4xl font-bold leading-none text-center sm:text-5xl">
              About Us
            </h2>
            <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-300">
              <h3 className="py-2 outline-none cursor-pointer focus:underline">
              `&quot;`LocalBuzz connects businesses with influential voices in their
                community, empowering brands to reach their audience
                authentically. Our platform offers a curated selection of local
                influencers, ensuring targeted and impactful collaborations.
                Join us to amplify your message and engage with your community
                like never before.`&quot;`
              </h3>
            </div>
          </div>
        </section>

        {/* <!--FOOTER--> */}
        <div className="px-4 pt-8 mx-auto  sm:max-w-xl bg-gray-400 md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <Link
                href="/"
                aria-label="Go home"
                title="Company"
                className="inline-flex items-center"
              >
                <svg
                  className="w-8 text-deep-purple-accent-400"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  stroke="currentColor"
                  fill="none"
                >
                  <rect x="3" y="1" width="7" height="12"></rect>
                  <rect x="3" y="17" width="7" height="6"></rect>
                  <rect x="14" y="1" width="7" height="6"></rect>
                  <rect x="14" y="11" width="7" height="12"></rect>
                </svg>
                <span className="ml-2 text-xl font-bold tracking-wide text-black uppercase">
                  LocalBuzz
                </span>
              </Link>
              <div className="mt-6 lg:max-w-sm">
                <p className="text-sm text-black">
                  Connect with local influencers and amplify your brand reach
                  today!
                </p>
                <p className="mt-4 text-sm text-black">
                  Eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-base font-bold tracking-wide text-gray-900">
                Contacts
              </p>
              <div className="flex">
                <p className="mr-1 text-gray-800">Phone:</p>
                <Link
                  href="tel:850-123-5021"
                  aria-label="Our phone"
                  title="Our phone"
                  className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                  850-123-5021
                </Link>
              </div>
              <div className="flex">
                <p className="mr-1 text-gray-800">Email:</p>
                <Link
                  href="mailto:info@lorem.mail"
                  aria-label="Our email"
                  title="Our email"
                  className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                  info@lorem.mail
                </Link>
              </div>
              <div className="flex">
                <p className="mr-1 text-gray-800">Address:</p>
                <Link
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Our address"
                  title="Our address"
                  className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                  312 Lovely Street, NY
                </Link>
              </div>
            </div>
            <div>
              <span className="text-base font-bold tracking-wide text-gray-900">
                Social
              </span>
              <div className="flex items-center mt-1 space-x-3">
                <Link
                  href="/"
                  className="text-gray-900 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z"></path>
                  </svg>
                </Link>
                <Link
                  href="/"
                  className="text-gray-900 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                    <circle cx="15" cy="15" r="4"></circle>
                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path>
                  </svg>
                </Link>
                <Link
                  href="/"
                  className="text-gray-900 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z"></path>
                  </svg>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-900">
                Bacon ipsum dolor amet short ribs pig sausage prosciutto chicken
                spare ribs salami.
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
            <p className="text-sm text-gray-900">
              © Copyright 2024 LocalBuzz. All rights reserved.
            </p>
            <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-900 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  F.A.Q
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-900 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-900 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <!--FOOTER--> */}
      </div>
    </div>
  );
}
