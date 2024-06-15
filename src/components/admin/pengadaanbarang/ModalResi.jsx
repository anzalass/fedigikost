import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../../config/base_url";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useRender } from "../../../context/rendertablepengadaan";

export default function ModalResi({ open, setOpen, id }) {
  const { user } = useSelector((state) => state.user);
  const [render, setRender] = useRender();
  useEffect(() => {
    console.log("Id Pengadaan : ", id);
  }, [id]);
  const [data, setData] = useState({
    buktiNota: "",
    NoResi: "",
  });

  const [errPengadaan, setErrPengadaan] = useState({
    buktiNota: "",
    NoResi: "",
  });

  const [Img, setImg] = useState();

  const changePengadaanHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const updateResi = async () => {
    Swal.showLoading();
    const datas = new FormData();
    datas.append("file", Img);
    datas.append("upload_preset", "digikostDemoApp");
    datas.append("cloud_name", "dkt6ysk5c");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dkt6ysk5c/image/upload",
        datas,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      data.buktiNota = res.data.secure_url;
      console.log("url", res.data.secure_url);
      await axios.put(`${BACKEND_BASE_URL}/api/UpdateResi/${id}`, {
        buktiNota: res.data.secure_url,
        NoResi: data.NoResi,
        id_pembuat: user?.id,
        nama_pembuat: user?.name,
        role_pembuat: user?.role,
      });
      setRender(true);
      Swal.close();
      setOpen(false);
    } catch (e) {
      alert("rusak");
      console.log(e);
    }
    console.log(Img);
  };

  return (
    <div className="w-full h-screen  flex items-center left-0 top-0 fixed z-40 bg-[#00000030]">
      <div className="w-[400px] mx-auto bg-white p-3 rounded-lg">
        <div className="w-[90%] mx-auto mt-3 my-auto">
          <div className="w-full">
            <h1 className="font-abc font-[500]">Tambah Resi</h1>
            <div className="w-full mt-4">
              {Img ? (
                <div className="w-full ">
                  <img
                    className="w-[50%] mx-auto object-contain"
                    src={URL.createObjectURL(Img)}
                    alt=""
                  />
                </div>
              ) : null}
            </div>
            <div className="w-full">
              <label
                htmlFor="buktiNota"
                className="border-2 border-slate-500 px-2 py-1 text-sm font-abc rounded-md"
              >
                Pilih Foto
              </label>
              <input
                type="file"
                name="buktiNota"
                id="buktiNota"
                onChange={(e) => {
                  setData({
                    ...data,
                    buktiNota: e.target.files[0],
                  });
                  setImg(e.target.files[0]);
                }}
                className="hidden border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
              {errPengadaan?.buktiNota ? (
                <p>{errPengadaan?.buktiNota}</p>
              ) : null}
            </div>
            <div className="w-full mt-3">
              <input
                type="text"
                name="NoResi"
                className="w-full border-2 border-black rounded-md h-[30px] pl-2"
                placeholder="No Resi"
                onChange={(e) => changePengadaanHandler(e)}
              />
              {errPengadaan?.NoResi ? <p>{errPengadaan?.NoResi}</p> : null}
            </div>
            <div className="mx-auto flex justify-center items-center w-full mt-6">
              <button
                onClick={() => updateResi()}
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
