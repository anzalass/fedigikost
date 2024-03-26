import { useState } from "react";

import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { DataGrid } from "@mui/x-data-grid";
import testgambar from "../../../assets/img_car.png";
import { useNavigate } from "react-router-dom";

export default function AccPemeliharaanBarangOwner() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const data = [
    {
      id: 1,
      namaBarang: "ABCD",
      tanggalPembelian: "27 Agustus 2003",
      hargaBarang: 2000000,
      ruang: "R002",
      quantity: 2,
      total_harga: 4000000,
      status: "pending",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Resi Barang",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: "nama_barang",
      headerName: "Nama Barang",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "tgl",
      headerName: "Tanggal Pembelian",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "harga",
      headerName: "Harga Barang",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "qty_barang",
      headerName: "Qty Barang",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "lokasi_barang",
      headerName: "Lokasi Barang",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "total_harga",
      headerName: "Total Harga",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "foto",
      headerName: "Foto",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <img
            onClick={() => setDetailFoto(!detailFoto)}
            src={testgambar}
            alt=""
          />
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.row.status === "pending"
                ? "bg-yellow-400"
                : params.row.status === "acc"
                ? "bg-green-500"
                : "bg-red-600"
            } h-full text-center pt-3 text-white font-abc w-full `}
          >
            {params.row.status}
          </div>
        );
      },
    },

    {
      field: "aksi",
      headerName: "Aksi",
      headerClassName: "bg-slate-200 text-center font-abc",
      flex: 0.7,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button className="mr-4" onClick={() => DeletePengadaan(params.id)}>
              <BsTrash3 color="red" size={20} />
            </button>

            <button
              className="mr-4"
              onClick={() => nav(`/artikel/${params.id}`)}
            >
              <AiOutlineArrowRight size={20} />
            </button>

            <button
              className=""
              onClick={() => {
                editBarangFunc(params.id);
                setIdBarang(params.id);
              }}
            >
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
      nama_barang: a.namaBarang,
      tgl: a.tanggalPembelian,
      harga: a.hargaBarang,
      lokasi_barang: a.ruang,
      qty_barang: a.quantity,
      total_harga: a.hargaBarang * a.quantity,
      status: a.status,
    });
  });

  return (
    <div className="w-full h-[160vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        {/* <button onClick={(e) => setOpen(1)}>buka</button> */}
        {/* {open === 1 ? <Sidebar setSidebar={1} open={setOpen} /> : null} */}
        <SidebarOwner setSidebar={2} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Dashboard Owner"}</TopBarOwner>
        <div className="w-[94%] mx-auto">
          <button
            onClick={() => nav("/owner/pengadaan-barang")}
            className="bg-[#7B2CBF] h-[34px] mt-3 mb-3 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
          >
            {"<"} Kembali
          </button>
        </div>
        <DataGrid
          className="w-[94%] mx-auto"
          disableRowSelectionOnClick
          autoHeight
          columns={columns}
          rows={row}
        />
      </div>
    </div>
  );
}
