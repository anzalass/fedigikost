import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt, BiPrinter } from "react-icons/bi";
import { GiAutoRepair } from "react-icons/gi";
import ModalMaintenence from "../../components/admin/detailbarangruangan/ModalMaintenence";
import ModalChangeStatus from "../../components/admin/detailbarangruangan/ModalChangeStatus";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../config/base_url";
import EditPemeliharaanModal from "../../components/admin/pemeliharaan/EditPemeliharaanModal";
import { useSelector } from "react-redux";

export default function DetailBarangRuangan() {
  const [open, setOpen] = useState(false);
  const [maintenence, setMaintenence] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [data, setData] = useState([]);
  const [pengadaan, setPengadaan] = useState([]);
  const [barang, setBarang] = useState([]);
  const [pemeliharaanBarang, setPemeliharaanBarang] = useState([]);
  const [editMaintenence, setEditMaintenence] = useState(false);

  const rowBarangRuangan = [];
  const [updateData, setUpdateData] = useState({
    sisa: null,
    id: null,
  });

  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  barang.forEach(async (a) => {
    let jumlahBarang = 0;
    // const getPengadaan = await axios.get(
    //   "${BACKEND_BASE_URL}/api/findByKategori/" + a.kodeBarang
    // );
    // // console.log(a.kodeBarang);
    const filterPengadaan = pengadaan.filter(
      (item) =>
        item.kodeBarang == a.kodeBarang &&
        item.kodeRuang == id &&
        item.is_active == 1
    );
    const filterPemeliharaan = pemeliharaanBarang.filter(
      (item) =>
        item.kodeBarang == a.kodeBarang &&
        item.kodeRuang == id &&
        item.status != "selesai"
    );

    filterPengadaan.forEach((bi) => {
      jumlahBarang += bi.quantity;
    });

    filterPemeliharaan.forEach((bi) => {
      jumlahBarang -= bi.jumlah;
    });
    // console.log(a.kodeBarang);

    rowBarangRuangan.push({
      id: a.kodeBarang,
      nama_barang: a.namaBarang,
      qtybarang: jumlahBarang,
    });
  });

  const hapusPemeliharaan = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_BASE_URL}/api/deletePemeliharaan/${id}`,
        {
          data: {
            id_pembuat: user?.id,
            role_pembuat: user?.role,
            nama_pembuat: user?.name,
          },
        }
      );

      if (response) {
        window.location.reload();
      }
    } catch (err) {
      alert(err);
    }
  };

  const fetchData = async () => {
    try {
      const getBarang = await axios.get(`${BACKEND_BASE_URL}/api/getKategori`);
      const getPengadaan = await axios.get(`${BACKEND_BASE_URL}/api/pengadaan`);
      const getPemeliharan = await axios.get(
        `${BACKEND_BASE_URL}/api/getPemeliharaan`
      );
      setBarang(getBarang.data.results);
      setPengadaan(getPengadaan.data.result);
      console.log("test pemeliharaan : ", getPemeliharan.data.results);
      setPemeliharaanBarang(getPemeliharan.data.results);
    } catch (err) {
      alert(err);
    }
  };

  const columnsRuangan = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "bg-slate-200 text-center font-abc",
      minWidth: 50,
      flex: 0.2,
    },
    {
      field: "nama_barang",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "Nama Barang",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "qtybarang",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "Qty Barang",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "aksi",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "Aksi",
      flex: 1,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button
              className="mr-4 "
              onClick={() => {
                setMaintenence(!maintenence);
                setData(params.row);
              }}
            >
              <GiAutoRepair size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const getPengadaanByKodeBarang = async (kodeBarang) => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/api/findByKategori/${kodeBarang}`
      );
      return response.data.results;
    } catch (error) {
      console.error("Error fetching pengadaan data:", error);
      return [];
    }
  };

  const columnsRuanganPemeliharaan = [
    {
      field: "id",
      headerName: "ID ",
      headerClassName: "bg-slate-200 text-center font-abc",
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
      field: "jumlah",
      headerName: "Jumlah",
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
            className=""
            onClick={() => {
              updateData.id = params.id;
              if (user?.role == 1) {
                setChangeStatus(!changeStatus);
              }
            }}
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
      flex: 1,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        console.log("params : ", params);
        const sisa = rowBarangRuangan.filter(
          (item) => item.id == params.row.nama_barang
        );
        return (
          <div className="flex">
            {user.role == 1 ? (
              <>
                <button
                  onClick={() => hapusPemeliharaan(params.id)}
                  className="mr-4"
                >
                  <BsTrash3 color="red" size={20} />
                </button>
                <button className="">
                  <BiEditAlt
                    color="blue"
                    size={20}
                    onClick={() => {
                      setEditMaintenence(true);
                      console.log("params 1 : ", params);
                      setUpdateData({
                        sisa: sisa[0].qtybarang,
                        id: params.id,
                      });
                    }}
                  />
                </button>
              </>
            ) : user?.id == params.row.idUser ? (
              <>
                <button
                  onClick={() => hapusPemeliharaan(params.id)}
                  className="mr-4"
                >
                  <BsTrash3 color="red" size={20} />
                </button>
                <button className="">
                  <BiEditAlt
                    color="blue"
                    size={20}
                    onClick={() => {
                      setUpdateData({
                        sisa: sisa[0].qtybarang,
                        id: params.id,
                      });
                    }}
                  />
                </button>
              </>
            ) : null}
          </div>
        );
      },
    },
  ];
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const rowBarangRuanganPemeliharaan = [];
  pemeliharaanBarang
    .filter((item) => item.kodeRuang == id)
    .forEach((a) => {
      rowBarangRuanganPemeliharaan.push({
        id: a.kodePemeliharaan,
        idUser: a.idUser,
        tgl: new Date(a.created_at).toLocaleDateString("id-ID", options),
        nama_barang: a.kodeBarang,
        jumlah: a.jumlah,
        keterangan: a.keterangan,
        lokasi_barang: a.kodeRuang,
        status: a.status,
        biaya: a.harga,
      });
    });

  return (
    <>
      {changeStatus ? (
        <ModalChangeStatus
          id={updateData.id}
          reFetch={fetchData}
          open={changeStatus}
          setOpen={setChangeStatus}
        />
      ) : null}
      {maintenence ? (
        <ModalMaintenence
          open={maintenence}
          setOpen={setMaintenence}
          data={data}
          ruang={id}
        />
      ) : null}
      {editMaintenence ? (
        <EditPemeliharaanModal
          open={editMaintenence}
          id={updateData.id}
          sisa={updateData.sisa}
          setOpen={setEditMaintenence}
        />
      ) : null}
      <div className="w-full h-[160vh] flex">
        <div className={``}>
          <Sidebar width={open} setWidth={setOpen} setSidebar={4} />
        </div>
        <div className={`w-11/12 mx-auto`}>
          <TopBar>{`Detail Ruangan ${id} `}</TopBar>
          <div className="w-full mt-2 h-[50px] mx-auto "></div>
          <div className="w-[95%] mx-auto">
            <DataGrid
              disableRowSelectionOnClick
              autoHeight
              className="bg-white"
              columns={columnsRuangan}
              rows={rowBarangRuangan.filter((item) => item.qtybarang)}
            />
          </div>
          <div className="w-[95%] mx-auto mt-[50px]">
            <h1 className="font-abc">Daftar Pemeliharaan</h1>
            <DataGrid
              disableRowSelectionOnClick
              autoHeight
              className="bg-white"
              columns={columnsRuanganPemeliharaan}
              rows={rowBarangRuanganPemeliharaan.filter(
                (item) => item.status != "selesai"
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}
