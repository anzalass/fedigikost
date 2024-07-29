import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";

import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../config/base_url";
import { useSearch } from "../../../context/searchContext";
import TopBar from "../../../components/layout/TopBar";
import { useSelector } from "react-redux";
import Spinner from "../../../components/layout/Spinner";
export default function DaftarPetugasPage() {
  const nav = useNavigate();
  const [search, setSearch] = useSearch();
  const [open, setOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.role === 2) {
      nav("/home");
    }
  }, [user]);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await axios.get(`${BACKEND_BASE_URL}/api/getUser`);
    setAllUser(res.data.results);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const deletePetugas = async (id) => {
    const res = await axios.delete(`${BACKEND_BASE_URL}/api/deleteUser/${id}`);

    if (res.status === 200) {
      window.location.reload();
    }
  };

  const columns = [
    {
      field: "id",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "ID",
      minWidth: 50,
      flex: 0.2,
    },
    {
      field: "nama",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "Nama Petugas",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "email",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "Email",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "role",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "Role",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "nohp",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "No HP",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "aksi",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "Aksi",
      flex: 1,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button onClick={() => deletePetugas(params.id)} className="mr-4">
              <BsTrash3 color="red" size={20} />
            </button>
            <button
              className=""
              onClick={() => nav(`/edit-petugas/${params.id}`)}
            >
              <BiEditAlt color="blue" size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const row = [];
  allUser
    .filter(
      (item) =>
        search === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.noHP.toLowerCase().includes(search.toLowerCase())
    )
    .forEach((a) => {
      row.push({
        id: a.id,
        nama: a.name,
        email: a.email,
        role: a.role,
        nohp: a.noHP,
        // qtybarang: a.qtybarang,
      });
    });

  return (
    <>
      {user.role === 2 ? (
        <Spinner />
      ) : (
        <div className="w-full h-[160vh] flex">
          <div className={``}>
            <Sidebar setSidebar={5} width={open} setWidth={setOpen} />
          </div>
          <div className={`mx-auto w-11/12 `}>
            <TopBar>{"Daftar Petugas"}</TopBar>
            <div className="w-full">
              <div className="w-[95%] h-[80px] justify-between flex mx-auto">
                <div className="">
                  <button
                    onClick={() => nav("/daftar-petugas")}
                    className="bg-[#7B2CBF] mt-5 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Tambah Petugas
                  </button>
                </div>
                <div className=" mt-5 px-3 py-1 w-[200px] h-[40px] rounded-md  font-abc">
                  <input
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="w-full h-full pl-2 rounded-lg"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="w-[90%] mx-auto">
                <DataGrid
                  rows={row}
                  columns={columns}
                  disableRowSelectionOnClick
                  autoHeight
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
