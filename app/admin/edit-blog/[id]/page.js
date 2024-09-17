"use client";
import Editor from "@/components/Editor";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "../../../style.css";
import axios from "axios";

const EditBlog = ({ params }) => {
  const router = useRouter();
  const [blog, setBlog] = useState();
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState([]);
  var takeblog = JSON.parse(localStorage.getItem("blog"));
  console.log();

  const [data, setData] = useState(takeblog.blog[0]);

  // const [data,setData] =useState()

  const handleSubmitForm = () => {
    const finalData = {
      blog: data,
      title: takeblog.title,
      tag: takeblog.tag,
    };
    axios
      .put(`http://localhost:4000/api/update-blog/${params.id}`, finalData)
      .then((res) => {
        router.push("/admin/list-blog");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setQueryParams(params);

    setBlog(takeblog.blog[0]);
    setData(takeblog.blog[0]);
  }, [searchParams]);
  // console.log(blog?.length,"blog",blog?.[0])

  console.log(data, "data");

  return (
    <div>
      {data?.title}
      <div className=" editorjs-container">
        <Editor value={data} onChange={setData} holder="editorjs-container" />

        <button
          onClick={() => handleSubmitForm()}
          className="mt-4 bg-primary px-16 py-2 text-[#fcfcfc] "
        >
          Submit
        </button>
      </div>

    </div>
  );
};

export default EditBlog;
