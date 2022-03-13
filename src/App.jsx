import { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import { Room, QrCode2, Autorenew } from "@mui/icons-material";
// import jwt_decode from "jwt-decode";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import UserBar from "./components/UserBar/UserBar";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

import "./App.css";

function App() {
  const { user } = useContext(AuthContext);
  const [currentPinId, setCurrentPinId] = useState(null);
  const [pins, setPins] = useState([]);
  const userData = JSON.parse(user);

  const [viewport, setViewport] = useState({
    latitude: 61.49632,
    longitude: 23.77672,
    zoom: 13,
  });

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUserBar, setShowUserBar] = useState(false);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  useEffect(() => {
    if (user) {
      setShowLogin(false);
    }
  }, [user]);

  useEffect(() => {
    if (showRegister) {
      setShowLogin(false);
    }
  }, [showRegister]);

  useEffect(() => {
    if (showLogin) {
      setShowRegister(false);
    }
  }, [showLogin]);

  const handleLogout = () => {
    localStorage.setItem("user", null);
    window.location.reload(true);
  };

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPinId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        width="100%"
        height="100%"
        // transitionDuration="100"
        mapStyle="mapbox://styles/pranavp22810/cl0nfutx3002g14mqxibbcmnc"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {pins.map((p) => (
          <div>
            <Marker
              latitude={p.latitude}
              longitude={p.longitude}
              color="red"
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                className="room"
                style={{
                  fontSize: viewport.zoom * 7,
                }}
                onClick={() =>
                  handleMarkerClick(p._id, p.latitude, p.longitude)
                }
              />
            </Marker>

            {p._id === currentPinId && (
              <Popup
                key={p._id}
                latitude={p.latitude}
                longitude={p.longitude}
                closeButton={true}
                closeOnClick={false}
                anchor="right"
                onClose={() => setCurrentPinId(null)}
                dynamicPosition={false}
              >
                <div className="card">
                  <label className="label">Store Name</label>
                  <h4 className="storename">{p.storename}</h4>
                  <label className="label">Store Address</label>
                  <h4 className="storename">{p.address}</h4>
                </div>
              </Popup>
            )}
          </div>
        ))}
        {user ? (
          <>
            <button className="button logoF">
              <Autorenew className="logoIconF" />
              <span className="logoIconF">FleaGo</span>
            </button>
            <button className="button logout" onClick={() => handleLogout()}>
              Log out
            </button>
            <button className="name" onClick={() => setShowUserBar(true)}>
              <QrCode2 className="iconqr" />
            </button>
          </>
        ) : (
          <>
            <button className="button logoF">
              <Autorenew className="logoIconF" />
              <span className="logoIconF">FleaGo</span>
            </button>
            <div className="buttons">
              <button
                className="button login"
                onClick={() => setShowLogin(true)}
              >
                Log in
              </button>
              <button
                className="button register"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </div>
          </>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && <Login setShowLogin={setShowLogin} />}
        {showUserBar && (
          <UserBar
            setShowUserBar={setShowUserBar}
            username={userData.username}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
