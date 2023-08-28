import { useState } from "react";
import digiKosLogo from "../../assets/Digikos.svg";
import { GrHomeRounded, GrLogout } from "react-icons/gr";
import { ImEnter } from "react-icons/im";
import { BsPencilSquare } from "react-icons/bs";
import { PiEnvelopeOpenBold } from "react-icons/pi";
import { BiSolidUserAccount } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";

import { GiHamburgerMenu } from "react-icons/gi";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ open, setSidebar }) {
  const sidebarMenu = [
    {
      title: "Beranda",
      url: "/",
      icon: <GrHomeRounded className={` fill-white  my-auto`} />,
    },
    {
      title: "Pengadaan Barang",
      url: "/tambah-barang",
      icon: <BsPencilSquare className="my-auto" />,
    },
    {
      title: "Pemeliharaan Barang",
      url: "/pengeluaran",
      icon: <ImEnter className="my-auto" />,
    },
    {
      title: "Data Ruangan",
      url: "/data-ruangan",
      icon: <HiMiniClipboardDocumentList className="my-auto" />,
    },
    {
      title: "Petugas",
      url: "/petugas",
      icon: <ImEnter className="my-auto" />,
    },
  ];

  const navigate = useNavigate();
  let [menuClick, setMenuClick] = useState(1);
  const testing = () => {
    setMenuClick(3);
  };
  return (
    <div className="w-[220px]  fixed min-h-screen bg-[#fff]">
      <div className="ml-[210px]">
        {/* <button className="" onClick={(e) => open(0)}>
          x
        </button> */}
      </div>
      <div className="pt-4 w-full">
        <img src={digiKosLogo} className="h-[50px] w-[100px]  mx-auto" alt="" />
      </div>
      <div className="w-full p-3 bg-white">
        <h1 className="font-abc">Main Menu</h1>
        <div className=" ml-2 mt-4">
          {sidebarMenu &&
            sidebarMenu.map((sm, index) => (
              <Link
                to={sm.url}
                key={index}
                onClick={(e) => {
                  setMenuClick(1);
                }}
                className={`flex mt-2 ${
                  setSidebar === index + 1
                    ? "bg-[#9556CC] text-white"
                    : "bg-white text-black"
                }  h-[30px] rounded-md p-1 pl-3`}
              >
                {sm.icon}
                <h1 className="ml-2 font-abc my-auto text-[14px]">
                  {sm.title.length > 16
                    ? sm.title.slice(0, 15) + ".."
                    : sm.title}
                </h1>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
