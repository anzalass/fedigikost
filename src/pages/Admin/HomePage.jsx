import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";
// import Indikator from "../../components/admin/home/Indikator";
import Tagihan from "../../components/admin/pengadaanbarang/TabelBarang";
import Aktivitas from "../../components/admin/home/Aktivitas";
import AdminDetailCard from "../../components/admin/home/AdminDetailCard";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import Indikator from "../../components/admin/home/Indikator";
import NotifiikasiAdmin from "../../components/admin/home/NotifiikasiAdmin";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  return (
    <div>
      <div className="w-full h-[160vh] relative">
        {openNotif ? <NotifiikasiAdmin data={data} /> : null}
        <div className={` `}>
          <Sidebar setSidebar={1} width={open} setWidth={setOpen} />
        </div>
        <div className={`w-11/12 mx-auto`}>
          <TopBar
            openNotif={openNotif}
            setOpenNotif={setOpenNotif}
            setData={setData}
          >
            {user?.role == 1 ? "Dashboard Owner" : "Dashboard Admin"}
          </TopBar>
          <div className="w-full mt-2 h-[50px] ">
            <div className="">
              <h1 className="text-[10px] font-abc ml-6 ">
                Selamat datang <span className="font-[500]">, Admin</span>
              </h1>
              <div className="mt-4 w-[95%] opacity-25 mx-auto  h-[1px] bg-slate-600"></div>
            </div>
            <Indikator />
            <div className="block  md:block lg:flex  w-[97%] justify-center mx-auto   mt-[200px] xl:-mt-[10px] lg:-mt-[10px] ">
              <div className="lg:w-[55%] xl:w-[55%] ">
                <Aktivitas />
              </div>
              <div className=" lg:w-[44%] xl:w-[55%] ">
                <AdminDetailCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
