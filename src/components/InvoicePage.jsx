import React, { useState } from "react";
import { useSelector } from "react-redux";
import SidebarOwner from "./layoutowner/SidebarOwner";
import Sidebar from "./layout/Sidebar";
import TopBar from "./layout/TopBar";

export default function InvoicePage() {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const printInvoice = () => {
    const invoice = document.getElementById("innn");
    window.print();
  };

  return (
    <div>
      <div className="w-full h-[160vh] flex">
        <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
          {user?.role === 1 ? (
            <SidebarOwner setSidebar={3} width={open} setWidth={setOpen} />
          ) : (
            <Sidebar setSidebar={3} width={open} setWidth={setOpen} />
          )}
        </div>
        <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
          <TopBar>{"Invoice Pemeliharaan"}</TopBar>
          <div className="w-[95%] mx-auto">
            <button className="my-2">Print</button>
            <div className="w-[95%] mt-5 mx-auto border-2 h-[50%]" id="innn">
              <h1>Invoice {"Pemeliharaan"}</h1>
              <div className="">
                <h1>Tanggal {"27-Agustus-2023"}</h1>
                <h1>Nama Barang{"Kipas"}</h1>
              </div>
              <div className="w-full ">
                <div className="mx-auto w-[95%]">
                  <table className="table-auto w-full mx-auto">
                    <thead className=" text-left">
                      <tr className="h-[30px]">
                        <th>ID {"Pemeliharaan"}</th>
                        <th>Qty</th>
                        <th>Keterangan</th>
                        <th>Biaya</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Malcolm Lockyer</td>
                        <td>1961</td>
                      </tr>
                      <tr>
                        <td>Witchy Woman</td>
                        <td>The Eagles</td>
                        <td>1972</td>
                      </tr>
                      <tr>
                        <td>Shining Star</td>
                        <td>Earth, Wind, and Fire</td>
                        <td>1975</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
