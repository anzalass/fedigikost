import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function TabelDataRuangan({ edit }) {
  const nav = useNavigate();

  const data = [
    {
      id: 1,
      ruangan: "D002",
      qtybarang: "12",
    },
  ];
  const columns = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.2 },
    { field: "ruangan", headerName: "Ruangan", minWidth: 100, flex: 0.7 },

    {
      field: "qtybarang",
      headerName: "Qty Barang",
      minWidth: 100,
      flex: 0.7,
    },
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
              onClick={() => nav(`/detail-ruangan/asdasd`)}
            >
              <AiOutlineArrowRight size={20} />
            </button>
            <button className="mr-4">
              <BsTrash3 color="red" size={20} />
            </button>
            <button className="" onClick={() => edit(1)}>
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
      id: a.id,
      ruangan: a.ruangan,
      qtybarang: a.qtybarang,
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
