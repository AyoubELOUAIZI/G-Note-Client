"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

const Signin = () => {
  // State variables to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // e.preventDefault(); // Prevent default form submission

    if (e && e.preventDefault) {
        e.preventDefault(); // Prevent default form submission
      } else if (window.event) {
        window.event.returnValue = false; // For older versions of Internet Explorer
      }

    try {
      // Make a POST request to the sign-in API endpoint
      const response = await axios.post(
        "http://localhost:9080/g-note/api/users/signin",
        {
          email,
          password,
        }
      );

      console.log("response");
      console.log(response);

      if(response.status){
          // Handle success response
          console.log(response.data); // Log the response data
          // Add logic to handle successful sign-in, such as redirecting to a new page

      }

    } catch (error) {
        console.log("error");
        console.log(error);
      // Handle error response
      if(error.response)
      console.error("Error:", error.response.data); // Log the error response
      // Add logic to handle sign-in errors, such as displaying an error message to the user
    }
  };

  return (
    <div class="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <div class="w-full">
        <div class="text-center">
          <h1 class="text-3xl font-semibold text-gray-900">Sign in</h1>
          <p class="mt-2 text-gray-500">Sign in below to access your account</p>
        </div>
        <div class="mt-5">
          <form action={handleSubmit}>
            <div class="relative mt-6">
              <input
               value={email}
               onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                autocomplete="NA"
              />
              <label
                for="email"
                class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
              >
                Email Address
              </label>
            </div>
            <div class="relative mt-6">
              <input
               value={password}
               onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                class="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
              />
              <label
                for="password"
                class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
              >
                Password
              </label>
            </div>
            <div class="my-6">
              <button
                type="submit"
                class="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
              >
                Sign in
              </button>
            </div>
            <p class="text-center text-sm text-gray-500">
              Don&#x27;t have an account yet?
              <a
                href="#!"
                class="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
              >
                Sign up
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
