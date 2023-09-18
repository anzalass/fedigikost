import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TabelDataRuangan({ edit, data, setEdit, setValueEdit, setErrRuangan }) {
  const nav = useNavigate();
  const OpenEdit = () => {
    setEdit(1);
  };

  console.log("data : ", data);

  const DeleteRuang = async (kodeRuang) => {
    const res = await axios.delete(
      `http://127.0.0.1:8000/api/deleteRuang/${kodeRuang}`
    );

    if (res.status == 200) {
      window.location.reload();
    }
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.2 },
    { field: "ruangan", headerName: "Ruangan", minWidth: 100, flex: 0.7 },
    {
      field: "aksi",
      headerName: "Aksi",
      flex: 1,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button
              className="mr-4"
              onClick={() => nav(`/detail-ruangan/${params.id}`)}
            >
              <AiOutlineArrowRight size={20} />
            </button>
            <button className="mr-4" onClick={() => DeleteRuang(params.id)}>
              <BsTrash3 color="red" size={20} />
            </button>
            <button className="mr-4" onClick={() => { OpenEdit(); setValueEdit({ kodeRuang: params.id, ruang: params.row.ruangan }); setErrRuangan({ kodeRuang: "", ruang: "" }) }}>
              <BiEditAlt color="blue" size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const row = [];
  data.forEach((a) => {
    row.push({
      id: a.kodeRuang,
      ruangan: a.ruang,
      // qtybarang: a.qtybarang,
    });
  });

  return (
    <div className="bg-white w-[96%] mt-3 mx-auto p-3 rounded-lg">
      <DataGrid
        disableRowSelectionOnClick
        autoHeight
        columns={columns}
        rows={row}
      />
    </div>
  );
}
