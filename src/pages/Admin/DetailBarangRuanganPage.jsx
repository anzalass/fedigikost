import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt, BiPrinter } from "react-icons/bi";
import { GiAutoRepair } from "react-icons/gi";
import ModalMaintenence from "../../components/admin/detailbarangruangan/ModalMaintenence";
import ModalChangeStatus from "../../components/admin/detailbarangruangan/ModalChangeStatus";

export default function DetailBarangRuangan() {
  const [open, setOpen] = useState(false);
  const [maintenence, setMaintenence] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);

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
              className="mr-4 "
              onClick={() => setMaintenence(!maintenence)}
            >
              <GiAutoRepair size={20} />
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
  const rowBarangRuangan = [];

  dataBarangRuangan.forEach((a) => {
    rowBarangRuangan.push({
      id: a.id,
      nama_barang: a.nama_barang,
      qtybarang: a.qtybarang,
    });
  });

  const dataMaintenenceRuangan = [
    {
      id: 1,
      tgl: "27 Agustus 2023",
      nama_barang: "Kulkas : Polytron",
      keterangan: "Memperbaiki kulkas kurang dingin",
      lokasi_barang: 112,
      status: "dalam perbaikan",
      biaya: 500000,
    },
    {
      id: 2,
      tgl: "27 Agustus 2023",
      nama_barang: "Kulkas : Polytron",
      keterangan: "Memperbaiki kulkas kurang dingin",
      lokasi_barang: 112,
      status: "dalam perbaikan",
      biaya: 500000,
    },
    {
      id: 3,
      tgl: "27 Agustus 2023",
      nama_barang: "Kulkas : Polytron",
      keterangan: "Memperbaiki kulkas kurang dingin",
      lokasi_barang: 112,
      status: "dalam perbaikan",
      biaya: 500000,
    },
  ];

  const columnsRuanganPemeliharaan = [
    { field: "id", headerName: "ID ", minWidth: 50, flex: 0.5 },
    {
      field: "tgl",
      headerName: "Tanggal",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "nama_barang",
      headerName: "Nama Barang",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "keterangan",
      headerName: "Keterangan",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "lokasi_barang",
      headerName: "Ruangan",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "biaya",
      headerName: "Biaya",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div className="" onClick={() => setChangeStatus(!changeStatus)}>
            {params.row.status}
          </div>
        );
      },
    },
  ];

  const rowBarangRuanganPemeliharaan = [];
  dataMaintenenceRuangan.forEach((a) => {
    rowBarangRuanganPemeliharaan.push({
      id: a.id,
      tgl: a.tgl,
      nama_barang: a.nama_barang,
      keterangan: a.keterangan,
      lokasi_barang: a.lokasi_barang,
      status: a.status,
      biaya: a.biaya,
    });
  });

  return (
    <>
      {changeStatus ? (
        <ModalChangeStatus open={changeStatus} setOpen={setChangeStatus} />
      ) : null}
      {maintenence ? (
        <ModalMaintenence open={maintenence} setOpen={setMaintenence} />
      ) : null}
      <div className="w-full h-[160vh] flex">
        <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
          {/* <button onClick={(e) => setOpen(1)}>buka</button> */}
          <Sidebar width={open} setWidth={setOpen} setSidebar={4} />
        </div>
        <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
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
          <div className="w-[95%] mx-auto mt-[100px]">
            <h1>Daftar Pemeliharaan</h1>
            <DataGrid
              disableRowSelectionOnClick
              autoHeight
              columns={columnsRuanganPemeliharaan}
              rows={rowBarangRuanganPemeliharaan}
            />
          </div>
        </div>
      </div>
    </>
  );
}
