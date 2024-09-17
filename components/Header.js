import React from "react";
import "../app/style.css";

export default function Header() {
  return (
    <div className="  pb-2">


    <div className=" container mx-auto">
      <header>
        <nav>
          <div className=" grid grid-cols-12">
            <div className=" col-span-2">
              <img
                src={`../Images/logo/logo.png`}
                className=" h-[70px]"
                alt="top 10 around"
              />
            </div>
            <div className=" col-span-8">
              <div className=" py-4">
                <h1 className=" text-4xl title text-center text-[#2b2b2b] font-semibold">
                  Top <sup>10</sup> Around 
                </h1>
              </div>
              <div className=" col-span-2"></div>
            </div>
          </div>
        </nav>
      </header>
    </div>
    </div>
  );
}
