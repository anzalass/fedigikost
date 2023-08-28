import Sidebar from "../../components/layout/Sidebar.jsx";
import TopBar from "../../components/layout/TopBar.jsx";
import TableTambahBarang from "../../components/admin/pengadaanbarang/TabelBarang.jsx";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

export default function TambahBarangPage() {
  const [addBarang, setAddBarang] = useState(false);

  const data = [
    {
      id: 1112233,
      nama_barang: "Kulkas",
    },
    {
      id: 1112233,
      nama_barang: "TV",
    },
    {
      id: 1112233,
      nama_barang: "Kulkas",
    },
    {
      id: 1112233,
      nama_barang: "Kulkas",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.5 },

    {
      field: "nama_barang",
      headerName: "Nama Barang",
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
      id: a.id,

      nama_barang: a.nama_barang,
    });
  });

  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-[16%]">
        <Sidebar setSidebar={2} />
      </div>
      <div className="w-[84%]">
        <TopBar>{"Pengadaan Barang"}</TopBar>
        <div className="w-[95%] h-[80px] justify-between flex mx-auto">
          <div className="">
            <button
              onClick={() => setAddBarang(!addBarang)}
              className="bg-[#7B2CBF] mt-5 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
            >
              Kategori Barang
            </button>
          </div>
          <div className=" mt-5 px-3 py-1 w-[200px] h-[40px] rounded-md  font-abc">
            <input
              type="text"
              className="w-full h-full pl-2 rounded-lg"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="w-[95%] opacity-25 mx-auto mt-0 h-[1px] bg-slate-600"></div>

        {!addBarang ? <TableTambahBarang /> : null}

        {addBarang ? (
          <div className="w-[95%] mx-auto h-[105vh] bg-white rounded-xl">
            <form action="" className="w-[95%] mx-auto mt-6 p-3">
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2 ">Kode Barang</h1>
                <input
                  type="text"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Nama Barang</h1>
                <input
                  type="text"
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>

              <div className="w-full justify-center mt-12 flex items-center">
                <button className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
                  Simpan
                </button>
                <button
                  onClick={() => setAddBarang(!addBarang)}
                  className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                >
                  Batal
                </button>
              </div>
            </form>
            <div className="w-[95%] mx-auto mt-6 p-3 bg-white">
              <h1>Test</h1>
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
