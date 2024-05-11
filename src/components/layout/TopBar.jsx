import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../config/base_url";

export default function TopBar({ children, openNotif, setOpenNotif, setData }) {
  let test = 0;
  const [jumlahNotifikasi, setJumlahNotifikasi] = useState(0);
  const nav = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${BACKEND_BASE_URL}/api/getAllAktivitas`);
    setData(res.data.results);

    res.data.results.forEach((item) => {
      CheckExistNotification(item.id);
    });
  };

  const CheckExistNotification = async (idaktivitas) => {
    test = 0;
    try {
      const checkRes = await axios.get(
        `${BACKEND_BASE_URL}/api/FindNotifikasiByIdUser/${user?.id}/${idaktivitas}/${user?.role}`
      );
      console.log("message : ", checkRes.data.message);
    } catch (e) {
      console.log("id aktivitas : ", idaktivitas);
      if (e.response.status == 404) {
        test++;
        if (test != 0) {
          setJumlahNotifikasi(test);
        }
      }
    }
  };

  return (
    <div>
      <div className="w-full h-[80px] flex p-6 lg:justify-between xl:justify-between justify-end">
        <div className="w-[50%] text-[25px] hidden md:hidden lg:block xl:block font-abc font-[500]">
          {children}
        </div>
        <div className="w-[50%] flex justify-end  ">
          <div className="mr-5" onClick={() => setOpenNotif(!openNotif)}>
            <div className="relative mr-3">
              <BsFillBellFill size={25} className="absolute " />
              <h1 className="absolute bg-red-500 rounded-full text-white  px-1 py-1 text-[8px] left-0 -top-[5px]">
                {jumlahNotifikasi}
              </h1>
            </div>
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
