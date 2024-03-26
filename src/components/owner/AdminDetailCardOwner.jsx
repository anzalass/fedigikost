import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AdminDetailCardOwner() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-[97%] h-[500px] rounded-lg mt-4 bg-white justify-center items-center flex-col">
      <div className="w-full mx-auto flex-col pt-[70px]">
        <FaUserCircle size={100} className="mx-auto" />
        <div className="text-center  font-abc">
          <h1 className="">{user?.name}</h1>
          <h3 className="text-[13px] font-[300]">{user?.email}</h3>
        </div>
      </div>
      <div className="w-[80%] mx-auto text-center mt-8 justify-between flex">
        <h1 className="font-abc font-[300] ">Registered</h1>
        <h1 className="font-abc font-[500] text-[#622399]">
          {user?.created_at}
        </h1>
      </div>
      <div className="w-[80%] mx-auto h-[1px] mt-3 bg-[#CDD5DF]"></div>
      <div className="w-[80%] mx-auto text-center mt-8 justify-between flex">
        <h1 className="font-abc font-[300] ">Level</h1>
        <h1 className="font-abc font-[500] text-[#622399]">
          {user?.role == 1 ? "Pemilik Kos" : "Admin"}
        </h1>
      </div>
      <div className="w-[80%] mx-auto h-[1px] mt-3 bg-[#CDD5DF]"></div>
    </div>
  );
}