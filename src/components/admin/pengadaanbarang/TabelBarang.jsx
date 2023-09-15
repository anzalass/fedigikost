import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import testgambar from "../../../assets/img_car.png";
import FotoDetail from "./FotoDetail";
import EditBarang from "./EditBarang";

export default function TabelBarang({ data }) {
  const [editBarang, setEditBarang] = useState(false);
  const [pengadaanBarang, setPengadaanBarang] = useState(false);
  const nav = useNavigate();
  const [idBarang, setIdBarang] = useState("");
  const [kategori, setKategori] = useState([]);
  const [pengadaan, setPengadaan] = useState({
    namaBarang: "",
    merek: "",
    hargaBarang: 0,
    quantity: 0,
    spesifikasi: "",
    ruang: "",
    supplier: "",
    buktiNota: "",
  });

  useEffect(() => {
    getKategori();
  }, []);
  console.log(kategori);

  const getKategori = async () => {
    const data = await axios.get("http://127.0.0.1:8000/api/getKategori");
    setKategori(data.data.results);
  };

  const [detailFoto, setDetailFoto] = useState(false);

  const changePengadaanHandler = (e) => {
    setPengadaan({
      ...pengadaan,
      [e.target.name]: e.target.value,
    });
    console.log(pengadaan);
  };

  const DeletePengadaan = async (id) => {
    await axios.delete("http://127.0.0.1:8000/api/pengadaanDelete/" + id);
    window.location.reload();
  };

  const editBarangFunc = () => {
    setEditBarang(!editBarang);
  };

  const TambahPengadaan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tambahPengadaan",
        pengadaan
      );
      window.location.reload(true);
      nav("/tambah-barang");
    } catch (err) {
      console.log(err);
    }
  };

  // const deleteBarang = () => {
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: "bg-blue-500 p-3 rounded-xl text-white font-abc mr-2",
  //       cancelButton: "bg-red-500 p-3 rounded-xl text-white font-abc ml-2 ",
  //     },
  //     confirmButtonColor: "red",
  //     cancelButtonColor: "blue",
  //     buttonsStyling: true,
  //   });

  //   swalWithBootstrapButtons
  //     .fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, delete it!",
  //       cancelButtonText: "No, cancel!",
  //       reverseButtons: true,
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         swalWithBootstrapButtons.fire(
  //           "Deleted!",
  //           "Your file has been deleted.",
  //           "success"
  //         );
  //       } else if (
  //         /* Read more about handling dismissals below */
  //         result.dismiss === Swal.DismissReason.cancel
  //       ) {
  //         swalWithBootstrapButtons.fire(
  //           "Cancelled",
  //           "Your imaginary file is safe :)",
  //           "error"
  //         );
  //       }
  //     });
  // };

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
      status: a?.status,
    });
  });

  return (
    <>
      {detailFoto ? (
        <FotoDetail open={detailFoto} setOpen={setDetailFoto} />
      ) : null}
      <div className="bg-white w-[96%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
        {pengadaanBarang ? (
          <div className="w-[95%] mx-auto h-[130vh] bg-white rounded-xl">
            <div action="" className="w-[95%] mx-auto mt-2 p-3">
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Tanggal Pengadaan</h1>
                <input
                  type="date"
                  name="tanggalPembelian"
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2 ">Kategori</h1>
                <select
                  name="namaBarang"
                  onChange={(e) => changePengadaanHandler(e)}
                  id=""
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                >
                  <option value="kulkas">Pilih Categori</option>
                  {kategori.map((item, index) => {
                    return (
                      <option key={index} value={`${item.kodeBarang}`}>
                        {item.namaBarang}:{item.kategori}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Merek Barang</h1>
                <input
                  type="text"
                  name="merek"
                  onChange={(e) => changePengadaanHandler(e)}
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
                  onChange={(e) => changePengadaanHandler(e)}
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
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Supplier</h1>
                <input
                  type="text"
                  name="supplier"
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Lokasi Barang</h1>
                <input
                  type="text"
                  name="ruang"
                  onChange={(e) => changePengadaanHandler(e)}
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
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Harga</h1>
                <input
                  type="number"
                  name="hargaBarang"
                  onChange={(e) => changePengadaanHandler(e)}
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
                <button
                  onClick={(e) => TambahPengadaan(e)}
                  className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                >
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
        ) : null}

        {!pengadaanBarang && !editBarang ? (
          <div className="">
            <div className="bg-white w-[96%] mt-3 mb-[200px]  mx-auto  rounded-lg">
              <div className="flex justify-between">
                <div className="">
                  <button
                    onClick={() => setPengadaanBarang(!pengadaanBarang)}
                    className="bg-[#7B2CBF] mt-1 mb-3 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Tambah Barang +
                  </button>
                </div>
                <div className="flex">
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
              </div>
              <DataGrid
                disableRowSelectionOnClick
                autoHeight
                columns={columns}
                rows={row}
                data={data}
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
      </div>
    </>
  );
}
