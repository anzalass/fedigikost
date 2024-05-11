import { useEffect, useState } from "react";
import car from "../../../assets/img_car.png";

export default function NotifiikasiAdmin({ data }) {
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    setGetData(data);
    console.log("parsing data : ", data);
  }, [data]);

  return (
    <div className="xl:w-[25%] lg:w-[25%] w-full xl:right-44 lg:right-44 xl:top-12 top-12 lg:top-12 right-0 absolute p-2 bg-white shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] z-40 rounded-lg">
      <div className="p-3">
        <h1 className="font-abc  font-[500] text-2xl">Notifikasi</h1>
        <hr className="mt-2" />
      </div>
      <div className="mt-4">
        {getData.map((item, i) => {
          return (
            <div className="flex w-full mb-2" key={i}>
              <div className="w-[20%] mt-3 ">
                <img src={car} className="object-cover rounded-full" alt="" />
              </div>
              <div className="w-[70%] ml-4">
                <h1 className="font-abc">{item.keterangan}</h1>
                <h3 className="font-abc text-[13px] italic">Adil Laksono</h3>
                <p className="font-abc text-[13px] text-sky-600">
                  20 Agustus 2023
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
