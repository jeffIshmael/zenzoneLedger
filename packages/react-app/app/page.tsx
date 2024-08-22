"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      console.log(address);
    }
  }, [address, isConnected]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <section className="relative bg-[url('https://images.pexels.com/photos/39553/industry-sunrise-clouds-fog-39553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center bg-no-repeat">
        <div className="relative z-10">
          <Header />
        </div>

        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-slate-200">
              Carbon
              <span className=" font-extrabold text-teal-700">Trace</span>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed text-slate-200">
              Harnessing the power of Blockchain to bring transparency and
              efficiency to the carbon credit market. Offset your emissions with
              ease.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link
                href="/GetStarted"
                className="block w-full rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring active:bg-teal-500 sm:w-auto"
              >
                Get Started
              </Link>

              <Link
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-teal-600 shadow hover:text-teal-700 focus:outline-none focus:ring active:text-teal-500 sm:w-auto"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
              <h2 className="text-3xl font-bold sm:text-4xl">What we do</h2>

              <p className="mt-4 text-gray-500">
                &quot;CarbonTrace: A Web3 startup ensuring transparent buying
                and selling of carbon credits, making climate action simple,
                secure, and effective.&quot;
              </p>

              <Link
                href="#"
                className="mt-8 inline-block rounded bg-teal-600  px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-600  focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Transparency",
                  description:
                    "Ensure transparent carbon credits trading using Web3 technology.",
                },
                {
                  title: "Simplicity",
                  description:
                    "Simplify carbon credits buying and selling for everyone.",
                },
                {
                  title: "Security",
                  description:
                    "Secure, verifiable carbon credits transactions through blockchain innovation.",
                },
                {
                  title: "Empowerment",
                  description:
                    "Empower climate action with transparent carbon credits platform.",
                },
                {
                  title: "Accessibility",
                  description:
                    "Make carbon offsetting easy, reliable, and accessible online.",
                },
                {
                  title: "Sustainability",
                  description:
                    "Promote sustainable practices via blockchain-based carbon credits.",
                },
              ].map((feature, index) => (
                <Link
                  key={index}
                  className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                  href="#"
                >
                  <span className="inline-block rounded-lg bg-gray-50 p-3">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>

                  <h2 className="mt-2 font-bold">{feature.title}</h2>

                  <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-400">
                    {feature.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
              Offset Carbon Now
            </h2>

            <p className="mx-auto mt-4 max-w-sm text-gray-500">
              `&quot;`Take Action Today: Offset Your Carbon Footprint. Join
              CarbonTrace for Transparent, Secure, and Sustainable Climate
              Solutions. Make a Difference!`&quot;`
            </p>

            <Link
              href="#"
              className="mt-8 inline-block rounded-full border-teal-600 px-12 py-3 text-sm font-medium text-teal-600  hover:bg-teal-600  hover:text-white focus:outline-none focus:ring active:bg-teal-600 "
            >
              Get Started
            </Link>
          </div>

          <div className="mt-16 border-t border-gray-100 pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24">
            <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
              <li>
                <Link
                  href="#"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  Cookies
                </Link>
              </li>
            </ul>

            <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
              <li>
                <Link
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99h-2.54v-2.886h2.54V9.797c0-2.508 1.493-3.89 3.777-3.89 1.095 0 2.238.196 2.238.196v2.46h-1.26c-1.24 0-1.63.77-1.63 1.562v1.887h2.773l-.443 2.885h-2.33v6.99C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.062 1.366-.336 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07-3.204 0-3.584-.012-4.85-.07-1.366-.062-2.633-.336-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85 0-3.204.012-3.584.07-4.85.062-1.366.336-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.756 0 8.334.012 7.052.072 5.72.133 4.6.437 3.68 1.357c-.92.92-1.224 2.04-1.285 3.372C2.012 6.334 2 6.756 2 10s.012 3.666.072 4.948c.061 1.332.365 2.452 1.285 3.372.92.92 2.04 1.224 3.372 1.285 1.282.06 1.704.072 4.948.072s3.666-.012 4.948-.072c1.332-.061 2.452-.365 3.372-1.285.92-.92 1.224-2.04 1.285-3.372.06-1.282.072-1.704.072-4.948s-.012-3.666-.072-4.948c-.061-1.332-.365-2.452-1.285-3.372-.92-.92-2.04-1.224-3.372-1.285C15.666.012 15.244 0 12 0zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.29 20.251c7.547 0 11.675-6.155 11.675-11.495 0-.175 0-.349-.012-.521A8.36 8.36 0 0022 5.92a8.19 8.19 0 01-2.357.636 4.065 4.065 0 001.804-2.23 8.243 8.243 0 01-2.605.975A4.115 4.115 0 0015.448 4a4.066 4.066 0 00-3.996 4.999A11.623 11.623 0 013.05 4.917a4.042 4.042 0 001.262 5.449 4.07 4.07 0 01-1.847-.509v.051a4.082 4.082 0 003.272 3.977 4.073 4.073 0 01-1.84.07 4.066 4.066 0 003.795 2.813A8.18 8.18 0 012 18.407a11.515 11.515 0 006.29 1.84"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">GitHub</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2a10 10 0 00-3.162 19.484c.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.605-3.37-1.34-3.37-1.34-.455-1.152-1.11-1.46-1.11-1.46-.908-.62.068-.607.068-.607 1.004.07 1.532 1.016 1.532 1.016.893 1.52 2.341 1.082 2.91.827.091-.647.35-1.082.637-1.33-2.22-.252-4.555-1.11-4.555-4.942 0-1.091.39-1.984 1.03-2.683-.103-.253-.447-1.266.098-2.64 0 0 .84-.27 2.75 1.026A9.554 9.554 0 0112 6.844c.85.004 1.705.115 2.505.338 1.909-1.296 2.748-1.025 2.748-1.025.546 1.373.202 2.386.1 2.64.64.699 1.029 1.592 1.029 2.683 0 3.842-2.337 4.687-4.565 4.933.359.31.678.921.678 1.857 0 1.34-.012 2.42-.012 2.75 0 .267.181.578.688.48A10.003 10.003 0 0012 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
