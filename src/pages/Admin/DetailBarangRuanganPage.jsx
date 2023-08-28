import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

export default function DetailBarangRuangan() {
  const dataBarangRuangan = [
    {
      id: 1,
      nama_barang: "Kipas",
      qtybarang: 2,
    },
    {
      id: 2,
      nama_barang: "TV",
      qtybarang: 2,
    },
    {
      id: 3,
      nama_barang: "Kulkas",
      qtybarang: 2,
    },
  ];
  const columnsRuangan = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.2 },
    {
      field: "nama_barang",
      headerName: "Nama Barang",
      minWidth: 150,
      flex: 0.7,
    },

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
              onClick={() => nav(`/artikel/${params.id}`)}
            >
              <AiOutlineArrowRight size={20} />
            </button>
            <button className="mr-4" onClick={() => deleteArtikel(params.id)}>
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
  const rowBarangRuangan = [];
  dataBarangRuangan.forEach((a) => {
    rowBarangRuangan.push({
      id: a.id,
      nama_barang: a.nama_barang,
      qtybarang: a.qtybarang,
    });
  });

  return (
    <div className="w-full h-[160vh] flex">
      <div className="w-[16%]">
        {/* <button onClick={(e) => setOpen(1)}>buka</button> */}
        <Sidebar />
      </div>
      <div className="w-[84%]">
        <TopBar>{"Detail Ruangan D002"}</TopBar>
        <div className="w-full mt-2 h-[50px] mx-auto "></div>
        <div className="w-[95%] mx-auto">
          <DataGrid
            disableRowSelectionOnClick
            autoHeight
            columns={columnsRuangan}
            rows={rowBarangRuangan}
          />
        </div>
      </div>
    </div>
  );
}
