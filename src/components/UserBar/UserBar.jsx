import { Cancel, Autorenew } from "@mui/icons-material";
import axios from "axios";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";

import "./UserBar.css";

export default function UserBar({ setShowUserBar, username }) {
  return (
    <div className="barContainer">
      <div className="logo">
        <span>10,000 points ~ 10%</span>
      </div>
      <div>
        <QRCode value={username} size={200} />
        <div>{username}</div>
      </div>
      <Cancel className="barCancel" onClick={() => setShowUserBar(false)} />
    </div>
  );
}
