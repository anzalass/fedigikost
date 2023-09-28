import { useState } from "react";
import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

export default function DataRuanganOwnerPage(userSession) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataRuangan, setDataRuangan] = useState([]);
  useEffect(() => {
    console.log("loading : ", loading);
  }, [loading]);
  const nav = useNavigate();

  const OpenEdit = () => {
    // setEdit(1);
  };

  // console.log("data : ", data);

  const DeleteRuang = async (kodeRuang) => {
    const res = await axios.delete(
      `http://127.0.0.1:8000/api/deleteRuang/${kodeRuang}`
    );

    if (res.status == 200) {
      window.location.reload();
    }
  };

  useEffect(() => {
    getAllRuangan();
  }, []);

  const getAllRuangan = async () => {
    try {
      const ruang = await axios.get(`http://localhost:8000/api/getRuang`);
      console.log(ruang);
      setDataRuangan(ruang.data.results);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.2 },
    { field: "ruangan", headerName: "Ruangan", minWidth: 100, flex: 0.7 },
    ,
    {
      field: "aksi",
      headerName: "Aksi",
      flex: 1,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button
              className="mr-4"
              onClick={() => nav(`/owner/detail-ruangan/${params.id}`)}
            >
              <AiOutlineArrowRight size={20} />
            </button>
            <button className="mr-4" onClick={() => DeleteRuang(params.id)}>
              <BsTrash3 color="red" size={20} />
            </button>
            <button className="mr-4" onClick={() => nav("/owner/edit-ruangan")}>
              <BiEditAlt color="blue" size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const row = [];
  dataRuangan.forEach((a) => {
    row.push({
      id: a.kodeRuang,
      ruangan: a.ruang,
      // qtybarang: a.qtybarang,
    });
  });

  return (
    <div className="w-full h-[160vh] flex">
      <div className={` `}>
        <SidebarOwner setSidebar={4} width={open} setWidth={setOpen} />
      </div>
      <div className={`w-11/12 mx-auto `}>
        <TopBarOwner>{"Data Ruangan"}</TopBarOwner>
        <div className="w-full">
          <div className="w-[95%] h-[80px] justify-between flex mx-auto">
            <div className="">
              <button
                onClick={() => nav("/owner/tambah-ruangan")}
                className="bg-[#7B2CBF] mt-5 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
              >
                Tambah Ruangan
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
          <div className="w-[90%] mx-auto">
            <DataGrid
              rows={row}
              columns={columns}
              disableRowSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      </div>
    </div>
  );
}
