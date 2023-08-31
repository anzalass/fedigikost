import React from "react";

export default function EditBarang({ close, setClose, idBarang }) {
  return (
    <div className="bg-white w-[96%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
      <div className="bg-white w-[96%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
        <div className="w-[95%] mx-auto h-[130vh] bg-white rounded-xl">
          <h1 className="font-abc text-xl">Edit Barang</h1>
          <div action="" className="w-[95%] mx-auto mt-2 p-3">
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2 ">Tanggal Pengadaan</h1>
              <input
                type="date"
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2 ">Kategori</h1>
              <select
                name=""
                id=""
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              >
                <option value="">kulkas</option>
                <option value="">kulkas</option>
                <option value="">kulkas</option>
                <option value="">kulkas</option>
              </select>
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Merek Barang</h1>
              <input
                type="text"
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Resi Barang</h1>
              <input
                type="text"
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Foto Nota Pembelian</h1>
              <input
                type="text"
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            {/* <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Alamat</h1>
              <textarea
                name=""
                id=""
                rows="3"
                className="w-full p-3 border-2 border-slate-500"
              ></textarea>
            </div> */}
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Spesifikasi Barang</h1>
              <input
                type="text"
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Lokasi Barang</h1>
              <input
                type="text"
                list="cars"
                className="w-full border-2 border-slate-500"
              />
              <datalist id="cars">
                <option>Volvo</option>
                <option>Saab</option>
                <option>Mercedes</option>
                <option>Audi</option>
              </datalist>
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Quantitas Barang</h1>
              <input
                type="text"
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Harga</h1>
              <input
                type="text"
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Total Harga</h1>
              <input
                type="text"
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>

            {/* <div className="w-full mt-4">
              <label
                htmlFor="ktp"
                className="h-[20px] w-[50px] text-[13px] font-abc rounded-lg p-2 bg-[#E3E8EF]"
              >
                Upload KTP
              </label>
              <input type="file" id="ktp" name="ktp" className="hidden" />
            </div> */}
            <div className="w-full justify-center mt-12 mb-12 flex items-center">
              <button className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
                Simpan
              </button>
              <button
                onClick={() => setClose(!close)}
                className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
