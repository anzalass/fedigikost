import axios from "axios";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { BACKEND_BASE_URL, BASE_URL } from "../../../config/base_url";
import { useParams } from "react-router-dom";

export default function PrintQRCodePengadaan() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    FetchData();
  });

  useEffect(() => {
    if (data.length != 0) {
      window.print();
    }
  }, [data]);
  const FetchData = async () => {
    const res = await axios.get(`${BACKEND_BASE_URL}/api/findPengadaan/${id}`);
    setData(res.data.results);
  };
  return (
    <div className="w-[90%] mx-auto text-center mt-10 ">
      <QRCode
        size={400}
        className="w-full pt-7"
        value={`${BASE_URL}detail-pengadaan/${id}`}
        viewBox={`0 0 256 256`}
      />
      <h6>Kode Barang : {data?.kodeBarang}</h6>
      <h6>Nama Barang : {data?.namaBarang + " " + data?.merek}</h6>
      <h3 className="font-abc mx-auto mt-5 text-xl w-[50%] border-2 border-slate-600 rounded-lg ">
        Scan Here
      </h3>
    </div>
  );
}
