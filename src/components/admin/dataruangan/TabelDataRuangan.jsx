import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSearch } from "../../../context/searchContext";
import { IoQrCodeSharp } from "react-icons/io5";
import QrCodeModal from "../../../pages/Admin/pengadaanbarang/QrCodeModal";
import { BACKEND_BASE_URL } from "../../../config/base_url";

export default function TabelDataRuangan({
  edit,
  data,
  setEdit,
  setValueEdit,
  setErrRuangan,
}) {
  const [search, setSearch] = useSearch();
  const { user } = useSelector((state) => state.user);
  const nav = useNavigate();
  const [isQr, setIsQR] = useState(false);
  const [value, setValue] = useState(false);
  const OpenEdit = () => {
    setEdit(1);
  };

  console.log("data : ", data);

  const DeleteRuang = async (kodeRuang) => {
    const res = await axios.post(
      `${BACKEND_BASE_URL}/api/deleteRuang/${kodeRuang}`,
      {
        id_pembuat: user.id,
        role_pembuat: user.role,
        nama_pembuat: user?.name,
        tipe: "menghapus ruangan",
        status: "belumdibaca",
        keterangan: `${user.name} menghapus ruangan ${kodeRuang}`,
      }
    );

    if (res.status == 200) {
      window.location.reload();
    }
  };

  const columns = [
    {
      field: "id",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "ID",
      minWidth: 50,
      flex: 0.2,
    },
    {
      field: "ruangan",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "Ruangan",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "barcode",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "Barcode",
      flex: 1,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button
              className="mr-4"
              onClick={() => {
                setIsQR(true);
                setValue(params.id);
              }}
            >
              <IoQrCodeSharp size={20} />
            </button>
          </div>
        );
      },
    },
    {
      field: "aksi",
      headerClassName: "bg-slate-200 text-center font-abc",
      headerName: "Aksi",
      flex: 1,
      minWidth: 150,

      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button
              className="mr-4"
              onClick={() => nav(`/detail-ruangan/${params.id}`)}
            >
              <AiOutlineArrowRight size={20} />
            </button>
            {user?.role == 1 ? (
              <>
                <button className="mr-4" onClick={() => DeleteRuang(params.id)}>
                  <BsTrash3 color="red" size={20} />
                </button>
                <button
                  className="mr-4"
                  onClick={() => {
                    OpenEdit();
                    setValueEdit({
                      kodeRuang: params.id,
                      ruang: params.row.ruangan,
                    });
                    setErrRuangan({ kodeRuang: "", ruang: "" });
                  }}
                >
                  <BiEditAlt color="blue" size={20} />
                </button>
              </>
            ) : null}
          </div>
        );
      },
    },
  ];

  const row = [];
  data
    .filter(
      (item) =>
        search == "" ||
        item.kodeRuang.toLowerCase().includes(search.toLowerCase()) ||
        item.ruang.toLowerCase().includes(search.toLowerCase())
    )
    .forEach((a) => {
      row.push({
        id: a.kodeRuang,
        ruangan: a.ruang,
        // qtybarang: a.qtybarang,
      });
    });

  return (
    <div className="bg-white w-[96%] mt-3 mx-auto p-3 rounded-lg">
      {isQr ? (
        <QrCodeModal open={isQr} setOpen={setIsQR} value={value}></QrCodeModal>
      ) : null}
      <DataGrid
        disableRowSelectionOnClick
        autoHeight
        columns={columns}
        rows={row}
      />
    </div>
  );
}
