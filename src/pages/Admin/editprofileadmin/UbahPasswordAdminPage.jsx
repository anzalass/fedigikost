import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { useSelector } from "react-redux";
import { BACKEND_BASE_URL } from "../../../config/base_url";
import axios from "axios";
import Swal from "sweetalert2";

export default function UbahPasswordAdminPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const [dataUser, setDataUser] = useState([]);
  const fetchDataByIdUser = async () => {
    const res = await axios.get(`${BACKEND_BASE_URL}/api/getUserById/${id}`);

    if (res) {
      console.log("datanya : ", `${BACKEND_BASE_URL}/api/getUserById/${id}`);
      setDataUser(res.data.results);
    }
  };
  useEffect(() => {
    fetchDataByIdUser();
  }, [id]);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.role == 2) {
      nav("/home");
    }
  }, [user]);
  // const [open, setOpen] = useState(false);
  const [hiddenPass1, setHiddenPass1] = useState(false);
  const [hiddenPass2, setHiddenPass2] = useState(false);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const EditPassword = async () => {
    await axios
      .put(`${BACKEND_BASE_URL}/updatePassword/${id}`, {
        password: pass2,
      })
      .then((res) => {
        Swal.fire("Berhasil Merubah Password");
        nav("/petugas");
      });
  };

  return (
    <div className="w-full h-[100vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        {/* <button onClick={(e) => setOpen(1)}>buka</button> */}
        {/* {open == 1 ? <Sidebar setSidebar={1} open={setOpen} /> : null} */}
        {/* <Sidebar setSidebar={1} width={open} setWidth={setOpen} /> */}
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        {/* <TopBar userSession={userSession}>{"Edit Profile Admin"}</TopBar> */}
        <div className="w-[50%] mx-auto mt-[15%]">
          <h1 className="font-abc font-[500] mx-auto text-center w-full text-xl">
            Reset Password {dataUser?.name}
          </h1>
          <div className="w-full mt-6 relative">
            <h1 className="font-abc font-[500]">Masukan Password Baru</h1>
            <input
              type={`${hiddenPass1 ? "text" : "password"}`}
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
            {hiddenPass1 == false ? (
              <AiOutlineEye
                onClick={() => setHiddenPass1(true)}
                size={25}
                className="absolute top-7 right-2"
              />
            ) : (
              <AiOutlineEye
                onClick={() => setHiddenPass1(false)}
                size={25}
                className="absolute top-7 right-2"
              />
            )}
          </div>
          <div className="w-full mt-6 relative">
            <h1 className="font-abc font-[500]">Masukan Ulang Password Baru</h1>
            <input
              type={`${hiddenPass2 ? "text" : "password"}`}
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />

            {hiddenPass2 == false ? (
              <AiOutlineEye
                onClick={() => setHiddenPass2(true)}
                size={25}
                className="absolute top-7 right-2"
              />
            ) : (
              <AiOutlineEye
                onClick={() => setHiddenPass2(false)}
                size={25}
                className="absolute top-7 right-2"
              />
            )}
          </div>

          <div className="w-full mt-6 justify-center gap-4 mb-7 flex items-center">
            <button
              disabled={pass1 !== pass2}
              onClick={EditPassword}
              className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
            >
              Simpan
            </button>
            <button
              onClick={() => nav("/petugas")}
              className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
