import axios from "axios";
import React, { useEffect } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TopBar({ children, openNotif, setOpenNotif }) {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <div className="w-full h-[80px] flex p-6 lg:justify-between xl:justify-between justify-end">
        <div className="w-[50%] text-[25px] hidden md:hidden lg:block xl:block font-abc font-[500]">
          {children}
        </div>
        <div className="w-[50%] flex justify-end  ">
          <div className="mr-5" onClick={() => setOpenNotif(!openNotif)}>
            <BsFillBellFill size={25} />
          </div>
          <div className="flex">
            <FaUserCircle size={25} />
            <h1
              onClick={() => nav("/profile")}
              className="ml-2 font-abc font-[500] cursor-pointer"
            >
              {user?.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-[95%] opacity-25 mx-auto mt-0 h-[1px] bg-slate-600"></div>
    </div>
  );
}
