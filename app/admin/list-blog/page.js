"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { headers } from "next/headers";
import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function page() {
  const router = useRouter();
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

  const handleEditBlog  = (v) => {
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
          <div className=" col-span-3">
            <table className=" w-full">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Title</th>
                  <th>Tag</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((v, i) => {
                  return (
                    <tr>
                      <td className=" text-center">{i + 1}</td>
                      <td className=" text-center">{v?.title}</td>
                      <td className=" text-center">{v?.tag}</td>
                      <td className=" text-center ">
                        <Link
                          href={{
                            pathname: `/admin/edit-blog/${v?._id}`,
                            query: v,
                          }}
                        >
                          <MdModeEditOutline
                            className=" mx-auto"
                            onClick={() => handleEditBlog(v)}
                          />{" "}
                        </Link>
                      </td>
                      <td className=" text-center">
                        <MdDelete
                          className=" mx-auto"
                          onClick={() => handleDelete(v)}
                        />
                      </td>
                      {/* <td className=" flex justify-center text-center"><MdModeEditOutline/> </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
