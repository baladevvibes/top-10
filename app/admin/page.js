"use client";
import Header from "@/components/Header";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [serverSide, setServerSide] = useState();
  const [formState,useFormState]=useState(true)
  const [renderState,setRenderState] =useState(false)


  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error,setErrors] =useState({
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  if(formState===true){
    if (data.email === undefined) {
      error.email = "Enter the Email";
    } else if (data.email === "") {
      error.email = "Enter the Email";
    } else {
      error.email = true;
    }
    if (data.password === undefined) {
      error.password = "Enter the password";
    } else if (data.password === "") {
      error.password = "Enter the password";
    }  else if (data.password > 5) {
      error.password = "Enter the Correct Password";
    }else {
      error.password = true;
    }
   
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    setServerSide("");
    setRenderState(true)
    if(error.email ===true && error.password) {
      axios
      .post("http://localhost:4000/api/login", data)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setData({
          email: "",
          password: "",
        });
        router.push("/admin/dashboard", { scroll: false });
      })
      .catch((err) => {
        console.log(err);
        setServerSide("Severside Error! Please Wait..!!");
      });
    }
  
  };
  return (
    <div>
      {/* <Header /> */}

      <div className=" min-h-[100vh] ">
        <div className=" min-h-[100vh] flex justify-center items-center">
          <div className="block bg-secondary rounded-2xl p-10">
            <h2 className="pb-2 text-2xl text-[#fcfcfc] font-semibold  ">
              Top 10 Around
            </h2>
            <p className=" pb-8 text-[#fcfcfc]">Admin Login</p>
            <div>
              <div>
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  name="email"
                  placeholder="Email"
                  className="mb-4 py-2 px-4 w-[400px] rounded-md border border-[#cadff7] outline-none"
                />
              </div>
              {renderState ? <p className=" pb-4  text-sm text-primary"> {error.email}</p> : null}
              <div>
                <input
                  type="password"
                  onChange={(e) => handleChange(e)}
                  name="password"
                  placeholder="password"
                  className="mb-4 py-2 px-4 w-[400px] border rounded-md  border-[#cadff7] outline-none"
                />
              </div>
              {renderState ? <p className=" pb-4  text-sm text-primary"> {error.password}</p> : null}

              <p className=" text-[#fcfcfc]">{serverSide}</p>
 
              <div>
                <button
                  onClick={(e) => handleSubmit(e)}
                  className=" bg-primary py-2 px-10 rounded-md  text-[#fcfcfc]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
