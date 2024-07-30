import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../../config/base_url";
import { useRender } from "../../../context/rendertablepengadaan";
import { useSelector } from "react-redux";

export default function ModalAccPengadaan({ open, setOpen, id }) {
  const { user } = useSelector((state) => state.user);
  const [render, setRender] = useRender();
  useEffect(() => {
    getDataOnChangeId();
  }, [id]);

  const [status, setStatus] = useState("");
  const getDataOnChangeId = async () => {
    const res = await axios.get(`${BACKEND_BASE_URL}/api/findPengadaan/${id}`);

    if (res.status == 200) {
      setStatus(res.data.results.status);
    }
  };

  const editStatus = async () => {
    setRender(false);
    try {
      const res = await axios.put(
        `${BACKEND_BASE_URL}/api/updateStatusPengadaan/${id}`,
        {
          status: status,
          id_pembuat: user?.id,
          role_pembuat: user?.role,
          nama_pembuat: user?.name,
        }
      );

      if (res.status == 200) {
        // window.location.reload();
        setRender(true);
        setOpen(false);
      }
    } catch (e) {
      console.log("error : ", e);
    }
  };

  return (
    <div className="w-full h-screen  flex items-center left-0 top-0 fixed z-40 bg-[#00000030]">
      <div className="w-[400px] mx-auto bg-white p-3 rounded-lg">
        <div className="w-[90%] mx-auto mt-3 my-auto">
          <div className="w-full">
            <h1>Edit Status Pengadaan</h1>

            <select
              onChange={(e) => setStatus(e.target.value)}
              name=""
              id=""
              value={status}
              className="w-full border-2 border-slate-500"
            >
              {status == "selesai" ? (
                <>
                  <option value="pending">pending</option>
                  <option value="disetujui">disetujui</option>
                  <option value="ditolak">ditolak</option>
                  <option value="selesai" selected>
                    selesai
                  </option>
                </>
              ) : status == "pending" ? (
                <>
                  <option value="pending" selected>
                    pending
                  </option>
                  <option value="disetujui">disetujui</option>

                  <option value="ditolak">ditolak</option>
                  <option value="selesai">selesai</option>
                </>
              ) : status == "disetujui" ? (
                <>
                  <option value="pending">pending</option>
                  <option value="disetujui" selected>
                    disetujui
                  </option>
                  <option value="ditolak">ditolak</option>
                  <option value="selesai">selesai</option>
                </>
              ) : (
                <>
                  <option value="pending">pending</option>
                  <option value="disetujui">disetujui</option>
                  <option value="ditolak" selected>
                    ditolak
                  </option>
                  <option value="selesai">selesai</option>
                </>
              )}
            </select>
            <div className="mx-auto flex justify-center items-center w-full mt-2">
              <button
                onClick={() => editStatus()}
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
