"use client";
// import Header from "@/components/Header";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { headers } from "next/headers";
import React, { useEffect } from "react";

export default function page() {
  const router = useRouter();
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
        })
        .catch((error) => {
          router.push("/admin");
          console.log(error);
        });
    }
  }, []);
  return (
    <div>
      <div className=" bg-[#16325B] py-4">
        <div className="px-4 grid grid-cols-4">
          <div>
            <h3 className="px-4 text-2xl text-[#fcfcfc] pt-2">Top 10 Blog</h3>
          </div>
          <div className="col-span-3 ">
            <div className=" w-full flex justify-end">
              <div className=" h-[50px] w-[50px] rounded-full bg-[#fcfcfc]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className=" grid grid-cols-4">
          <div className="min-h-[84vh] bg-[#f2f2f2] ">
            <ul>
              <Link href="/admin/create-blog">
                <li className="px-8 py-4 border-[#cccc] border-b-[1px] cursor-pointer text-[#444]">
                  Create Blog
                </li>
              </Link>
              <Link href="/admin/list-blog">
                <li className="px-8 py-4 border-[#cccc] border-b-[1px] cursor-pointer text-[#444]">
                  List Blog
                </li>
              </Link>
            </ul>
          </div>
          <div className=" grid-cols-3"></div>
        </div>
      </div>
    </div>
  );
}
