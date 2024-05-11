import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL, BASE_URL } from "../../../config/base_url";

export default function Aktivitas() {
  const [data, setData] = useState([]);
  const [allUser, setUser] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${BACKEND_BASE_URL}/api/getAllAktivitas`);
    const resUser = await axios.get(`${BACKEND_BASE_URL}/api/getUser`);

    setUser(resUser.data.results);
    setData(res.data.results);
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.2 },
    { field: "pembuat", headerName: "Pembuat", minWidth: 150, flex: 0.7 },
    { field: "tipe", headerName: "Tipe", minWidth: 100, flex: 0.7 },
    { field: "tgl", headerName: "Tanggal", minWidth: 150, flex: 0.7 },
    { field: "aktivitas", headerName: "Aktivitas", minWidth: 100, flex: 0.7 },
  ];

  const row = [];

  data.forEach((a) => {
    const pembuat = allUser.filter((result) => result.id === a.IdPembuat);
    row.push({
      id: a.id,
      pembuat: pembuat[0].name,
      tipe: a.tipe,
      tgl: a.created_at,
      jam: a.jam,
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
          <button className="font-abc px-6 rounded-lg text-white text-[14px] py-1  font-[500] bg-[#7B2CBF] my-3  ">
            Refresh Aktivitas
          </button>
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
