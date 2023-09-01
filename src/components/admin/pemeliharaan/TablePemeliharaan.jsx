import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import TambahPemeliharaan from "./TambahPemeliharaan";
import { BiEditAlt, BiPrinter } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import Swal from "sweetalert2";

// import "sweetalert2/src/sweetalert2.scss";

export default function TablePengeluaran() {
  const [addPemeliharaan, setAddPemeliharaan] = useState(false);

  const deleteBarang = () => {
    Swal.fire("Any fool can use a computer");
  };

  const data = [
    {
      id: 1,
      tgl: "27 Agustus 2023",
      nama_barang: "Kulkas : Polytron",
      keterangan: "Memperbaiki kulkas kurang dingin",
      lokasi_barang: 112,
      status: "dalam perbaikan",
      quantity: 2,
      biaya: 500000,
    },
  ];

  const columns = [
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
      field: "qty",
      headerName: "Quantity",
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
    },
    {
      field: "aksi",
      headerName: "Aksi",
      minWidth: 100,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button className="mr-4">
              <BiPrinter size={20} />
            </button>
            <button className="mr-4" onClick={() => deleteBarang()}>
              <BsTrash3 color="red" size={20} />
            </button>
            <button className="">
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
      tgl: a.tgl,
      nama_barang: a.nama_barang,
      keterangan: a.keterangan,
      lokasi_barang: a.lokasi_barang,
      status: a.status,
      biaya: a.biaya,
      qty: a.quantity,
    });
  });

  return (
    <div className="bg-white w-[95%] mt-3 mx-auto">
      <div className="flex justify-between w-full p-3">
        <div className="flex">
          <select
            name=""
            id=""
            className="border h-[34px] rounded-xl w-[100px] pl-2 "
          >
            <option value="">Januari</option>
            <option value="">Februari</option>
            <option value="">Maret</option>
            <option value="">April</option>
          </select>
          <select
            name=""
            id=""
            className="border h-[34px] rounded-xl w-[100px] pl-2 "
          >
            <option value="">2021</option>
            <option value="">2022</option>
            <option value="">2023</option>
            <option value="">2024</option>
          </select>
          <div className="">
            <button className="bg-[#7B2CBF] mb-3 px-3 text-center py-1 w-[130px] rounded-3xl text-[#E5D5F2] font-abc">
              Tampilkan
            </button>
          </div>
        </div>
      </div>
      <DataGrid
        className="w-[98%] mx-auto"
        disableRowSelectionOnClick
        autoHeight
        columns={columns}
        rows={row}
      />
      {addPemeliharaan ? (
        <TambahPemeliharaan
          setClose={setAddPemeliharaan}
          close={!addPemeliharaan}
        />
      ) : null}
    </div>
  );
}
