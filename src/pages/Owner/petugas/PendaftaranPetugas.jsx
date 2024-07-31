import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../config/base_url";
import TopBar from "../../../components/layout/TopBar";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function PendaftaranPetugas() {
  const { user } = useSelector((state) => state.user);
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (user?.role == 2) {
      nav("/home");
    }
  }, [user]);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    noHP: "",
    foto: "",
  });

  const [err, setErr] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    noHP: "",
    foto: "",
  });

  const tambahPetugas = async (e) => {
    e.preventDefault();
    const datas = new FormData();
    datas.append("file", img);
    datas.append("upload_preset", "digikostDemoApp");
    datas.append("cloud_name", "dkt6ysk5c");
    try {
      if (
        data.name.length > 0 &&
        data.email.length > 0 &&
        data.password.length > 0 &&
        data.noHP.length > 0 &&
        data.role.length
      ) {
        const res1 = await axios.post(
          "https://api.cloudinary.com/v1_1/dkt6ysk5c/image/upload",
          datas,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const res = await axios.post(`${BACKEND_BASE_URL}/api/Register`, {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          noHP: data.noHP,
          foto: res1.data.secure_url,
        });
        if (res.status == 200) {
          Swal.fire({
            title: "Berhasil Membuat Petugas",
            timer: 1000,
            showConfirmButton: false,
          });
          nav("/petugas");
        }
      }
    } catch (err) {
      console.log("error : ", err.response.data.error);
      Swal.fire({
        title: "Gagal Membuat Petugas",
        timer: 1000,
        showConfirmButton: false,
      });
      window.location.reload();
      setErr(err.response.data.error);
    }
  };

  const changeDataHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    console.log(data);
  };
  return (
    <div className="w-11/12 mx-auto h-[160vh] ">
      <div className={`w-full`}>
        <Sidebar setSidebar={5} width={open} setWidth={setOpen} />
      </div>
      <div className={`w-full`}>
        <TopBar>{"Pendaftaran Petugas"}</TopBar>
        <div className="w-full">
          <div className="w-[95%] h-[80px] justify-between flex mx-auto">
            <div className="w-[80%] mx-auto mt-10">
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Nama Lengkap</h1>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => changeDataHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {err.name ? <p>{err.name}</p> : null}
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Email</h1>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => changeDataHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {err.email ? <p>{err.email}</p> : null}
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Password</h1>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => changeDataHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {err.password ? <p>{err.password}</p> : null}
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">No HP</h1>
                <input
                  type="number"
                  name="noHP"
                  onChange={(e) => changeDataHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {err.noHP ? <p>{err.noHP}</p> : null}
              </div>
              {img ? (
                <div className="w-full ">
                  <img
                    className="w-[200px] h-[200px] rounded-full object-contain mt-4"
                    src={URL.createObjectURL(img)}
                    alt=""
                  />
                </div>
              ) : null}
              <div className="w-full mt-4">
                <label
                  htmlFor="fotopetugas"
                  className="border-2 border-slate-500 px-2 py-1 text-sm font-abc rounded-md"
                >
                  Pilih Foto
                </label>
                <input
                  id="fotopetugas"
                  name="fotopetugas"
                  type="file"
                  onChange={(e) => {
                    setImg(e.target.files[0]);
                  }}
                  className="hidden border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2 ">Role</h1>
                <select
                  name="role"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  onChange={(e) => changeDataHandler(e)}
                >
                  <option value="">Pilih Role</option>
                  <option value="1">Pemilik Kos</option>
                  <option value="2">Admin</option>
                </select>
                {err.role ? <p>{err.role}</p> : null}
              </div>
              <div className="w-full justify-center mt-12 mb-12 flex items-center">
                <button
                  onClick={tambahPetugas}
                  className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                >
                  Simpan
                </button>
                <button
                  onClick={() => nav("/petugas")}
                  className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
