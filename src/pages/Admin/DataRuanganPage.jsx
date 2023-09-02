import { useEffect, useState } from "react";
import TabelDataRuangan from "../../components/admin/dataruangan/TabelDataRuangan";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";
import axios from "axios";

export default function DataRuanganPage() {
  const [addRuangan, setaddRuangan] = useState(0);
  const [editRuangan, setEditRuangan] = useState(0);
  const [open, setOpen] = useState(false);
  const [dataRuangan, setDataRuangan] = useState([]);

  useEffect(() => {
    getAllRuangan();
  }, [])

  const getAllRuangan = async () => {
    try {
      const ruang = await axios.get("http://127.0.0.1:8000/api/getRuang");
      console.log(ruang);
      setDataRuangan(ruang.data.results);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds
    } catch (err) {
      console.log(err);
    }
  }

  const [dataRuang, setDataRuang] = useState({
    kodeRuang: "",
    ruang: ""
  })

  const changeRuangHandler = (e) => {
    setDataRuang({
      ...dataRuang,
      [e.target.name]: e.target.value,
    });
  }

  const tambahRuang = async () => {
    const add = await axios.post("http://127.0.0.1:8000/api/tambahRuang", dataRuang);

    if (add.status === 200) {
      window.alert("nambah");
      // window.location.reload();
    }
  }

  return (
    <div className="w-full h-[160vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        <Sidebar setSidebar={4} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBar>{"Data Ruangan"}</TopBar>
        <div className="w-full mt-2 h-[50px] mx-auto ">
          <div className="w-[95%] h-[80px] justify-between flex mx-auto">
            <div className="">
              <button
                onClick={() => setaddRuangan(1)}
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
          {addRuangan === 0 && editRuangan === 0 ? (
            <TabelDataRuangan edit={setEditRuangan} data={dataRuangan} />
          ) : null}
          {addRuangan === 1 ? (
            <div className="w-[95%] mx-auto h-[90vh] bg-white rounded-xl">
              <div action="" className="w-[95%] mx-auto mt-6 p-3">
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Kode</h1>
                  <input
                    type="text"
                    name="idRuang"
                    onChange={e => changeRuangHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Nama Ruangan</h1>
                  <input
                    type="text"
                    name="namaRuang"
                    onChange={e => changeRuangHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>

                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Keterangan</h1>
                  <input
                    type="text"
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Quantity</h1>
                  <input
                    type="text"
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full justify-center mt-12 flex items-center">
                  <button onClick={() => tambahRuang()} className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
                    Simpan
                  </button>
                  <button
                    onClick={() => setaddRuangan(0)}
                    className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {editRuangan === 1 ? (
            <div className="w-[95%] mx-auto h-[90vh] bg-white rounded-xl">
              <form action="" className="w-[95%] mx-auto mt-6 p-3">
                <h1>Edit Ruangan</h1>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Kode</h1>
                  <input
                    type="text"
                    name="idRuang"
                    onChange={e => changeRuangHandler(e)}
                    disabled
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Nama Ruangan</h1>
                  <input
                    type="text"
                    name="namaRuang"
                    onChange={e => changeRuangHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>

                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Keterangan</h1>
                  <input
                    type="text"
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Quantity</h1>
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
                    onClick={() => setEditRuangan(0)}
                    className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
