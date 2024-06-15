import React from "react";
import QRCode from "react-qr-code";
import { BASE_URL } from "../../../config/base_url";

export default function QrCodeModal({ open, setOpen, value }) {
  const printModal = () => {
    window.print();
  };
  return (
    <div className="w-full fixed left-0 top-0 h-screen bg-[#00000030] z-40 justify-center items-center flex ">
      <div className="w-full fixed left-0 top-0 h-screen bg-[#00000030] z-40">
        <div className="h-[75%] relative  mx-auto w-[40%] mt-[80px] bg-white rounded-lg">
          <button
            onClick={() => setOpen(!open)}
            className="font-abc text-xl absolute right-3 font-[600]"
          >
            X
          </button>
          <div className="w-[90%] mx-auto text-center mt-10 ">
            {value ? (
              <QRCode
                size={400}
                className="w-full pt-7"
                value={`${BASE_URL}detail-ruangan/${value}`}
                viewBox={`0 0 256 256`}
              />
            ) : null}
            <div className="mx-auto flex justify-center items-center w-full mt-6">
              <button
                onClick={() =>
                  (window.location.href = `${BASE_URL}printQRRuangan/${value}`)
                }
                className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
              >
                Print Barcode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
