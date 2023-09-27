import React, { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../config/base_url";

export default function ModalPengadaanOwner({ open, setOpen, id }) {
  const [data, setData] = useState({
    status: "selesai",
  });
  const updateStatusPengadaan = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_BASE_URL}/api/aksiOwnerPengadaan/${id}`,
        data
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="w-full h-screen  flex items-center left-0 top-0 fixed z-40 bg-[#00000030]">
      <div className="w-[400px]  h-[150px]  mx-auto bg-white p-3 rounded-lg">
        <div className="w-[90%] mx-auto mt-3 my-auto">
          <div className="w-full">
            <select
              // onChange={(e) => (data.status = e.target.value)}
              name="status"
              id=""
              onChange={(e) => {
                console.log(e.target.value);
                setData({ status: e.target.value });
              }}
              className="w-full border-2 border-slate-500"
            >
              <option value="selesai" selected>
                acc
              </option>
              <option value="ditolak">reject</option>
            </select>
            <div className="mx-auto flex justify-center items-center w-full mt-2">
              <button
                onClick={updateStatusPengadaan}
                className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
              >
                Simpan
              </button>
              <button
                onClick={() => setOpen(!open)}
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
