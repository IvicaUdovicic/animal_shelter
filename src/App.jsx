import { useEffect, useState } from "react";
import "./App.css";
import About from "./components/about";
import Donations from "./components/donations";
import Input from "./components/input";
import List from "./components/list";
import Notifications from "./components/notifications";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import AdminContext from "./components/context";
import Checkbox from "./components/checkbox";
import axios from "axios";

function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [donations, setDonations] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/zivotinje")
      .then((anim) => setAnimals(anim.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3002/donacije")
      .then((don) => setDonations(don.data));
  }, []);

  useEffect(() => {
    axios
      .get("  http://localhost:3002/obavijesti")
      .then((not) => setNotifications(not.data));
  }, []);

  function adminPrivilege() {
    setIsAdmin(!isAdmin);
  }

  return (
    <div>
      <AdminContext.Provider value={isAdmin}>
        <Checkbox onChange={adminPrivilege} />
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route
              path="/list"
              element={<List animals={animals} setAnimals={setAnimals} />}
            />
            <Route
              path="/donations"
              element={
                <Donations donations={donations} setDonations={setDonations} />
              }
            />
            <Route
              path="/notifications"
              element={
                <Notifications
                  setNotifications={setNotifications}
                  notifications={notifications}
                />
              }
            />
            <Route path="/input" element={<Input setAnimals={setAnimals} />} />
          </Routes>
        </div>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
