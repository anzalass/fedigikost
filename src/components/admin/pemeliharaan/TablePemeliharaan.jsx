import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { BiEditAlt, BiPrinter } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";
import { BACKEND_BASE_URL } from "../../../config/base_url";

// import "sweetalert2/src/sweetalert2.scss";

export default function TablePengeluaran() {
  const { user } = useSelector((state) => state.user);
  const [addPemeliharaan, setAddPemeliharaan] = useState(false);
  const [dataPemeliharaan, setDataPemeliharaan] = useState([]);
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTahun, setFilterTahun] = useState("");
  const [filterStatus, setStatus] = useState("");
  const bulan = [
    "Januari",
    "Febuari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let tahunSekarang = new Date().getFullYear() + 1;
  const tahun = [];

  for (let i = 0; i < 10; i++) {
    tahun.push(tahunSekarang - 1);
    tahunSekarang = tahunSekarang - 1;
  }

  useEffect(() => {
    fetchPemeliharaan();
  }, []);

  const fetchPemeliharaan = async () => {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/getPemeliharaan`);

    setDataPemeliharaan(response.data.results);
  };

  const deleteBarang = async (id) => {
    await axios
      .post(`${BACKEND_BASE_URL}/api/deletePemeliharaan/${id}`, {
        id_pembuat: user.id,
        id_kegiatan: 1,
        nama_pembuat: user.name,
        role_pembuat: user.role,
      })
      .then((response) => {
        Swal.fire("Berhasil Menghapus Pemeliharaan");
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire("Gagal Menghapus Pemeliharaan");
      });
  };

  const columns = [
    {
      field: "id",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "ID ",
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: "tgl",
      headerName: "Tanggal",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "nama_barang",
      headerName: "Nama Barang",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "keterangan",
      headerName: "Keterangan",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "lokasi_barang",
      headerName: "Ruangan",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "jumlah",
      headerName: "Jumlah",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "biaya",
      headerName: "Biaya",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 100,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.row.status == "pending"
                ? "bg-yellow-400"
                : params.row.status == "selesai"
                ? "bg-green-500"
                : params.row.status == "dalam perbaikan"
                ? "bg-blue-600"
                : "bg-red-500"
            } h-full text-center pt-3 text-white font-abc w-full `}
          >
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "aksi",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "Aksi",
      minWidth: 100,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            {/* <button className="mr-4">
              <BiPrinter size={20} />
            </button> */}
            {user?.role == 1 ? (
              <button
                className="mr-4"
                onClick={() => deleteBarang(params.row.id)}
              >
                <BsTrash3 color="red" size={20} />
              </button>
            ) : null}
          </div>
        );
      },
    },
  ];

  const row = [];

  if (user?.role == 2) {
    dataPemeliharaan
      .filter(
        (item) =>
          user?.id == item.idUser &&
          (filterBulan == "" ||
            new Date(item.created_at).getMonth() == Number(filterBulan)) &&
          (filterTahun == "" ||
            new Date(item.created_at).getFullYear() == Number(filterTahun)) &&
          (filterStatus == "" || filterStatus == item.status)
      )
      .forEach((a) => {
        row.push({
          id: a.kodePemeliharaan,
          tgl: new Date(a.created_at).toLocaleDateString("id-ID", options),
          nama_barang: a.kodeBarang,
          jumlah: a.jumlah,
          keterangan: a.keterangan,
          lokasi_barang: a.kodeRuang,
          status: a.status,
          biaya: a.harga,
        });
      });
  } else if (user?.role == 1) {
    dataPemeliharaan
      .filter(
        (item) =>
          (filterBulan == "" ||
            new Date(item.created_at).getMonth() == Number(filterBulan)) &&
          (filterTahun == "" ||
            new Date(item.created_at).getFullYear() == Number(filterTahun)) &&
          (filterStatus == "" || filterStatus == item.status)
      )
      .forEach((a) => {
        row.push({
          id: a.kodePemeliharaan,
          tgl: new Date(a.created_at).toLocaleDateString("id-ID", options),
          nama_barang: a.kodeBarang,
          jumlah: a.jumlah,
          keterangan: a.keterangan,
          lokasi_barang: a.kodeRuang,
          status: a.status,
          biaya: a.harga,
        });
      });
  }

  return (
    <div className="bg-white w-[95%] mt-3 mx-auto">
      <div className="flex justify-between w-full p-3">
        <div className="flex">
          <select
            name=""
            id=""
            onChange={(e) => setFilterBulan(e.target.value)}
            className="border h-[34px] rounded-xl w-[100px] pl-2 "
          >
            <option value="">Bulan</option>
            {bulan.map((item, index) => {
              return <option value={index}>{item}</option>;
            })}
          </select>
          <select
            name=""
            id=""
            onChange={(e) => setFilterTahun(e.target.value)}
            className="border h-[34px] rounded-xl w-[100px] pl-2 "
          >
            <option value="">Tahun</option>
            {tahun.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <select
            name=""
            id=""
            onChange={(e) => setStatus(e.target.value)}
            className="border h-[34px] rounded-xl w-[100px] pl-2 "
          >
            <option value="">Status</option>
            <option value="pending">pending</option>
            <option value="selesai">selesai</option>
            <option value="ditolak">ditolak</option>
          </select>
        </div>
      </div>
      <DataGrid
        className="w-[98%] mx-auto"
        disableRowSelectionOnClick
        autoHeight
        columns={columns}
        rows={row}
      />
    </div>
  );
}
