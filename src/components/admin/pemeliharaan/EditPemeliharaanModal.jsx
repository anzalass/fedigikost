import React from "react";

export default function EditPemeliharaanModal({ open, setOpen }) {
  return (
    <div className="w-full h-screen  flex items-center left-0 top-0 fixed z-40 bg-[#00000030]">
      <div className="w-[400px]  mx-auto bg-white p-3 rounded-lg">
        <div className="w-[90%] mx-auto mt-3 my-auto pb-3">
          <div className="w-full">
            <h1 className="font-abc">Edit Detail Maintenence</h1>
            <div className="">
              <h1>Quantity Barang</h1>
              <input
                type="number"
                name="jumlah"
                // value={dataBarang.jumlah}
                // onChange={(e) => handleChange(e)}
                className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
              />
              <h1>Keterangan Barang</h1>
              <input
                type="text"
                name="jumlah"
                // value={dataBarang.jumlah}
                // onChange={(e) => handleChange(e)}
                className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
              />
              <h1>Harga Maintenence</h1>
              <input
                type="number"
                name="jumlah"
                // value={dataBarang.jumlah}
                // onChange={(e) => handleChange(e)}
                className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
              />
            </div>
            <div className="mx-auto flex justify-center items-center w-full mt-2">
              <button
                // onClick={updateStatus}
                className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
              >
                Simpan
              </button>
              <button
                onClick={() => setOpen(false)}
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
