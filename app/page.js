"use client";
import Header from "@/components/Header";
import axios from "axios";
import Output from "editorjs-react-renderer";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const page = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/all-blog")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);

  const handleEditBlog  = (v) => {
    localStorage.setItem("blog", JSON.stringify(v));
  };

  return (
    <div>
      <Header />

      <div className=" container mx-auto">
        <div className=" grid grid-cols-4">
          {data?.data?.map((v, i) => {
            return (
              <>
                <Link
                  href={{
                    pathname: `/blog/${v?.title.replace(/\s+/g, '-').toLowerCase()}-${v?._id}`,
                  }}
                >
                  <div onClick={()=>handleEditBlog(v)}>
                    <img
                      src="https://images.pexels.com/photos/26738720/pexels-photo-26738720/free-photo-of-airplanes-flying-in-the-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="img"
                      className=" h-[200px] w-full object-cover"
                    />

                    <div>
                      <h2 className=" font-semibold">{v?.title}</h2>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
