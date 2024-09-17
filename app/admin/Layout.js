"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { headers } from "next/headers";
import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { AiTwotoneHome } from "react-icons/ai";
import "../style.css";
import { FaUserCog } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

export default function Layout({ children }) {
  const router = useRouter();

  const [profile, setProfile] = useState();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    if (!token) {
      router.push("/admin");
      console.log(token, "out");
    } else {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post("http://localhost:4000/api/verify-token", {}, header)
        .then((res) => {
          console.log(res);
          setProfile(res.data.data);
        })
        .catch((error) => {
          router.push("/admin");
          console.log(error);
        });
    }
  }, []);

  console.log(profile);

  return (
    <div>
      {" "}
      <div className=" bg-primary py-4">
        <div className="px-4 grid grid-cols-4">
          <div>
            <h3 className="px-4 text-[24px] text-[#fcfcfc]">Top 10 Blog</h3>
          </div>
          <div className="col-span-3 ">
            <div className=" w-full flex justify-end">
              <div className=" relative">
                <div className=" h-[40px] cursor-pointer flex justify-center bg-secondary  text-[#fcfcfc] text-2xl items-center w-[40px] rounded-full ">
                  {profile?.name[0]}
                </div>
                <div className=" absolute right-2 rounded-lg  top-10 ">
                  <div className=" bg-[#fcfcfc]">
                    <div className="text-sm cursor-pointer flex group hover:bg-secondary  px-4 py-2">
                      <FaUserCog className=" mr-2 text-[20px] text-primary group-hover:text-[#fcfcfc]" />{" "}
                      <p className=" mt-[3px] capitalize  group-hover:text-[#fcfcfc]">
                        {profile?.name}
                      </p>
                    </div>
                    <div className="text-sm cursor-pointer flex  group hover:bg-secondary  px-4 py-2 pt-0">
                      <IoLogOut className=" mr-2 mt-[6px] text-[20px] text-primary  group-hover:text-[#fcfcfc]" />
                      <p className="group-hover:text-[#fcfcfc] pt-[6px]">
                        Logout
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex w-[100%]">
          <div className="min-h-[84vh] bg-[#f2f2f2] w-[20%]">
            <ul className=" ">
              <Link href="/admin/create-blog">
                <li className="px-8 bg-[#f2f2f2] hover:bg-secondary hover:text-[#fcfcfc] py-3 text-sm border-[#cccc] border-b-[1px] cursor-pointer text-[#444]">
                  Create Blog
                </li>
              </Link>
              <Link href="/admin/list-blog">
                <li className="px-8 bg-[#f2f2f2] hover:bg-secondary hover:text-[#fcfcfc]  py-3 text-sm border-[#cccc] border-b-[1px] cursor-pointer text-[#444]">
                  List Blog
                </li>
              </Link>
            </ul>
          </div>
          <div className="w-[80%]">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
