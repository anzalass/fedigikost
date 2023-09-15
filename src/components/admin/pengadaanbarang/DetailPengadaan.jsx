import React from "react";
import QRCode from "react-qr-code";

export default function DetailPengadaan({ open, setOpen, value }) {
    return (
        <div className="w-full fixed left-0 top-0 h-screen bg-[#00000030] z-40">
            <div className="h-[500px] relative  mx-auto w-[800px] mt-[80px] bg-white">
                <button
                    onClick={() => setOpen(!open)}
                    className="font-abc text-xl absolute right-3 font-[600]"
                >
                    X
                </button>
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={value}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </div>
        </div>
    );
}
