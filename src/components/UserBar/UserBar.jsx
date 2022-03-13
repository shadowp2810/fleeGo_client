import { Cancel, Autorenew } from "@mui/icons-material";
import axios from "axios";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";

import "./UserBar.css";

export default function UserBar({ setShowUserBar, username }) {
  return (
    <div className="barContainer">
      <div className="logo">
        <Autorenew className="logoIcon" />
        <span>FleeGo</span>
      </div>
      <div>
        <QRCode value={username} size={200} />
        <div>{username}</div>
      </div>
      <Cancel className="barCancel" onClick={() => setShowUserBar(false)} />
    </div>
  );
}
