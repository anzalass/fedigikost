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
import axios from "axios";
import { useContextNotifikasi } from "../../context/notifikasicontext";
import { BACKEND_BASE_URL } from "../../config/base_url";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [allRuang, setAllRuang] = useState(0);
  const [allPengadaan, setAllPengadaan] = useState(0);
  const [allPengadaanowner, setAllPengadaanowner] = useState(0);
  const [allKategori, setAllKategori] = useState(0);
  const [totalbarang, settotalbarang] = useState(0);
  const [allPemeliharaan, setAllPemeliharaan] = useState(0);
  const [allPemeliharaanowner, setAllPemeliharaanowner] = useState(0);
  const [aktivitas, setAllAktivitas] = useState([]);
  const [petugas, setAllpetugas] = useState(0);

  const [notif, setNotif] = useContextNotifikasi();

  const HomePage = async () => {
    try {
      const data = await axios.get(
        `${BACKEND_BASE_URL}/api/homepage/${user?.id}`
      );
      setAllKategori(data.data.totalkategori);
      setAllRuang(data.data.totalruangan);
      setAllPengadaan(data.data.totalpengadaan);
      setAllPemeliharaan(data.data.totalpemeliharaan);
      setAllAktivitas(data.data.aktivitas);
      setAllpetugas(data.data.totaluser);
      settotalbarang(data.data.totalbarang);
      setAllPemeliharaanowner(data.data.totalpemeliharaanowner);
      setAllPengadaanowner(data.data.totalpengadaanowner);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    HomePage();
  }, [user?.id]);
  const [data, setData] = useState([]);
  return (
    <div>
      <div className="w-full h-[160vh] relative">
        {/* {openNotif ? <NotifiikasiAdmin data={data} /> : null} */}
        <div className={` `}>
          <Sidebar setSidebar={1} width={open} setWidth={setOpen} />
        </div>
        <div className={`w-11/12 mx-auto`}>
          <TopBar openNotif={openNotif} setOpenNotif={setOpenNotif}>
            {user?.role == 1 ? "Dashboard Owner" : "Dashboard Admin"}
          </TopBar>
          <div className="w-full mt-2 h-[50px] ">
            <div className="">
              <h1 className="text-[17px] font-abc ml-6 ">
                Selamat datang{" "}
                <span className="font-[500]">
                  , {user?.role == 1 ? "Owner" : "Admin"}
                </span>
              </h1>
              <div className="mt-4 w-[95%] opacity-25 mx-auto  h-[1px] bg-slate-600"></div>
            </div>
            <Indikator
              allKategori={allKategori}
              allPemeliharaan={allPemeliharaan}
              allPengadaan={allPengadaan}
              allPemeliharaanowner={allPemeliharaanowner}
              allPengadaanowner={allPengadaanowner}
              allRuang={allRuang}
              allpetugas={petugas}
              totalbarang={totalbarang}
            />
            <div className="block  md:block lg:flex  w-[97%] justify-center gap-3 mx-auto    xl:-mt-[10px] lg:-mt-[10px] ">
              <div className="lg:w-[55%] xl:w-[55%] ">
                <Aktivitas aktivitas={aktivitas} />
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
