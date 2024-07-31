import Sidebar from "../../components/layout/Sidebar.jsx";
import TopBar from "../../components/layout/TopBar.jsx";
import TableBarang from "../../components/admin/pengadaanbarang/TabelBarang.jsx";
import axios, { all } from "axios";
import { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { data } from "autoprefixer";
import { BASE_URL, BACKEND_BASE_URL } from "../../config/base_url.jsx";
import { useRender } from "../../context/rendertablepengadaan.jsx";
import { useSearch } from "../../context/searchContext.jsx";
import { useSelector } from "react-redux";
import { useContextNotifikasi } from "../../context/notifikasicontext.jsx";
import { useRenderkategori } from "../../context/rendertablekategori.jsx";
import Swal from "sweetalert2";

export default function TambahBarangPage() {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [barang, setBarang] = useState([]);
  const [ruang, setRuang] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [allKategori, setallKategori] = useState([]);
  const [search, setSearch] = useSearch();
  const [render, setRender] = useRender();
  const [renderkategori, setRenderKategori] = useRenderkategori();
  const [notif, setNotif] = useContextNotifikasi();

  const [kategori, setKategori] = useState({
    idUser: user?.id,
    kodeBarang: "",
    namaBarang: "",
    merekBarang: "",
    id_pembuat: user?.id,
    role_pembuat: user?.role,
    nama_pembuat: user?.name,
  });

  const [kategoriErrors, setKategoriErrors] = useState({
    kodeBarang: "",
    namaBarang: "",
    merekBarang: "",
  });

  const [kategoriEditErrors, setKategoriEditErrors] = useState({
    kodeBarang: "",
    namaBarang: "",
    merekBarang: "",
  });

  const TambahKategori = async (e) => {
    e.preventDefault();
    setRenderKategori(false);
    try {
      const findKategori = await axios.get(
        `${BACKEND_BASE_URL}/api/findKategori/` +
          kategori.kodeBarang +
          "/" +
          kategori.namaBarang
      );

      if (findKategori.status == 200) {
        Swal.fire({
          title: "Kategori Sudah Ada",
          icon: "warning",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      try {
        if (error.response.status == 404) {
          const tambah = await axios.post(
            `${BACKEND_BASE_URL}/api/tambahKategori`,
            kategori
          );

          if (tambah.status == 200) {
            // window.location.reload();
            setAddBarang(true);
            setRenderKategori(true);
            setKategori((prev) => ({
              ...prev,
              kodeBarang: "",
              namaBarang: "",
              merekBarang: "",
            }));
            Swal.fire({
              title: "Berhasil Menambah Kategori",
              icon: "success",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        }
      } catch (err) {
        setKategoriErrors(err.response.data.errors);
        setKategoriErrors({
          kodeBarang: err.response.data.errors?.kodeBarang,
          namaBarang: err.response.data.errors?.namaBarang,
        });
        console.log(err.response.data.errors);
      }
      console.error("error : ", error);
    }
  };

  const EditHandler = (kodeBarang, namaBarang, kategori) => {
    setKategori((prevData) => ({
      ...prevData,
      kodeBarang: kodeBarang,
      namaBarang: namaBarang,
      merekBarang: kategori,
    }));

    setIsEdit(true);
  };

  const TambahHandler = () => {
    setKategori((prevData) => ({
      ...prevData,
      kodeBarang: "",
      namaBarang: "",
    }));

    setIsEdit(false);
  };

  const UpdateKategori = async (id) => {
    try {
      setRenderKategori(false);
      const result = await axios.put(
        `${BACKEND_BASE_URL}/api/updateKategori/` + id,
        kategori
      );
      if (result) {
        // window.location.reload();
        setAddBarang(true);
        setRenderKategori(true);
        setKategori((prev) => ({
          ...prev,
          kodeBarang: "",
          namaBarang: "",
          merekBarang: "",
        }));
        setIsEdit(false);
        Swal.fire({
          title: "Berhasil Mengupdate Kategori",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (err) {
      console.log("error : ", err.response.data.errors);
      setKategoriEditErrors(err.response.data.errors);
    }
  };

  const DeleteKategori = async (id) => {
    console.log("ini id nya : ", id);
    setRenderKategori(false);
    const result = await axios.post(
      `${BACKEND_BASE_URL}/api/kategoriDelete/` + id,
      {
        id_pembuat: user?.id,
        role_pembuat: user?.role,
        nama_pembuat: user?.name,
      }
    );
    if (result) {
      // window.location.reload();
      setAddBarang(true);
      setRenderKategori(true);
      setKategori((prev) => ({
        ...prev,
        kodeBarang: "",
        namaBarang: "",
        merekBarang: "",
      }));
      Swal.fire({
        title: "Berhasil Menghapus Kategori",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const changeKategoriHandler = (e) => {
    setKategori({
      ...kategori,
      [e.target.name]: e.target.value,
    });
    // console.log(kategori);
  };

  // const fetchData = async () => {
  //   try {
  //     const result = await axios.get(`${BACKEND_BASE_URL}/api/pengadaan`);
  //     setBarang(result.data.result);
  //     // console.log(result.data.result);
  //     const resultKategori = await axios.get(
  //       `${BACKEND_BASE_URL}/api/getKategori`
  //     );
  //     setallKategori(resultKategori.data.results);

  //     // // Add a delay before making the next request
  //     // await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds
  //   } catch (err) {
  //     console.log("something went wrong");
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [render]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/api/pengadaanpage`);
      setBarang(res.data.pengadaan);
      setallKategori(res.data.kategori);
      setRuang(res.data.ruang);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    console.log(barang);
  }, [render || renderkategori]);

  const [addBarang, setAddBarang] = useState(false);
  const [open, setOpen] = useState(false);

  const columns = [
    { field: "id", headerName: "Kode Barang", minWidth: 50, flex: 0.5 },

    {
      field: "nama_barang",
      headerName: "Nama Barang",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "kategori",
      headerName: "Merek Barang",
      minWidth: 150,
      flex: 0.7,
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
            <button className="mr-4" onClick={() => DeleteKategori(params.id)}>
              <BsTrash3 color="red" size={20} />
            </button>
            <button
              className=""
              onClick={() =>
                EditHandler(
                  params.id,
                  params.row.nama_barang,
                  params.row.kategori
                )
              }
            >
              <BiEditAlt color="blue" size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const row = [];

  allKategori.forEach((a) => {
    row.push({
      id: a.kodeBarang,
      nama_barang: a.namaBarang,
      kategori: a.kategori,
    });
  });
  const [openNotif, setOpenNotif] = useState(false);
  return (
    <div className="w-full h-[100vh] flex">
      <div className={``}>
        <Sidebar setSidebar={2} width={open} setWidth={setOpen} />
      </div>
      <div className={`w-11/12 mx-auto`}>
        <TopBar
          openNotif={openNotif}
          setOpenNotif={setOpenNotif}
          notifikasi={notif.notifikasi}
          totalnotifikasi={notif.totalnotifikasi}
        >
          {user?.role == 1 ? "Dashboard Owner" : "Dashboard Admin"}
        </TopBar>
        <div className="w-[95%] h-[80px] lg:justify-between justify-center xl:justify-between mx-auto flex">
          <div className="">
            <button
              onClick={() => setAddBarang(!addBarang)}
              className="bg-[#7B2CBF] mt-5 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
            >
              Kategori Barang
            </button>
          </div>
          {addBarang ? null : (
            <div className=" mt-5 px-3 py-1 w-[200px] h-[40px] rounded-md  font-abc">
              <input
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="w-full h-full pl-2 rounded-lg"
                placeholder="Search"
              />
            </div>
          )}
        </div>
        <div className="w-[95%] opacity-25 mx-auto mt-0 h-[1px] bg-slate-600"></div>

        {!addBarang ? (
          <TableBarang data={barang} ruang={ruang} kategori={allKategori} />
        ) : null}

        {addBarang ? (
          <div className="w-[95%] mx-auto h-[105vh] bg-white rounded-xl">
            {isEdit ? (
              <div className="w-[95%] mx-auto mt-6 p-3">
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Kode Barang</h1>
                  <input
                    type="text"
                    value={kategori.kodeBarang}
                    name="kodeBarang"
                    disabled
                    onChange={(e) => changeKategoriHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {kategoriEditErrors.kodeBarang ? (
                    <p>{kategori.kodeBarang}</p>
                  ) : null}
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Nama Barang</h1>
                  <input
                    type="text"
                    value={kategori.namaBarang}
                    name="namaBarang"
                    onChange={(e) => changeKategoriHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {kategoriEditErrors.namaBarang ? (
                    <p>{kategoriEditErrors.namaBarang}</p>
                  ) : null}
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Merek Barang</h1>
                  <input
                    type="text"
                    value={kategori.merekBarang}
                    name="merekBarang"
                    onChange={(e) => changeKategoriHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {kategoriEditErrors.merekBarang ? (
                    <p>{kategoriEditErrors.merekBarang}</p>
                  ) : null}
                </div>
                <div className="w-full justify-center mt-12 flex items-center">
                  <button
                    onClick={(e) => UpdateKategori(kategori.kodeBarang)}
                    className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => TambahHandler()}
                    className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-[95%] mx-auto mt-6 p-3">
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Kode Barang</h1>
                  <input
                    type="text"
                    value={kategori.kodeBarang}
                    name="kodeBarang"
                    onChange={(e) => changeKategoriHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {kategoriErrors.kodeBarang ? (
                    <p>{kategoriErrors.kodeBarang}</p>
                  ) : null}
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Nama Barang</h1>
                  <input
                    type="text"
                    value={kategori.namaBarang}
                    name="namaBarang"
                    onChange={(e) => changeKategoriHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {kategoriErrors.namaBarang ? (
                    <p>{kategoriErrors.namaBarang}</p>
                  ) : null}
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Merek Barang</h1>
                  <input
                    type="text"
                    value={kategori.merekBarang}
                    name="merekBarang"
                    onChange={(e) => changeKategoriHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                  {kategoriErrors.merekBarang ? (
                    <p>{kategoriErrors.merekBarang}</p>
                  ) : null}
                </div>
                <div className="w-full justify-center mt-12 flex items-center">
                  <button
                    onClick={(e) => TambahKategori(e)}
                    className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setAddBarang(!addBarang)}
                    className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
            <div className="w-[95%] mx-auto mt-6 p-3 bg-white">
              <DataGrid
                className="w-full"
                disableRowSelectionOnClick
                autoHeight
                columns={columns}
                rows={row}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
