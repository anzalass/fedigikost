import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL, BASE_URL } from "../../../config/base_url";
import { BsEye, BsTrash } from "react-icons/bs";
import { useRender } from "../../../context/rendertablepengadaan";
import { useSelector } from "react-redux";

Aktivitas.propTypes = {
  aktivitas: PropTypes.array.isRequired,
};

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function Aktivitas({ aktivitas }) {
  const [data, setData] = useState([]);
  const [allUser, setUser] = useState([]);
  const [render, setRender] = useRender();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // const res = await axios.get(`${BACKEND_BASE_URL}/api/getAllAktivitas`);
    const resUser = await axios.get(`${BACKEND_BASE_URL}/api/getUser`);

    setUser(resUser.data.results);
    // setData(res.data.results);
  };

  const DeleteAktivitasById = async (idaktivitas) => {
    setRender(false);
    await axios
      .delete(`${BACKEND_BASE_URL}/api/deleteaktivitasbyid/${idaktivitas}`)
      .then((response) => {
        setRender(true);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      className: "hidden",
      minWidth: 50,
      flex: 0.2,
    },
    { field: "pembuat", headerName: "Pembuat", minWidth: 150, flex: 0.7 },
    { field: "tipe", headerName: "Tipe", minWidth: 100, flex: 0.7 },
    { field: "tgl", headerName: "Tanggal", minWidth: 150, flex: 0.7 },
    {
      field: "aksi",
      headerName: "Aksi",
      headerClassName: "bg-slate-200 text-center font-abc",
      flex: 0.7,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex gap-2">
            <>
              <button
                className=""
                onClick={() => (window.location.href = params.row.url)}
              >
                <BsEye color="blue" size={20} />
              </button>
              {user.role == 1 ? (
                <button
                  className=""
                  onClick={() => DeleteAktivitasById(params.row.id)}
                >
                  <BsTrash color="red" size={20} />
                </button>
              ) : null}
            </>
          </div>
        );
      },
    },
  ];

  const row = [];

  aktivitas.forEach((a) => {
    row.push({
      id: a.id,
      pembuat: a.nama_pembuat,
      tipe: a.tipe,
      tgl: new Date(a.created_at).toLocaleDateString("id-ID", options),
      jam: a.jam,
      url: a.url,
      aktivitas: a.keterangan,
    });
  });

  return (
    <div className="bg-white w-[100%] mt-3 mx-auto">
      <div className="w-full justify-between flex p-2 ">
        <div className="">
          <h1 className="font-abc font-[500] text-[18px] my-3  ">
            Detail Aktivitas
          </h1>
        </div>
        <div className="">
          {/* <button className="font-abc px-6 rounded-lg text-white text-[14px] py-1  font-[500] bg-[#7B2CBF] my-3  ">
            Refresh Aktivitas
          </button> */}
        </div>
      </div>

      <DataGrid
        disableRowSelectionOnClick
        autoHeight
        columns={columns}
        rows={row}
      />
    </div>
  );
}
