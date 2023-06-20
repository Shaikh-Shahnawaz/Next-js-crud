"use client";
import axios from "axios";
import { useRouter } from "next/navigation"
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditEmployee from "../edit-employee/page";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();

    const [deleteMsg,setDeleteMsg] = useState(false)
  const [employeesData, setEmployeesData] = useState([]);
  const getDashboardData = () => {
    const URL = "http://localhost:8080/api/employee/showEmployees";
    const TOKEN = localStorage.getItem("token");

    // define your header object
    const header = {
      Authorization: TOKEN,
    };
    axios
      .get(URL, { headers: header })
      .then((res) => {
        setEmployeesData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const TOKEN = localStorage.getItem("token");
    if (TOKEN) {
      getDashboardData();
    } else {
      router.push("/login");
    }
  }, [deleteMsg]);

  function deleteUser(data){
    const URL = "http://localhost:8080/api/employee/deleteEmployee";
    const TOKEN = localStorage.getItem("token");

    const header = {
      Authorization: TOKEN,
    };
    const payload =  {id:data['_id']}

    axios
      .delete(URL,{ headers: header,data:payload })
      .then((res) => {
        setDeleteMsg(!deleteMsg)
        // setEmployeesData(res.data.message);
      })
      .catch((err) => console.log(err));
  }


  return (
    <>
      <h3 className="p-6 text-3xl font-bold mb-4">Employees</h3>

      <button className="ms-6 bg-blue-700 hover:bg-blue-500 text-white p-2 font-bold rounded">
        <Link href={"/add-employee"}>Add Employee</Link>
      </button>
      

      <div class="relative px-6 shadow-md sm:rounded-lg mt-3">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Photo
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Phone
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Address
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employeesData &&
              employeesData.map((ele, index) => (
                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th scope="column" class="px-6 py-4">
                    <img src={ele.photo} height={"50px"} width={"50px"}></img>
                  </th>
                  <td class="px-6 py-4">{ele.name}</td>
                  <td class="px-6 py-4">{ele.phone}</td>
                  <td class="px-6 py-4">{ele.email}</td>
                  <td class="px-6 py-4">{ele.address}</td>
                  <td class="px-6 py-4">
                    <Link class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline me-2" href={{pathname:"/edit-employee",query:ele}} >Edit</Link>
                    
                    
                    <span
                      style={{"cursor":"pointer"}}
                      onClick={() => deleteUser(ele)}
                      class="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
