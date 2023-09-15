import axios from "axios";
import React, { useEffect } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TopBar({ userSession, children }) {
  console.log("user session name : ", userSession);


  useEffect(() => {
    // Add a delay of 1000 milliseconds (1 second) before checking userSession
    const delay = 2400;

    const timer = setTimeout(() => {
      if (userSession.id == undefined) {
        window.location.href = "/login";
      }
    }, delay);

    // Clear the timer if the component unmounts or userSession changes
    return () => clearTimeout(timer);
  }, [userSession]);


  const logout = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (res) {
        localStorage.removeItem('token');
        window.location.reload();
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <div className="w-full h-[80px] flex p-6 justify-between">
        <div className="w-[50%] text-[25px] font-abc font-[500]">
          {children}
        </div>
        <div className="w-[50% flex">
          <div className="mr-5">
            <BsFillBellFill size={25} />
          </div>
          <div className="flex">
            <FaUserCircle size={25} />
            <h1 className="ml-2 font-abc font-[500]">{userSession.name}</h1>
          </div>
          <div>
            <button onClick={logout}>test</button>
          </div>
        </div>
      </div>
      <div className="w-[95%] opacity-25 mx-auto mt-0 h-[1px] bg-slate-600"></div>
    </div>
  );
}
