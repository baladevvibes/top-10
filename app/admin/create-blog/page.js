"use client";
import Editor from "@/components/Editor";
import "../../style.css";
import "../../responsive.css";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Output from "editorjs-react-renderer";

import axios from "axios";

export default function page() {
  const router = useRouter();

  const [data, setData] = useState("");
  const [perview, setPerview] = useState(false);
  const [blogState, setBlogState] = useState(false);
  const [imgs, setImgs] = useState();
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    img: "",
    schema: null,
    meta_des: "",
  });
  const [error, setError] = useState({
    title: "",
    tag: "",
    img: "",
    schema: "",
    meta_des: "",
  });
  const [readyStatus, setReadyStatus] = useState(false);
  const [formFirstAction, setFormFirstAction] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  if (formFirstAction === true) {
    if (formData.title === undefined) {
      error.title = "Enter the title";
    } else if (formData.title === "") {
      error.title = "Enter the title";
    } else {
      error.title = true;
    }
    if (formData.tag === undefined) {
      error.tag = "Enter the tag";
    } else if (formData.tag === "") {
      error.tag = "Enter the tag";
    } else {
      error.tag = true;
    }
    if (formData.meta_des === undefined) {
      error.meta_des = "Enter the meta des";
    } else if (formData.meta_des === "") {
      error.meta_des = "Enter the meta des";
    } else {
      error.meta_des = true;
    }
    if (formData.img === undefined) {
      error.img = "Choose the img";
    } else if (formData.img === "") {
      error.img = "Choose the img";
    } else {
      error.img = true;
    }
  }

  console.log(data.blocks?.length === 0);
  const handleSubmit = () => {
    const newSchema = {
      schema: JSON.stringify(formData.schema),
      meta_des: formData.meta_des,
      title: formData.title,
    };
    const newblog = {
      blog: data,
      title: formData.title,
      tag: formData.tag,
      schema: newSchema,
      meta_des: formData.meta_des,
      img: imgs,
    };

    axios
      .post("http://localhost:4000/api/create-blog", newblog)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmitForm = () => {
    setReadyStatus(true);
    if (error.title === true && error.tag === true) {
      setBlogState(true);
    }
  };

  const handlePreview = () => {
    setPerview(!perview);
  };

  const handleImage = (e) => {
    console.log(e.target.files);
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImgs(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

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
      <div className=" editorjs-container px-6">
        {blogState ? null : (
          <div className=" py-10 lg:w-[50%] lge:w-[50%] md:w-[100%] mdsm:w-[100%] sm:w-[100%] mx-auto">
            <h3 className=" text-3xl font-semibold pb-4 text-primary">
              Create Blog
            </h3>
            <div>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => handleChange(e)}
                className="my-2 py-2 px-4  border border-[#ccc] focus:outline-none w-full"
              />
              {readyStatus ? (
                <>
                  {" "}
                  <p className=" text-sm text-secondary"> {error.title}</p>{" "}
                </>
              ) : null}
            </div>

            <div>
              <textarea
                type="text"
                name="meta_des"
                placeholder="Meta"
                onChange={(e) => handleChange(e)}
                className="my-2 py-2 border border-[#ccc]  focus:outline-none px-4 w-full"
              />
              {readyStatus ? (
                <>
                  <p className=" text-sm text-secondary"> {error.meta_des}</p>{" "}
                </>
              ) : null}
            </div>
            <div>
              <input
                type="text"
                name="tag"
                placeholder="Tag"
                onChange={(e) => handleChange(e)}
                className="my-2 py-2 border border-[#ccc]  focus:outline-none px-4 w-full"
              />
              {readyStatus ? (
                <>
                  {" "}
                  <p className=" text-sm text-secondary">{error.tag}</p>{" "}
                </>
              ) : null}
            </div>
            <input
              type="file"
              label=" Images"
              placeholder="Image"
              className="myPoppinsFont border text-tiny mt-1 border-[#ccc] p-2"
              name="img"
              // value={values.img}
              // defaultValue={values.img}
              id="img2"
              onChange={handleImage}
            />
            <div>
              {readyStatus ? (
                <>
                  <p className=" text-sm text-secondary"> {error.img}</p>{" "}
                </>
              ) : null}
            </div>

            <div>
              <textarea
                type="text"
                name="schema"
                placeholder="Schema"
                onChange={(e) => handleChange(e)}
                className="my-2 py-2 border border-[#ccc]  focus:outline-none px-4 w-full"
              />
              {/* {readyStatus ? <> {error.tag} </> : null} */}
            </div>

            <button
              onClick={() => handleSubmitForm()}
              className="mt-4 bg-primary px-16 py-2 text-[#fcfcfc] "
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {blogState ? (
        <div>
          {perview ? null : (
            <div className=" mt-10">
              <Editor
                value={data}
                onChange={setData}
                holder="editorjs-container"
              />
            </div>
          )}

          <div>
            <div className=" flex editorjs-container justify-center">
              {data.blocks?.length === 0 ||
              data.blocks?.length === null ||
              data.blocks?.length === undefined ? (
                <></>
              ) : (
                <>
                  {perview ? null : (
                    <button
                      className={` bg-primary px-16 py-2 text-[#fcfcfc] mx-4 ${
                        perview ? `mt-16` : ``
                      }`}
                      onClick={() => handlePreview()}
                    >
                      Preview
                    </button>
                  )}
                </>
              )}

              {perview ? null : (
                <button
                  className=" bg-primary px-16 py-2 text-[#fcfcfc] "
                  onClick={() => handleSubmit()}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {perview ? (
        <div className="mt-10">
          {" "}
          <div className="editorjs-container">
            <Output data={data} />
            <div className=" flex  justify-center">
              <button
                className="mt-10 bg-primary px-16 py-2 text-[#fcfcfc] "
                onClick={() => handlePreview()}
              >
                Back to Blog
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
