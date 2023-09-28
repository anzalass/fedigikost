import { useState } from "react";
import Aktivitas from "../../components/admin/home/Aktivitas";
import SidebarOwner from "../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../components/layoutowner/TopbarOwner";
import { useEffect } from "react";
import Indikator from "../../components/admin/home/Indikator";
import AdminDetailCard from "../../components/admin/home/AdminDetailCard";

export default function HomePageOwner() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("loading : ", loading);
  }, [loading]);

  return (
    <div className="w-full h-[160vh] flex">
      <div className={` `}>
        <SidebarOwner setSidebar={1} width={open} setWidth={setOpen} />
      </div>
      <div className={`w-11/12 mx-auto`}>
        <TopBarOwner>{"Dashboard Owner"}</TopBarOwner>

        <div className="w-full mt-2 h-[50px] ">
          <div className="">
            <h1 className="text-[10px] font-abc ml-6 ">
              Selamat datang <span className="font-[500]">, Owner</span>
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
  );
}
