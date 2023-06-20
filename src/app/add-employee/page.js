"use client";
import axios from "axios";
import { Router ,useRouter} from "next/navigation";
import { Input } from "postcss";
import React, { useState, SyntheticEvent, useRef, useEffect } from "react";
export default function AddEmployee(props) {

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: null,
    address: "",
  });
  const [imageData,setImageData] = useState("")
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const TOKEN = localStorage.getItem("token");
    if (TOKEN) {
      // getDashboardData();
    } else {
      router.push("/login");
    }
  }, []);
  const router = useRouter()
  const [isEditForm,setIsEditForm] = useState(false)

  useEffect(()=>{
    if(Object.keys(props).includes("editForm")){
      setInput(props.editForm)
      setIsEditForm(true)
    }
  },[])

  function handleOnchange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }


  const addEmployee = (data) => {
    
    // input['photo'] = imageInput
    const formData = new FormData()
    formData.append("image",imageData)

    for (let i in input){

      formData.append(i,input[i])
    }
    
    const URL = "http://localhost:8080/api/employee/addEmployee";
    const TOKEN = localStorage.getItem("token");
    // define your header object
    const header = {
      Authorization: TOKEN,
    };
    axios
      .post(URL, formData, { headers: header })
      .then((res) => {
          router.push('/dashboard')
      })
      .catch((err) =>{
        setErrMsg(err.response.data)
        console.log("error =>",err)
      }

      );
  };

  const editEmployee = (data)=>{
    const URL = "http://localhost:8080/api/employee/updateEmployee";
    const TOKEN = localStorage.getItem("token");
    // define your header object
    const header = {
      Authorization: TOKEN,
    };
    axios
      .put(URL, input, { headers: header })
      .then((res) => {
        console.log(res);
        // setErrMsg(res.data.message + ' ' + res.data.data);
        // setErrMsg(res.data.data);
        if(res.data.message.includes("User Updated")){
          router.push('/dashboard')
        }

      })
      .catch((err) => {
        setErrMsg(err.response.data)
        console.log(err)
      }
      );
  }

  const handleImage = (e)=>{

    const file = e.target.files[0]
    setImageData(file)
  }
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
            {isEditForm ? "Update Employee" : "Add Employee"}
          </h2>
          <p className="text-red mt-2">{errMsg}</p>
        <hr/>
        </div>

        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          
          {/* <form onSubmit={handleFormData}> */}

          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div class="mt-2">
              <input
                onChange={handleOnchange}
                value={input.email}
                // onChange={e=>setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div class="mt-2">
              <input
              value={input.name}
              // onChange={e=>setName(e.target.value)}
                onChange={handleOnchange}
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="phone"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              {/* <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div> */}
            </div>
            <div class="mt-2">
              <input
                onChange={handleOnchange}
                value={input.phone}
                // onChange={e=>setPhone(e.target.value)}
                id="phone"
                name="phone"
                type="phone"
                autocomplete="phone"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="address"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              {/* <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div> */}
            </div>
            <div class="mt-2">
              <textarea
                onChange={handleOnchange}
                value={input.address}
                // onChange={e=>setAddress(e.target.value)}
                id="address"
                name="address"
                type="textarea"
                autocomplete="address"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


          <div>
            <label
              for="image"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Upload image
            </label>
            <div style={{"display":"flex","justifyContent":'center',"alignItems":"center"}} class="mt-2">
              <div>

              <input
                onChange={handleImage}
                // value={input.photo}
                // ref={fileInput}
                accept="images/*"
                id="image"
                name="image"
                type="file"
                autocomplete="image"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
              {/* <div>
                <img src={image} height={"50px"} width={"100px"} />
              </div> */}
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={isEditForm ?editEmployee:addEmployee}
              class="mt-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isEditForm?"Update":"Add"}
            </button>
          </div>

          {/* </form> */}

        </div>
      </div>
    </>
  );
}
