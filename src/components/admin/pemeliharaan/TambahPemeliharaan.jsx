import React from "react";

export default function TambahPengeluaran({ setClose, close }) {
  return (
    <div className="w-[95%] mx-auto bg-white h-screen p-4">
      <div className="w-full">
        <h1 className="font-abc font-[500]">Tambah Pemeliharaan</h1>
        <select
          name=""
          id=""
          className="w-full border-2 h-[40px] border-slate-500 rounded-md"
        >
          <option value="">Kulkas</option>
          <option value="">AC</option>
          <option value="">TV</option>
          <option value="">Kipas</option>
        </select>
      </div>
      <div className="w-full mt-6">
        <h1 className="font-abc font-[500]">Merek Barang</h1>
        <input
          type="text"
          className="w-full h-[40px] border-2 border-slate-500 rounded-md"
        />
      </div>
      <div className="w-full mt-6">
        <h1 className="font-abc font-[500]">Tanggal Pemeliharaan</h1>
        <input
          type="text"
          className="w-full h-[40px] border-2 border-slate-500 rounded-md"
        />
      </div>
      <div className="w-full mt-6">
        <h1 className="font-abc font-[500]">Lokasi Barang</h1>
        <input
          type="text"
          className="w-full h-[40px] border-2 border-slate-500 rounded-md"
        />
      </div>
      <div className="w-full mt-6">
        <h1 className="font-abc font-[500]">Keterangan</h1>
        <textarea
          name=""
          id=""
          rows="2"
          className="border-2 w-full border-slate-500"
        ></textarea>
      </div>
      <div className="w-full mt-6">
        <h1 className="font-abc font-[500]">Biaya</h1>
        <input
          type="text"
          className="w-full h-[40px] border-2 border-slate-500 rounded-md"
        />
      </div>
      <div className="w-full mt-6 justify-center mb-7 flex items-center">
        <button className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
          Simpan
        </button>
        <button
          onClick={() => setClose(close)}
          className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
        >
          Batal
        </button>
      </div>
    </div>
  );
}
