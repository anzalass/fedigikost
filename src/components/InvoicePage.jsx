import React, { useState } from "react";
import { useSelector } from "react-redux";
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
      <div className="w-full h-[160vh] flex font-abc">
        <div className={``}>
          <Sidebar setSidebar={3} width={open} setWidth={setOpen} />
        </div>
        <div className={`w-11/12 mx-auto`}>
          <TopBar>{"Invoice Pemeliharaan"}</TopBar>
          <div className="w-[95%] mx-auto">
            <button className="my-2">Print</button>
            <div className="w-full mt-5 mx-auto border-2 h-[50%]" id="innn">
              <h1 className="text-3xl mt-2 mb-4 ml-2">
                Invoice {"Pemeliharaan"}
              </h1>
              <div className="mt-[50px]">
                <h1 className="m-2 ">Tanggal : {"27-Agustus-2023"}</h1>
                <h1 className="m-2">Nama Barang : {"Kipas"}</h1>
              </div>
              <div className="w-full ">
                <div className="mx-auto w-[95%]">
                  <table className="table-auto mb-[100px] mt-[50px] font-abc w-full mx-auto">
                    <thead className=" text-left bg-zinc-200">
                      <tr className="h-[30px] border-b-2">
                        <th className="h-[30px] w-[100px]">
                          ID {"Pemeliharaan"}
                        </th>
                        <th className="w-[50px]">Qty</th>
                        <th>Keterangan</th>
                        <th className="w-[100px]">Biaya</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>ASW223</td>
                        <td>2</td>
                        <td className="w-[500px]">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Laudantium numquam, optio aliquam voluptatem
                        </td>
                        <td>Rp.20000</td>
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
