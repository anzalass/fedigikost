import { useEffect, useState } from "react";
import Frame from "../../../assets/Frame.png";
import Frame1 from "../../../assets/Frame(1).png";
import Frame2 from "../../../assets/Frame(2).png";
import Frame3 from "../../../assets/Frame(3).png";
import Frame4 from "../../../assets/Frame(4).png";
import Frame5 from "../../../assets/Frame(5).png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Indikator({
  allRuang,
  allPengadaan,
  allKategori,
  allPemeliharaan,
  allpetugas,
  totalbarang,
  allPemeliharaanowner,
  allPengadaanowner,
}) {
  // const [allRuang, setAllRuang] = useState(0);
  // const [allPengadaan, setAllPengadaan] = useState(0);
  // const [allKategori, setAllKategori] = useState(0);
  // const [allPemeliharaan, setAllPemeliharaan] = useState();
  // useEffect(() => {
  //   fetchData();
  // }, [allRuang, allPengadaan, allKategori, allPemeliharaan]);

  // const fetchData = async () => {
  //   try {
  //     const ruang = await axios.get("${BACKEND_BASE_URL}/api/getRuang");
  //     const pengadaan = await axios.get("${BACKEND_BASE_URL}/api/pengadaan");
  //     const kategori = await axios.get("${BACKEND_BASE_URL}/api/getKategori");
  //     const pemeliharaan = await axios.get(
  //       "${BACKEND_BASE_URL}/api/getPemeliharaan"
  //     );

  //     setAllRuang(ruang.data.total);
  //     setAllPengadaan(pengadaan.data.total);
  //     setAllKategori(kategori.data.total);
  //     setAllPemeliharaan(pemeliharaan.data.total);

  //     // await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const { user, isLogin } = useSelector((state) => state.user);
  return (
    <div className="mt-3 p-3 w-full mx-auto bg-white rounded-lg ">
      <div className=" grid grid-cols-2 gap-4 w-full mx-auto  md:grid-cols-2 lg:grid-cols-4 ">
        <Link to={"/tambah-barang"}>
          <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#36BFFA]">
            <h1 className=" text-white font-[500] text-[20px]">
              {user.role == 1 ? allPengadaanowner : allPengadaan}
            </h1>
            <h1 className=" text-white font-[500] text-[16px]">Pengadaan</h1>
            <img
              src={Frame3}
              className=" absolute  right-0 top-5 h-[80px] z-0"
              alt=""
            />
          </div>
        </Link>

        {user.role == 2 ? (
          <Link to={"/pemeliharaan"}>
            <div className="h-[100px] pl-8 py-2 relative rounded-md w-[100%] bg-[#32D583]">
              <h1 className=" text-white font-[500] text-[30px]">
                {user.role == 1 ? allPemeliharaanowner : allPemeliharaan}
              </h1>
              <h1 className=" text-white font-[500] text-[16px]">
                Pemeliharaan
              </h1>
              <img
                src={Frame5}
                className=" absolute  right-0 top-5 h-[80px] z-0"
                alt=""
              />
            </div>
          </Link>
        ) : (
          <Link to={"/tambah-barang"}>
            <div className=" pl-8 py-2 h-[100px] relative rounded-md w-[100%] bg-[#F04438]">
              <h1 className=" text-white font-[500] text-[30px]">
                {totalbarang}
              </h1>
              <h1 className=" text-white font-[500] text-[16px]">
                Total Barang
              </h1>
              <img
                src={Frame4}
                className=" absolute  right-0 top-5 h-[80px] z-0"
                alt=""
              />
            </div>
          </Link>
        )}
        <Link to={"/data-ruangan"}>
          <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#FDB022]">
            <h1 className=" text-white font-[500] text-[20px]">{allRuang}</h1>
            <h1 className=" text-white font-[500] text-[16px]">Ruangan</h1>
            <img
              src={Frame1}
              className=" absolute  right-0 top-5 h-[80px] z-0"
              alt=""
            />
          </div>
        </Link>
        <Link to={"/tambah-barang"}>
          <div className="h-[100px] pl-3 pt-6 relative rounded-md w-[100%] bg-[#07BEB8]">
            <h1 className=" text-white font-[500] text-[20px]">
              {allKategori}
            </h1>
            <h1 className=" text-white font-[500] text-[16px]">
              Kategori Barang
            </h1>
            <img
              src={Frame2}
              className=" absolute  right-0 top-5 h-[80px] z-0"
              alt=""
            />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 mt-7 gap-3 w-full  md:grid-cols-1 lg:grid-cols-2  ">
        {user.role == 1 ? (
          <Link to={"/pemeliharaan"}>
            <div className="h-[100px] pl-8 py-2 relative rounded-md w-[100%] bg-[#32D583]">
              <h1 className=" text-white font-[500] text-[30px]">
                {allPemeliharaan}
              </h1>
              <h1 className=" text-white font-[500] text-[16px]">
                Pemeliharaan
              </h1>
              <img
                src={Frame5}
                className=" absolute  right-0 top-5 h-[80px] z-0"
                alt=""
              />
            </div>
          </Link>
        ) : null}
        {user.role == 2 ? null : (
          <Link to={"/petugas"}>
            <div className="h-[100px] pl-3 pt-6 relative z-30 rounded-md w-[100%] bg-[#9556CC]">
              <h1 className=" text-white font-[500] text-[20px]">
                {allpetugas}
              </h1>
              <h1 className=" text-white font-[500] text-[16px]">Pegawai</h1>
              <img
                src={Frame}
                className=" absolute  right-0 top-5 h-[80px] z-0"
                alt=""
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
