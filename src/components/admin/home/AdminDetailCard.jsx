import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AdminDetailCard() {
  const { user } = useSelector((state) => state.user);
  const date = new Date(user?.created_at);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="w-[100%] border-2 border-slate-400 h-[500px] rounded-lg mt-4 bg-white justify-center items-center flex-col">
      <div className="w-full mx-auto flex-col pt-[70px]">
        {user.foto ? (
          <img
            src={user.foto}
            className="w-[200px] h-[200px] rounded-full mx-auto"
          />
        ) : (
          <FaUserCircle size={100} className="mx-auto" />
        )}

        <div className="text-center  font-abc w-full">
          <h1 className="">{user?.name}</h1>
          <h3 className="text-[13px] font-[300]  ">{user?.email}</h3>
        </div>
      </div>
      <div className="w-[80%] mx-auto text-center mt-8 justify-between flex">
        <h1 className="font-abc font-[300] ">Registered</h1>
        <h1 className="font-abc font-[500] text-[#622399]">
          {date?.toLocaleDateString("id-ID", options)}
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
