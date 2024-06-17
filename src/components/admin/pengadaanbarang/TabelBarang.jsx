import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IoQrCodeSharp } from "react-icons/io5";
import { BiSolidImageAdd } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { BsEye, BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import FotoDetail from "./FotoDetail";
import EditBarang from "./EditBarang";
import DetailPengadaan from "./DetailPengadaan";
import Spinner from "../../layout/Spinner";
import ModalAccPengadaan from "./ModalAccPengadaan";
import { useRender } from "../../../context/rendertablepengadaan";
import { useSearch } from "../../../context/searchContext";
import { useSelector } from "react-redux";
import ModalResi from "./ModalResi";
import PropTypes from "prop-types";

TabelBarang.propTypes = {
  kategori: PropTypes.array.isRequired,
  ruang: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function TabelBarang({ data, ruang, kategori }) {
  const { user } = useSelector((state) => state.user);
  const [search, setSearch] = useSearch();
  const [allBarang, setAllBarang] = useState([data]);
  const [editBarang, setEditBarang] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [valuePengadaan, setValuePengadaan] = useState();
  const [detailPengadaan, setDetailPengadaan] = useState(false);
  const [pengadaanBarang, setPengadaanBarang] = useState(false);
  const [foto, setFoto] = useState("");
  const nav = useNavigate();
  const [img, setImg] = useState();
  const [idBarang, setIdBarang] = useState("");
  // const [kategori, setKategori] = useState([]);
  // const [ruang, setRuang] = useState([]);
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTahun, setFilterTahun] = useState("");
  const [status, setStatus] = useState("");
  const [resi, setResi] = useState(false);
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
  let tahunSekarang = new Date().getFullYear() + 1;
  const tahun = [];
  const [gridKey, setGridKey] = useState(0);
  const [filter, setFilter] = useState("");
  const [render, setRender] = useRender();

  for (let i = 0; i < 10; i++) {
    tahun.push(tahunSekarang - 1);
    tahunSekarang = tahunSekarang - 1;
  }

  useEffect(() => {
    setAllBarang(data);
  }, [data]);

  let row = [];

  const [pengadaan, setPengadaan] = useState({
    id_pembuat: user?.id,
    role_pembuat: user?.role,
    nama_pembuat: user?.name,
    idUser: user?.id,
    namaBarang: "",
    kodeBarang: "",
    kodeRuang: "",
    merek: "",
    hargaBarang: "",
    quantity: "",
    spesifikasi: "",
    ruang: "",
    supplier: "",
    buktiNota: "",
  });

  const [errPengadaan, setErrorPengadaan] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   const getKategori = await axios.get(
  //     "http://127.0.0.1:8000/api/getKategori"
  //   );
  //   const getRuang = await axios.get("http://127.0.0.1:8000/api/getRuang");

  //   // if (getRuang && getKategori) {
  //   setKategori(getKategori.data.results);
  //   setRuang(getRuang.data.results);
  //   // }
  // };

  const [detailFoto, setDetailFoto] = useState(false);

  const changePengadaanHandler = (e) => {
    setPengadaan({
      ...pengadaan,
      [e.target.name]: e.target.value,
    });
    console.log(pengadaan);
  };

  const DeletePengadaan = async (id) => {
    Swal.fire({
      title: "Hapus",
      text: "Apakah Yakin Ingin Keluar ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      axios
        .delete("http://127.0.0.1:8000/api/pengadaanDelete/" + id, {
          id_pembuat: user?.id,
          role_pembuat: user?.role,
          nama_pembuat: user?.name,
        })
        .then((response) => {
          Swal.fire({
            title: "Hapus",
            text: "Berhasil Menghapus",
            icon: "success",
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Hapus",
            text: "Gagal Menghapus",
            icon: "error",
          });
        });
      window.location.reload();
    });
  };

  const editBarangFunc = () => {
    setEditBarang(!editBarang);
  };

  const TambahPengadaan = async () => {
    setPengadaan({
      ...pengadaan,
      idUser: user?.id,
      id_pembuat: user?.id,
      role_pembuat: user?.role,
      nama_pembuat: user?.name,
    });
    setRender(false);
    // Swal.fire({
    //   title: "Loading...",
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    try {
      await axios.post("http://127.0.0.1:8000/api/tambahPengadaan", pengadaan);
      setRender(true);
      setPengadaanBarang(!pengadaanBarang);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Pengajuan Sedang Diajukan",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(pengadaan);
      Swal.close();
    } catch (err) {
      console.log("errors ", err);

      Swal.fire("Error", "Failed to add pengadaan!", "error");
      setErrorPengadaan(err.response.data.error);
    }
  };

  const showBarang = () => {
    if (user?.role == 2) {
      data
        .filter(
          (item) =>
            user?.id == item.idUser &&
            (filter === "" || item.ruang === filter) &&
            (filterBulan === "" ||
              new Date(item.created_at).getMonth() === Number(filterBulan)) &&
            (filterTahun === "" ||
              new Date(item.created_at).getFullYear() ===
                Number(filterTahun)) &&
            (status === "" || item.status === status) &&
            (search === "" ||
              item.namaBarang.toLowerCase().includes(search.toLowerCase()))
        )
        .forEach((a) => {
          row.push({
            id: a.id,
            nama_barang: `${a.namaBarang}:${a.merek}`,
            tgl: new Date(a.tanggalPembelian).toLocaleDateString(
              "id-ID",
              options
            ),
            harga: a.hargaBarang.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }),
            resi: a.NoResi,
            lokasi_barang: a.ruang,
            foto: a.buktiNota,
            qty_barang: a.quantity,
            total_harga: (a.hargaBarang * a.quantity).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }),
            status: a?.status,
          });
        });
    } else if (user?.role == 1) {
      data
        .filter(
          (item) =>
            (filter === "" || item.ruang === filter) &&
            (filterBulan === "" ||
              new Date(item.created_at).getMonth() === Number(filterBulan)) &&
            (filterTahun === "" ||
              new Date(item.created_at).getFullYear() ===
                Number(filterTahun)) &&
            (status === "" || item.status === status) &&
            (search === "" ||
              item.namaBarang.toLowerCase().includes(search.toLowerCase()))
        )
        .forEach((a) => {
          row.push({
            id: a.id,
            nama_barang: `${a.namaBarang}:${a.merek}`,
            tgl: new Date(a.tanggalPembelian).toLocaleDateString(
              "id-ID",
              options
            ),
            resi: a.NoResi,
            harga: a.hargaBarang.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }),
            lokasi_barang: a.ruang,
            foto: a.buktiNota,
            qty_barang: a.quantity,
            total_harga: (a.hargaBarang * a.quantity).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }),
            status: a?.status,
          });
        });
    }
  };

  // useEffect(() => {}, []);
  showBarang();

  const ModalResiBarang = (id) => {
    setIdBarang(id);
    setResi(!resi);
  };

  const columns = [
    {
      field: "resi",
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
        if (params.row.foto == null) {
          return <></>;
        } else {
          return (
            <img
              onClick={() => {
                setFoto(params.row.foto);
                setDetailFoto(!detailFoto);
              }}
              src={params.row.foto}
              alt=""
            />
          );
        }
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-slate-200 text-center font-abc cursor-pointer",
      minWidth: 100,

      flex: 0.7,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {user?.role === 1 ? (
              <div
                onClick={() => {
                  setEditStatus(true);
                  setIdBarang(params.id);
                  console.log(params.id);
                }}
                className={`${
                  params.row.status === "pending"
                    ? "bg-yellow-400"
                    : params.row.status === "selesai"
                    ? "bg-blue-500"
                    : params.row.status === "disetujui"
                    ? "bg-green-500"
                    : "bg-red-500"
                } ${
                  user?.role === 2
                } h-full text-center pt-3 cursor-pointer text-white font-abc w-full `}
              >
                {params.row.status}
              </div>
            ) : (
              <div
                className={`${
                  params.row.status === "pending"
                    ? "bg-yellow-400"
                    : params.row.status === "selesai"
                    ? "bg-blue-500"
                    : params.row.status === "disetujui"
                    ? "bg-green-500"
                    : "bg-red-500"
                } ${
                  user?.role === 2
                } h-full text-center pt-3 cursor-pointer text-white font-abc w-full `}
              >
                {params.row.status}
              </div>
            )}
          </>
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
        console.log("BKTI", params.row);
        return (
          <div className="flex gap-2">
            {params.row.status !== "disetujui" &&
            params.row.status !== "ditolak" &&
            params.row.status !== "selesai" ? (
              <>
                <button
                  className=""
                  onClick={() => {
                    editBarangFunc(params.id);
                    setIdBarang(params.id);
                  }}
                >
                  <BiEditAlt color="blue" size={20} />
                </button>
                <button
                  className="mr-4"
                  onClick={() => DeletePengadaan(params.id)}
                >
                  <BsTrash3 color="red" size={20} />
                </button>
                {params.row.status === "selesai" ? (
                  <button
                    className="mr-4"
                    onClick={() => {
                      setValuePengadaan(params.id);
                      setDetailPengadaan(true);
                    }}
                  >
                    <IoQrCodeSharp size={20} />
                  </button>
                ) : null}
                <button
                  className="mr-4"
                  onClick={() => {
                    nav(`/detail-pengadaan/${params.id}`);
                  }}
                >
                  <BsEye size={20} />
                </button>
              </>
            ) : params.row.status === "disetujui" ? (
              <>
                {params.row.foto === null ? (
                  <button
                    className="mr-4"
                    onClick={() => ModalResiBarang(params.id)}
                  >
                    <BiSolidImageAdd color="" size={20} />
                  </button>
                ) : null}
                {/* <button
                  className="mr-4"
                  onClick={() => {
                    setValuePengadaan(params.id);
                    setDetailPengadaan(true);
                  }}
                >
                  <IoQrCodeSharp size={20} />
                </button> */}
                <button
                  className="mr-4"
                  onClick={() => {
                    nav(`/detail-pengadaan/${params.id}`);
                  }}
                >
                  <BsEye size={20} />
                </button>
              </>
            ) : params.row.status === "ditolak" ? (
              <>
                {/* <button
                  className="mr-4"
                  onClick={() => {
                    setValuePengadaan(params.id);
                    setDetailPengadaan(true);
                  }}
                >
                  <IoQrCodeSharp size={20} />
                </button> */}
                <button
                  className="mr-4"
                  onClick={() => {
                    nav(`/detail-pengadaan/${params.id}`);
                  }}
                >
                  <BsEye size={20} />
                </button>
              </>
            ) : params.row.status === "selesai" ? (
              <>
                <button
                  className="mr-4"
                  onClick={() => {
                    setValuePengadaan(params.id);
                    setDetailPengadaan(true);
                  }}
                >
                  <IoQrCodeSharp size={20} />
                </button>
                <button
                  className="mr-4"
                  onClick={() => {
                    nav(`/detail-pengadaan/${params.id}`);
                  }}
                >
                  <BsEye size={20} />
                </button>
              </>
            ) : null}
            {/* {user?.role == 1 ? (
              <>
                <button
                  className="mr-4"
                  onClick={() => DeletePengadaan(params.id)}
                >
                  <BsTrash3 color="red" size={20} />
                </button>
                <button
                  className="mr-4"
                  onClick={() => ModalResiBarang(params.id)}
                >
                  <BiSolidImageAdd color="" size={20} />
                </button>
              </>
            ) : params.row.status == "pending" ? (
              <button
                className="mr-4"
                onClick={() => DeletePengadaan(params.id)}
              >
                <BsTrash3 color="red" size={20} />
              </button>
            ) : params.row.status == "disetujui" ? (
              <button
                className="mr-4"
                onClick={() => ModalResiBarang(params.id)}
              >
                <BiSolidImageAdd color="" size={20} />
              </button>
            ) : null}
            <button
              className="mr-4"
              onClick={() => {
                setValuePengadaan(params.id);
                setDetailPengadaan(true);
              }}
            >
              <BsEye size={20} />
            </button>
            {user?.role == 1 ? (
              <button
                className=""
                onClick={() => {
                  editBarangFunc(params.id);
                  setIdBarang(params.id);
                }}
              >
                <BiEditAlt color="blue" size={20} />
              </button>
            ) : params.row.status == "pending" ? (
              <button
                className=""
                onClick={() => {
                  editBarangFunc(params.id);
                  setIdBarang(params.id);
                }}
              >
                <BiEditAlt color="blue" size={20} />
              </button>
            ) : null} */}
          </div>
        );
      },
    },
  ];
  console.log(kategori, "Asasasasa");
  return (
    <>
      {editStatus ? (
        <ModalAccPengadaan
          open={editStatus}
          setOpen={setEditStatus}
          id={idBarang}
        />
      ) : null}
      {resi ? <ModalResi open={resi} setOpen={setResi} id={idBarang} /> : null}
      {detailPengadaan ? (
        <DetailPengadaan
          open={detailPengadaan}
          setOpen={setDetailPengadaan}
          value={valuePengadaan}
        />
      ) : null}
      {detailFoto ? (
        <FotoDetail open={detailFoto} setOpen={setDetailFoto} foto={foto} />
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
                  name="kodeBarang"
                  onChange={(e) => {
                    const selectedBarang = kategori.find(
                      (item) => item.kodeBarang === e.target.value
                    );

                    setPengadaan({
                      ...pengadaan,
                      kodeBarang: selectedBarang.kodeBarang,
                      namaBarang: `${selectedBarang.namaBarang}`,
                      merek: selectedBarang.kategori,
                    });
                    // console.log(pengadaan);
                  }}
                  id=""
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                >
                  <option value="">Pilih Category</option>

                  {kategori?.map((item, index) => {
                    return (
                      <option key={index} value={`${item.kodeBarang}`}>
                        {item.namaBarang}:{item.kategori}
                      </option>
                    );
                  })}
                </select>
                {errPengadaan?.kodeBarang ? (
                  <p>{errPengadaan?.kodeBarang}</p>
                ) : null}
              </div>

              {/* <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Foto Nota Pembelian</h1>
                <label
                  htmlFor="buktiNota"
                  className="border-2 border-slate-500 px-2 py-1 text-sm font-abc rounded-md"
                >
                  Pilih Foto
                </label>
                <input
                  type="file"
                  name="buktiNota"
                  id="buktiNota"
                  onChange={(e) => {
                    setPengadaan({
                      ...pengadaan,
                      buktiNota: e.target.files[0],
                    });
                    setImg(e.target.files[0]);
                  }}
                  className="hidden border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {errPengadaan?.buktiNota ? (
                  <p>{errPengadaan?.buktiNota}</p>
                ) : null}
              </div>
              <div className="w-full mt-4">
                {img ? (
                  <div className="w-full ">
                    <img
                      className="w-[50%] mx-auto object-contain"
                      src={URL.createObjectURL(img)}
                      alt=""
                    />
                  </div>
                ) : null}
              </div> */}

              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Spesifikasi Barang</h1>
                <input
                  type="text"
                  name="spesifikasi"
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {errPengadaan?.spesifikasi ? (
                  <p>{errPengadaan?.spesifikasi}</p>
                ) : null}
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Supplier</h1>
                <input
                  type="text"
                  name="supplier"
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {errPengadaan?.supplier ? (
                  <p>{errPengadaan?.supplier}</p>
                ) : null}
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Lokasi Barang</h1>
                <select
                  id="cars"
                  name="kodeRuang"
                  onChange={(e) => {
                    const selectedRuang = ruang.find(
                      (item) => item.kodeRuang === e.target.value
                    );

                    setPengadaan({
                      ...pengadaan,
                      kodeRuang: selectedRuang.kodeRuang,
                      ruang: selectedRuang.ruang,
                    });
                    // console.log(pengadaan);
                  }}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                >
                  <option value="">Pilih Ruang</option>
                  {ruang.map((item, index) => {
                    return (
                      <option key={index} value={item.kodeRuang}>
                        {item.ruang}
                      </option>
                    );
                  })}
                </select>
                {errPengadaan?.ruang ? <p>{errPengadaan?.ruang}</p> : null}
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Quantitas Barang</h1>
                <input
                  type="number"
                  name="quantity"
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {errPengadaan?.quantity ? (
                  <p>{errPengadaan?.quantity}</p>
                ) : null}
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Harga</h1>
                <input
                  type="number"
                  name="hargaBarang"
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {errPengadaan?.hargaBarang ? (
                  <p>{errPengadaan?.hargaBarang}</p>
                ) : null}
              </div>

              <div className="w-full justify-center mt-12 mb-12 flex items-center">
                <button
                  onClick={TambahPengadaan}
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
              <div className="lg:flex xl:flex block justify-between">
                <div className="w-[50%]">
                  <button
                    onClick={() => setPengadaanBarang(!pengadaanBarang)}
                    className="bg-[#7B2CBF] mt-1 mb-3 px-3 text-center py-1 xl:w-[200px] lg:w-[200px] w-full md:w-[200px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Tambah Barang +
                  </button>
                </div>
                <div className="lg:w-[50%] xl:w-[50%] md:w-[100%] w-full mx-auto  mb-5">
                  <div className="block sm:block lg:flex xl:flex md:flex mx-auto   md:mt-[0px] lg:mt-0 xl:mt-0  ">
                    <div className="flex">
                      <div className="w-full">
                        <select
                          name=""
                          id="ruang"
                          onChange={(e) => setFilter(e.target.value)}
                          className="border h-[34px] rounded-xl  pl-2 w-full "
                        >
                          <option value="" selected>
                            Ruang
                          </option>
                          {ruang.map((item, index) => {
                            return (
                              <option key={index} value={item.ruang}>
                                {item.ruang}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="w-full">
                        <select
                          name=""
                          id="bulan"
                          onChange={(e) => setFilterBulan(e.target.value)}
                          className="border h-[34px] rounded-xl w-full pl-2 "
                        >
                          <option value="">Bulan</option>
                          {bulan.map((item, index) => {
                            return (
                              <option key={index} value={index}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="flex w-full">
                      <div className="w-full">
                        <select
                          name=""
                          id="tahun"
                          onChange={(e) => setFilterTahun(e.target.value)}
                          className="border h-[34px] rounded-xl w-full pl-2 "
                        >
                          <option value="">Tahun</option>
                          {tahun.map((item, index) => {
                            return (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="w-full">
                        <select
                          name=""
                          id="statuss"
                          onChange={(e) => setStatus(e.target.value)}
                          className="border h-[34px] rounded-xl w-full pl-2 "
                        >
                          <option value="">Status</option>
                          <option value="pending">Pending</option>
                          <option value="disetujui">Disetujui</option>
                          <option value="ditolak">Ditolak</option>
                          <option value="selesai">Selesai</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {data ? (
                <DataGrid
                  key={gridKey}
                  disableRowSelectionOnClick
                  autoHeight
                  columns={columns}
                  rows={row}
                  data={row}
                />
              ) : (
                <Spinner />
              )}
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
