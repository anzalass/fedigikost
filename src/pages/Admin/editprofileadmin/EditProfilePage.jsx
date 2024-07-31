import React, { useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { Link, useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  return <div className="w-11/12 mx-auto h-[160vh] "></div>;
}
