"use client";
import Header from "@/components/Header";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

export default function page() {
    const router = useRouter()
 

    const [data, setData] = useState({
        email: "",
        password: "",
      });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    alert("hello1")

    axios
      .post("http://localhost:4000/api/login", data)
      .then((res) => {
        alert("hello")
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setData({
          email: "",
          password: "",
        });
        router.push('/admin/dashboard', { scroll: false })
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Header />
      <div className=" min-h-[80vh] flex justify-center items-center">
        <div className="block ">
          <h2 className="pb-4 text-2xl">Admin Login</h2>
          <div>
            <div>
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                name="email"
                placeholder="Email"
                className="mb-4 py-2 px-4 w-[400px] border border-[#222] outline-none"
              />
            </div>
            <div>
              <input
                type="password"
                onChange={(e) => handleChange(e)}
                name="password"
                placeholder="password"
                className="mb-4 py-2 px-4 w-[400px] border border-[#222] outline-none"
              />
            </div>
            <div>
              <button onClick={(e)=>handleSubmit(e)} className=" bg-[#222] py-2 px-10 text-[#fcfcfc]">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
