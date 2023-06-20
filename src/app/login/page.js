"use client"
import React, { useState, SyntheticEvent,useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Login() {

  
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/dashboard');
    }
  }, []);

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const login = () => {
    const URL = 'http://localhost:8080/api/authentication/login';
    axios
      .post(URL, loginData)
      .then((res) => {
       
          setErrMsg(res.data.message + ' ' + 'redirecting to dashboard...');
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
          if(Object.keys(res.data).includes('token')){
            localStorage.setItem('token', res.data.token);
          }
      })
      .catch((err) => {
        setErrMsg(err.response.data)
        console.log("Error In Login Page",err)
      });
  };

  return (
    <>
     
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-3">{errMsg}</p>
          <hr/>
        </div>

        <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div class="mt-2">
                <input
                onChange={handleChange}
                  id="username"
                  name="username"
                  type="text"
                  autocomplete="username"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
               
              </div>
              <div class="mt-2">
                <input
                onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
              onClick={login}
                type="submit"
                class="mt-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          

          <p class="mt-10 text-center text-sm text-gray-500">
          Not an account ? &nbsp;
          <a href={'/signup'} class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</a>
        </p>
        </div>
      </div>
    </>
  );
}
