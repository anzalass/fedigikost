import { useEffect, useState } from "react";
import car from "../../../assets/img_car.png";
import PropTypes from "prop-types";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../config/base_url";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
NotifiikasiAdmin.propTypes = {
  data: PropTypes.array.isRequired,
};

export default function NotifiikasiAdmin({ data, openNotif, setOpenNotif }) {
  // const [getData, setGetData] = useState([]);
  // useEffect(() => {
  //   setGetData(data);
  //   console.log("parsing data : ", data);
  // }, [data]);
  const { user } = useSelector((state) => state.user);
  const nav = useNavigate();
  const ClickNotifikasi = (id, url) => {
    axios
      .delete(`${BACKEND_BASE_URL}/api/deletenotifikasibyid/${id}`)
      .then((response) => {
        const panjagarray = url.length;
        // const parts = url.split("/"); // Memisahkan URL berdasarkan karakter "/"
        // const lastPart = parts[parts.length - 1]; // Mendapatkan bagian terakhir dari array hasil
        // const secondLastPart = parts[parts.length - 2]; // Output: "/detail-ruangan/RUU11"
        // console.log(lastPart, secondLastPart);
        const urli = url.slice(21, panjagarray);
        // console.log(urli);
        nav(urli);
      });
  };

  console.log(data);

  return (
    <div className="bg-white  p-2 shadow-xl relative">
      <h1 className="absolute right-3" onClick={() => setOpenNotif(false)}>
        X
      </h1>
      <div className="p-3">
        <h1 className="font-abc  font-[500] text-xl">Notifikasi</h1>
        <hr className="mt-2" />
      </div>
      <div className="mt-4 h-auto overflow-y-auto">
        {data?.map((item, i) => {
          return (
            <div
              onClick={() => ClickNotifikasi(item.id, item.url)}
              className={`w-[300px] h-[60px] mb-2 cursor-pointer bg-zinc-100 shadow-lg rounded-md p-3 ${
                item.id_pembuat == user?.id ? "hidden" : "block"
              }  `}
              key={i}
            >
              <h1 className="text-sm font-[500]">
                {item.role_pembuat == 1
                  ? "Owner"
                  : item.role_pembuat == 2
                  ? "Admin"
                  : null}{" "}
                {item.nama_pembuat}
              </h1>
              <p className="text-[10px]">
                {item.keterangan.length > 30
                  ? item.keterangan.slice(0, 50) + "..."
                  : item.keterangan}
              </p>
              <p></p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
