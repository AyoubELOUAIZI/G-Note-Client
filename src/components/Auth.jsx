import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    //navigate to user page if already logged in
    if (user) {
      if (!user?.admin) {
        router.push("/mynotes");
      } else {
        router.push("/dashboard");
      }
    }
  }, []);

  const [isLogin, setLogin] = useState(true);
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("testpassword");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:9080/g-note/api/users/${
          isLogin ? "signin" : "signup"
        }`,
        {
          email,
          password,
          fullName,
          confirmPassword,
        }
      );
      console.log(response);
      if (response.data) {
        console.log(response.data);
        setUser(response.data);
        console.log("🚀 ~ Auth ~ user:", user);
        router.push("/mynotes");
      }

      // Add logic to handle successful sign-in/sign-up
    } catch (error) {
      console.log(error);
      if (error?.response?.data) console.error(error.response.data);
      // Add logic to handle sign-in/sign-up errors
    }
  };

  return (
    <div>
      {isLogin && (
        <div class="py-16 md:py-24">
          <form
            onSubmit={handleSubmit}
            class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto  lg:max-w-7xl"
          >
            <div
              class="hidden lg:block lg:w-1/2 bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
              }}
            ></div>
            <div class="w-full p-8 lg:w-1/2">
              <h2 class="text-2xl font-semibold text-gray-700 text-center">
                Brand
              </h2>
              <p class="text-xl text-gray-600 text-center">Welcome back!</p>

              <div class="mt-4 flex items-center justify-between">
                <span class="border-b w-1/5 lg:w-1/4"></span>
                <a href="#" class="text-xs text-center text-gray-500 uppercase">
                  Sign in below to access your account
                </a>
                <span class="border-b w-1/5 lg:w-1/4"></span>
              </div>
              <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                  placeholder="example@example.com"
                />
              </div>
              <div class="mt-4">
                <div class="flex justify-between">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  placeholder="**********"
                />
              </div>
              <div class="mt-8">
                <button
                  type="submit"
                  class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                >
                  Sign In
                </button>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <span class="border-b w-1/5 md:w-1/4"></span>
                <a
                  onClick={(e) => {
                    setLogin(false);
                  }}
                  href="#signup"
                  class="text-xs text-gray-500 uppercase"
                >
                  or sign up
                </a>
                <span class="border-b w-1/5 md:w-1/4"></span>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* // the signup */}
      {!isLogin && (
        <div class="py-3 md:py-8">
          <form
            onSubmit={handleSubmit}
            class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto  lg:max-w-7xl"
          >
            <div
              class="hidden lg:block lg:w-1/2 bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
              }}
            ></div>
            <div class="w-full p-8 lg:w-1/2">
              <h2 class="text-2xl font-semibold text-gray-700 text-center">
                Brand
              </h2>
              <p class="text-xl text-gray-600 text-center">
                Sign up now to begin your journey!
              </p>

              <div class="mt-4 flex items-center justify-between">
                <span class="border-b w-1/5 lg:w-1/4"></span>
                <a href="#" class="text-xs text-center text-gray-500 uppercase">
                  Sign up to create your account
                </a>
                <span class="border-b w-1/5 lg:w-1/4"></span>
              </div>
              <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  placeholder="full name"
                />
              </div>
              <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                  placeholder="example@example.com"
                />
              </div>
              <div class="mt-4">
                <div class="flex justify-between">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  placeholder="**********"
                />
              </div>
              <div class="mt-4">
                <div class="flex justify-between">
                  <label class="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                </div>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  placeholder="**********"
                />
              </div>
              <div class="mt-8">
                <button
                  type="submit"
                  class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                >
                  Sign Up
                </button>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <span class="border-b w-1/5 md:w-1/4"></span>
                <a
                  onClick={(e) => {
                    setLogin(true);
                  }}
                  href="#signin"
                  class="text-xs text-gray-500 uppercase"
                >
                  Already have an account
                </a>
                <span class="border-b w-1/5 md:w-1/4"></span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth;
