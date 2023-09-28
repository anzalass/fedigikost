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

export default function SidebarOwner({ open, setSidebar, width, setWidth }) {
  const sidebarMenu = [
    {
      title: "Beranda",
      url: "/owner",
      icon: <GrHomeRounded className={` fill-white  my-auto`} />,
    },
    {
      title: "Pengadaan Barang",
      url: "/owner/pengadaan-barang",
      icon: <BsPencilSquare className="my-auto" />,
    },
    {
      title: "Pemeliharaan Barang",
      url: "/owner/pemeliharaan",
      icon: <ImEnter className="my-auto" />,
    },
    {
      title: "Data Ruangan",
      url: "/owner/data-ruangan",
      icon: <HiMiniClipboardDocumentList className="my-auto" />,
    },
    {
      title: "Petugas",
      url: "/owner/petugas",
      icon: <ImEnter className="my-auto" />,
    },
  ];

  const navigate = useNavigate();
  let [menuClick, setMenuClick] = useState(1);
  const [openSide, setOpenSide] = useState(false);
  const testing = () => {
    setMenuClick(3);
  };
  return (
    <>
      <GiHamburgerMenu
        className={`fixed left-2 z-50  top-2`}
        size={25}
        onClick={() => setWidth(!width)}
      />
      <div
        className={`fixed h-[100vh] bg-white left-0 z-40 ${
          width ? "block" : "hidden"
        }`}
      >
        <div className="ml-[210px]"></div>
        <div className="pt-[40px] w-full">
          <img
            src={digiKosLogo}
            className={` h-[50px] w-[100px]  mx-auto`}
            alt=""
          />
        </div>
        <div className="w-full p-3 mt-4 bg-white">
          <h1 className={`font-abc`}>Main Menu Owner</h1>
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
                  <h1 className={` ml-2 font-abc my-auto text-[14px]`}>
                    {sm.title.length > 16
                      ? sm.title.slice(0, 15) + ".."
                      : sm.title}
                  </h1>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
