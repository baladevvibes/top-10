"use client"
import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { AiTwotoneHome } from 'react-icons/ai';
import { MdDelete, MdModeEditOutline, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import Link from 'next/link';
import axios from 'axios';

export default function page() {
  const [data, setData] = useState();
  const getAllBlog = () => {
    axios
      .get("http://localhost:4000/api/all-blog")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getAllBlog();
  }, []);
  const handleEditBlog = (v) => {
    localStorage.setItem("blog", JSON.stringify(v));
  };

  const handleDelete = (v) => {
    console.log(v);
    axios
      .delete(`http://localhost:4000/api/delete-blog/${v?._id}`)
      .then((res) => {
        console.log(res);
        getAllBlog();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
   {/* <Layout/> */}
   <Layout>

   <div className=" p-6">
          <div className=" pb-4 flex ">
            <AiTwotoneHome className=" text-[16px] text-secondary" />

            <MdOutlineKeyboardDoubleArrowRight className=" text-primary mt-0.5 text-[16px]" />

            <p className="text-primary text-sm mx-2"> List Blog</p>
          </div>
          <table className=" w-full">
            <thead>
              <tr className=" py-2 bg-secondary">
                <th className=" text-[#fcfcfc] text-left px-4 py-2">
                  S.No
                </th>
                <th className=" text-[#fcfcfc] text-left px-4 py-2">
                  Title
                </th>
                <th className=" text-[#fcfcfc] text-left py-2">Tag</th>
                <th className=" text-[#fcfcfc] text-center py-2">Edit</th>
                <th className=" text-[#fcfcfc] text-center py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((v, i) => {
                return (
                  <tr className=" border  border-[#e7e7e7] boder-t-0">
                    <td className=" text-left px-4 text-[#6f6f6f] text-sm py-2">
                      {i + 1}
                    </td>
                    <td className=" text-left px-4 text-[#6f6f6f] text-sm text-ellipsis overflow-hidden w-[50%]">
                      {v.title.length > 50
                        ? v.title.substring(0, 50) + "..."
                        : v.title}
                    </td>
                    <td className="text-left text-[#6f6f6f] text-sm ">
                      {v?.tag}
                    </td>
                    <td className="text-left  ">
                      <Link
                        href={{
                          pathname: `/admin/edit-blog/${v?._id}`,
                          query: v,
                        }}
                      >
                        <MdModeEditOutline
                          className=" mx-auto text-primary hover:text-secondary cursor-pointer"
                          onClick={() => handleEditBlog(v)}
                        />{" "}
                      </Link>
                    </td>
                    <td className=" text-center">
                      <MdDelete
                        className=" mx-auto text-primary hover:text-secondary cursor-pointer"
                        onClick={() => handleDelete(v)}
                      />
                    </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
   </Layout>
   
    </div>
  )
}
