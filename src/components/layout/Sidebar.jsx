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
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Sidebar({ open, setSidebar, width, setWidth }) {
  const { user } = useSelector((state) => state.user);
  let sidebarMenu = [];
  if (user?.role == 2) {
    sidebarMenu = [
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
    ];
  } else if (user?.role == 1) {
    sidebarMenu = [
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
        title: "Data Petugas",
        url: "/petugas",
        icon: <HiMiniClipboardDocumentList className="my-auto" />,
      },
    ];
  }

  const logout = async () => {
    try {
      Swal.fire({
        title: "Keluar",
        text: "Apakah Yakin Ingin Keluar ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Keluar",
      }).then((result) => {
        if (result.isConfirmed) {
          const res = fetch("http://localhost:8000/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          })
            .then((res) => {
              if (res) {
                localStorage.removeItem("token");
                window.location.reload();
              }
              Swal.fire({
                title: "Keluar ",
                text: "Berhasil Keluar",
                icon: "success",
              });
              window.location.href = "/";
            })
            .catch((err) => {
              Swal.fire({
                title: "Keluar ",
                text: "Gagal Keluar, " + err.message,
                icon: "error",
              });
            });
        }
      });
    } catch (err) {
      Swal.fire({
        title: "Keluar ",
        text: "Gagal Keluar, " + err.message,
        icon: "error",
      });
    }
  };

  const navigate = useNavigate();
  let [menuClick, setMenuClick] = useState(1);
  const [openSide, setOpenSide] = useState(false);
  const testing = () => {
    setMenuClick(3);
  };
  return (
    <>
      <GiHamburgerMenu
        className={`left-3 fixed top-2 z-50`}
        size={25}
        onClick={() => setWidth(!width)}
      />
      <div
        className={`fixed h-[100vh] bg-white left-0 z-40 ${
          width ? "block" : "hidden"
        } shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]`}
      >
        <div className="ml-[210px]"></div>
        <div className="pt-[40px] w-full">
          <img
            src={digiKosLogo}
            className={`h-[50px] w-[100px]  mx-auto`}
            alt=""
          />
        </div>
        <div className="w-full p-3 mt-4 bg-white">
          <h1 className={` font-abc`}>Main Menu</h1>
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
            <div
              onClick={logout}
              className={`flex mt-2 bg-white text-black cursor-pointer h-[30px] rounded-md p-1 pl-3`}
            >
              <HiMiniClipboardDocumentList className="my-auto" />,
              <h1 className={`ml-2 font-abc my-auto text-[14px]`}>Logout</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
