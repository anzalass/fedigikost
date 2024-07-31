import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../config/base_url";
import NotifiikasiAdmin from "../admin/home/NotifiikasiAdmin";

export default function TopBar({ children }) {
  const [notifikasi, setNotifikasi] = useState([]);
  const [notifikasibyid, setNotifikasiById] = useState([]);
  const [openNotif, setOpenNotif] = useState(false);
  const { user } = useSelector((state) => state.user);
  const HomePage = async () => {
    try {
      const data = await axios.get(
        `${BACKEND_BASE_URL}/api/homepage/${user?.id}`
      );
      const filternotif = data.data.notifikasi.filter(
        (item) => item.id_pembuat == user?.id
      );

      setNotifikasi(data.data.notifikasi);

      setNotifikasiById(data.data.lengthnotifikasi - filternotif.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    HomePage();
  }, [user?.id]);
  const nav = useNavigate();

  return (
    <div>
      <div className="w-full h-[80px] relative flex p-6 lg:justify-between xl:justify-between justify-end">
        <div className="w-[50%] text-[25px] hidden md:hidden lg:block xl:block font-abc font-[500]">
          {children}
        </div>
        <div className="w-[50%] flex justify-end  ">
          <div className="mr-5">
            <div className="relative mr-3 -top-2 -right-5 ">
              <div className="relative inline-flex w-fit">
                <div className="absolute bottom-auto left-auto right-5 top-3 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-indigo-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                  {notifikasibyid > 99 ? "99+" : notifikasibyid}
                </div>
                <button
                  type="button"
                  className="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300  hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  <BsFillBellFill
                    size={25}
                    onClick={() => setOpenNotif(true)}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            {/* <FaUserCircle size={25} /> */}
            <h1
              // onClick={() => nav("/profile")}
              className="ml-2 font-abc font-[500] cursor-pointer"
            >
              {user?.name}
            </h1>
          </div>
        </div>
      </div>
      {openNotif ? (
        <div className="absolute top-0 right-10 z-40">
          <NotifiikasiAdmin
            data={notifikasi}
            openNotif={openNotif}
            setOpenNotif={setOpenNotif}
          />
        </div>
      ) : null}
      <div className="w-[95%] opacity-25 mx-auto mt-0 h-[1px] bg-slate-600"></div>
    </div>
  );
}
