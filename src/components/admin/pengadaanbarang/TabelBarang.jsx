import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import EditBarang from "./EditBarang";

export default function TabelBarang({ data }) {
  const [editBarang, setEditBarang] = useState(false);
  const [pengadaanBarang, setPengadaanBarang] = useState(false);
  const nav = useNavigate();
  const [idBarang, setIdBarang] = useState("");
  const [pengadaan, setPengadaan] = useState({
    namaBarang: "",
    merek: "",
    hargaBarang: 0,
    quantity: 0,
    spesifikasi: "",
    ruang: "",
    supplier: "",
    buktiNota: ""
  });

  const changePengadaanHandler = (e) => {
    setPengadaan({
      ...pengadaan,
      [e.target.name]: e.target.value
    });
    console.log(pengadaan)
  }

  const DeletePengadaan = async (id) => {
    await axios.delete("http://127.0.0.1:8000/api/pengadaanDelete/" + id);
    window.location.reload();
  }

  const editBarangFunc = () => {
    setEditBarang(!editBarang);
  };

  const TambahPengadaan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/tambahPengadaan", pengadaan);
      console.log("mang eak", response);
    } catch (err) {
      console.log(err);
    }
  }

  // const data = [
  //   {
  //     id: 1,
  //     resi_barang: "23EWS",
  //     nama_barang: "Kulkas  : Polytron",
  //     tgl_pembelian: "27 Agustus 2023",
  //     harga: 2300000,
  //     lokasi_barang: "D002",
  //     qty_barang: 3,
  //     status: "Pending",
  //     total: 6900000,
  //   },
  // ];

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
            <button className="mr-4" onClick={() => DeletePengadaan(params.id)}>
              <BsTrash3 color="red" size={20} />
            </button>
            <button className="" onClick={() => {
              editBarangFunc(params.id);
              setIdBarang(params.id);
            }}>
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
      status: a.buktiNota,
    });
  });

  return (
    <>
      {pengadaanBarang ? (
        <div className="bg-white w-[96%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
          <div className="w-[95%] mx-auto h-[130vh] bg-white rounded-xl">
            <div action="" className="w-[95%] mx-auto mt-2 p-3">
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Tanggal Pengadaan</h1>
                <input
                  type="date"
                  name="tanggalPembelian"
                  onChange={e => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2 ">Kategori</h1>
                <select
                  name="namaBarang"
                  onChange={e => changePengadaanHandler(e)}
                  id=""
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                >
                  <option value="kulkas">kulkas</option>
                  <option value="kulkas">kulkas</option>
                  <option value="kulkas">kulkas</option>
                  <option value="kulkas">kulkas</option>
                </select>
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Merek Barang</h1>
                <input
                  type="text"
                  name="merek"
                  onChange={e => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              {/* <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Resi Barang</h1>
                <input
                  type="text"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div> */}
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Foto Nota Pembelian</h1>
                <input
                  type="text"
                  name="buktiNota"
                  onChange={e => changePengadaanHandler(e)}
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
                  name="spesifikasi"
                  onChange={e => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Supplier</h1>
                <input
                  type="text"
                  name="supplier"
                  onChange={e => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Lokasi Barang</h1>
                <input
                  type="text"
                  name="ruang"
                  onChange={e => changePengadaanHandler(e)}
                  list="cars"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                <datalist id="cars">
                  <option value="101">101</option>
                  <option value="102">102</option>
                  <option value="103">103</option>
                  <option value="104">104</option>
                </datalist>
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Quantitas Barang</h1>
                <input
                  type="number"
                  name="quantity"
                  onChange={e => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Harga</h1>
                <input
                  type="number"
                  name="hargaBarang"
                  onChange={e => changePengadaanHandler(e)}
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
                <button onClick={e => TambahPengadaan(e)} className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
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
      {!pengadaanBarang && !editBarang ? (
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

      {editBarang ? (
        <EditBarang
          setClose={setEditBarang}
          close={editBarang}
          idBarang={idBarang}
        />
      ) : null}
    </>
  );
}
