import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../config/base_url";
import { data } from "autoprefixer";

export default function EditPetugasOwnerPage() {
  const { id } = useParams();
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    fetchDataByIdUser();
  }, [id]);

  const changeDataHandler = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });

    console.log(dataUser);
  };

  const UpdateUser = async () => {
    const res = await axios.put(
      `${BACKEND_BASE_URL}/api/updateDataUser/${id}`,
      dataUser
    );

    if (res) {
      window.location.href = "/petugas";
    }
  };

  const fetchDataByIdUser = async () => {
    const res = await axios.get(`${BACKEND_BASE_URL}/api/getUserById/${id}`);

    if (res) {
      console.log("datanya : ", `${BACKEND_BASE_URL}/api/getUserById/${id}`);
      setDataUser(res.data.results);
    }
  };
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-11/12 mx-auto min-h-screen">
      <div className={``}>
        {/* <button onClick={(e) => setOpen(1)}>buka</button> */}
        {/* {open === 1 ? <Sidebar setSidebar={1} open={setOpen} /> : null} */}
        <Sidebar setSidebar={5} width={open} setWidth={setOpen} />
      </div>
      <div className={`w-11/12 mx-auto`}>
        <TopBarOwner>{"Edit Petugas Owner"}</TopBarOwner>
        <div className="w-[94%] mx-auto">
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">Nama</h1>
            <input
              onChange={(e) => changeDataHandler(e)}
              name="name"
              value={dataUser?.name}
              type="text"
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
          </div>
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">Email</h1>
            <input
              onChange={(e) => changeDataHandler(e)}
              type="text"
              name="email"
              value={dataUser?.email}
              disabled={true}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
          </div>
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">Password</h1>
            <input
              type="password"
              name="password"
              onChange={(e) => changeDataHandler(e)}
              value={dataUser?.password}
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
          </div>
          <div className="w-full mt-6">
            <h1 className="font-abc font-[500]">No Telephone</h1>
            <input
              value={dataUser?.noHP}
              name="noHP"
              type="text"
              className="w-full h-[35px] border-2 pl-2 border-slate-500 rounded-md"
            />
          </div>
          <div className="w-full mt-4">
            <h1 className="font-abc pb-2 ">Role</h1>
            <select
              name="role"
              className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              onChange={(e) => changeDataHandler(e)}
            >
              {dataUser?.role == 1 ? (
                <>
                  <option value="1" selected>
                    Pemilik Kos (beserta keluarganya)
                  </option>
                  <option value="2">Admin</option>
                </>
              ) : (
                <>
                  <option value="1">Pemilik Kos (beserta keluarganya)</option>
                  <option value="2" selected>
                    Admin
                  </option>
                </>
              )}
            </select>
          </div>
          {/* <div className="w-full mt-6">
            <button className="bg-[#7B2CBF] px-3 py-1 w-[240px] rounded-md text-[#E5D5F2] font-abc">
              Request Ubah Password
            </button>
          </div> */}
          <div className="w-full mt-6 justify-center mb-7 flex items-center">
            <button
              onClick={() => UpdateUser()}
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
  );
}
