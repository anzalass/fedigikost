import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function TabelBarang() {
  const [pengadaanBarang, setPengadaanBarang] = useState(false);
  const nav = useNavigate();

  const data = [
    {
      id: 1,
      resi_barang: "23EWS",
      nama_barang: "Kulkas  : Polytron",
      tgl_pembelian: "27 Agustus 2023",
      harga: 2300000,
      lokasi_barang: "D002",
      qty_barang: 3,
      status: "pending",
      total: 6900000,
    },
  ];

  const columns = [
    { field: "id", headerName: "Resi Barang", minWidth: 50, flex: 0.5 },
    {
      field: "nama_barang",
      headerName: "Nama Barang",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "tgl",
      headerName: "Tanggal Pembelian",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "harga",
      headerName: "Harga Barang",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "qty_barang",
      headerName: "Qty Barang",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "lokasi_barang",
      headerName: "Lokasi Barang",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "total_harga",
      headerName: "Total Harga",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.7,
      renderCell: (params) => {
        console.log(params);
        return (
          <div className="bg-yellow-500 text-white rounded-lg px-3 py-2">
            {params.row.status}
          </div>
        );
      },
    },

    {
      field: "aksi",
      headerName: "Aksi",
      flex: 0.7,
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

  const row = [];

  data.forEach((a) => {
    row.push({
      id: a.resi_barang,
      nama_barang: a.nama_barang,
      tgl: a.tgl_pembelian,
      harga: a.harga,
      lokasi_barang: a.lokasi_barang,
      qty_barang: a.qty_barang,
      total_harga: a.total,
      status: a.status,
    });
  });

  return (
    <>
      {pengadaanBarang ? (
        <div className="bg-white w-[96%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
          <div className="w-[95%] mx-auto h-[130vh] bg-white rounded-xl">
            <div action="" className="w-[95%] mx-auto mt-2 p-3">
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2 ">Tanggal Pengadaan</h1>
                <input
                  type="date"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2 ">Kategori</h1>
                <select
                  name=""
                  id=""
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                >
                  <option value="">kulkas</option>
                  <option value="">kulkas</option>
                  <option value="">kulkas</option>
                  <option value="">kulkas</option>
                </select>
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Merek Barang</h1>
                <input
                  type="text"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Resi Barang</h1>
                <input
                  type="text"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Foto Nota Pembelian</h1>
                <input
                  type="text"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              {/* <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Alamat</h1>
              <textarea
                name=""
                id=""
                rows="3"
                className="w-full p-3 border-2 border-slate-500"
              ></textarea>
            </div> */}
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Spesifikasi Barang</h1>
                <input
                  type="text"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Lokasi Barang</h1>
                <input
                  type="text"
                  list="cars"
                  className="w-full border-2 border-slate-500"
                />
                <datalist id="cars">
                  <option>Volvo</option>
                  <option>Saab</option>
                  <option>Mercedes</option>
                  <option>Audi</option>
                </datalist>
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Quantitas Barang</h1>
                <input
                  type="text"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Harga</h1>
                <input
                  type="text"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Total Harga</h1>
                <input
                  type="text"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>

              {/* <div className="w-full mt-4">
              <label
                htmlFor="ktp"
                className="h-[20px] w-[50px] text-[13px] font-abc rounded-lg p-2 bg-[#E3E8EF]"
              >
                Upload KTP
              </label>
              <input type="file" id="ktp" name="ktp" className="hidden" />
            </div> */}
              <div className="w-full justify-center mt-12 mb-12 flex items-center">
                <button className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
                  Simpan
                </button>
                <button
                  onClick={() => setPengadaanBarang(!pengadaanBarang)}
                  className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {!pengadaanBarang ? (
        <div className="">
          <div className="bg-white w-[96%] mt-3 mb-[200px]  mx-auto p-3 rounded-lg">
            <div className="flex justify-between">
              <div className="">
                <button
                  onClick={() => setPengadaanBarang(!pengadaanBarang)}
                  className="bg-[#7B2CBF] mt-1 mb-3 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
                >
                  Tambah Barang
                </button>
              </div>
              <div className="flex">
                <button className="px-2 h-[30px] rounded-lg bg-yellow-500 mr-2">
                  Pending
                </button>
                <button className="px-2  h-[30px]  rounded-lg  bg-green-500">
                  Active
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
        </div>
      ) : null}
    </>
  );
}
