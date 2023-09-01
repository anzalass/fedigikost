import React from "react";
import testgambar from "../../../assets/img_car.png";

export default function FotoDetail({ open, setOpen }) {
  return (
    <div className="w-full fixed left-0 top-0 h-screen bg-[#00000030] z-40">
      <div className="h-[500px] relative  mx-auto w-[800px] mt-[80px] bg-white">
        <button
          onClick={() => setOpen(!open)}
          className="font-abc text-xl absolute right-3 font-[600]"
        >
          X
        </button>
        <img src={testgambar} className="w-full object-fit py-5 px-5" alt="" />
      </div>
    </div>
  );
}
