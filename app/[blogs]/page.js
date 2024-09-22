"use client";
import Editor from "@/components/Editor";
import Output from "editorjs-react-renderer";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function page() {
  // const router = useRouter();
  const [blog, setBlog] = useState();
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState([]);
  var takeblog = JSON.parse(localStorage.getItem("blog"));
  console.log();

  const [data, setData] = useState(takeblog.blog[0]);
  return (
    <div>
      <div>
        {data?.title}
        <div className=" editorjs-container">
          <Output data={data} className="editorjs-container" />
        </div>
      </div>
    </div>
  );
}
