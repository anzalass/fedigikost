import React, { useState } from "react";
import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import testgambar from "../../../assets/img_car.png";

export default function PengadaanBarangOwner() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const editBarangFunc = (id) => {
    nav(`/owner/edit-barang/${id}`);
  };

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
        <SidebarOwner setSidebar={2} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Dashboard Owner"}</TopBarOwner>
        <div className=" min-h-screen bg-white  w-[95%] mx-auto mt-[10px] ">
          {/* section 1  */}
          <div className="w-full h-[100px] bg-white flex p-3  justify-between">
            <div className="">
              <button
                onClick={() => nav("/owner/tambah-barang")}
                className="bg-[#7B2CBF] h-[40px] mt-1 mr-2 mb-3 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
              >
                Tambah Barang +
              </button>
              <button
                onClick={() => nav("/owner/kategori")}
                className="bg-[#7B2CBF] h-[40px] mt-1 mb-3 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
              >
                Kategori Barang
              </button>
            </div>
            <button
              onClick={() => nav("/owner/menunggu-acc/")}
              className="bg-[#7B2CBF] relative mt-1 mb-3 h-[40px] px-3 text-center py-1 w-[300px] rounded-md text-[#E5D5F2] font-abc"
            >
              <div className="absolute h-[20px] text-sm w-[20px] text-white bg-red-500 -right-2 -top-2 rounded-full">
                5
              </div>
              Menunggu Persetujuan
            </button>
          </div>
          {/* section 1  */}
          {/* section 2 */}
          <div className="w-full  bg-white flex p-3  justify-start">
            <form className="flex ">
              <div className="">
                <select
                  name=""
                  id="ruang"
                  className="border h-[34px] rounded-xl w-[100px] pl-2 "
                >
                  <option value="">Ruang</option>
                  <option value="">112</option>
                  <option value="">113</option>
                  <option value="">114</option>
                </select>
              </div>
              <div className="">
                <select
                  name=""
                  id="bulan"
                  className="border h-[34px] rounded-xl w-[100px] pl-2 "
                >
                  <option value="">Bulan</option>
                  <option value="">Januari</option>
                  <option value="">Februari</option>
                  <option value="">Maret</option>
                </select>
              </div>
              <div className="">
                <select
                  name=""
                  id="tahun"
                  className="border h-[34px] rounded-xl w-[100px] pl-2 "
                >
                  <option value="">Tahun</option>
                  <option value="">2023</option>
                  <option value="">2022</option>
                  <option value="">2021</option>
                </select>
              </div>
              <div className="">
                <select
                  name=""
                  id="statuss"
                  className="border h-[34px] rounded-xl w-[100px] pl-2 "
                >
                  <option value="">Status</option>
                  <option value="">Pending</option>
                  <option value="">Acc</option>
                  <option value="">All</option>
                </select>
              </div>
              <button className="bg-[#7B2CBF]  mb-4 px-3 text-center py-1 w-[100px] rounded-xl text-[#E5D5F2] font-abc">
                Filter
              </button>
            </form>
          </div>
          {/* section 2 */}
          {/* section 3 */}
          <DataGrid
            className="w-[98%] mx-auto"
            disableRowSelectionOnClick
            autoHeight
            columns={columns}
            rows={row}
          />
          {/* section 3 */}
        </div>
      </div>
    </div>
  );
}
