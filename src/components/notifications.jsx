import axios from "axios";
import { useContext, useState } from "react";
import AdminContext from "./context";
import "./notificationStyle.css";

function Notifications({ notifications, setNotifications }) {
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const isAdmin = useContext(AdminContext);

  const [newNotification, setNewNotification] = useState({
    naslov: "",
    datum: date,
    tekst: "",
    vazno: Boolean(),
  });
  const [inputField, setInputField] = useState(false);

  const not = notifications.map((n) => n);
  const sort = not.sort((a, b) => new Date(b.datum) - new Date(a.datum));

  function inputNotificationData(n) {
    return {
      naslov: n.naslov,
      datum: date,
      tekst: n.tekst,
      vazno: Boolean(n.vazno),
    };
  }

  function handleInputShow() {
    setInputField(true);
  }

  const notificationSubmit = (e) => {
    e.preventDefault();

    const notificationData = inputNotificationData(newNotification);

    axios
      .post("http://localhost:3002/obavijesti", notificationData)
      .then(() => {
        axios
          .get("http://localhost:3002/obavijesti")
          .then((n) => {
            setNotifications(n.data);
          })
          .then(setInputField(false));
        setNewNotification({
          naslov: "",
          datum: "",
          tekst: "",
          vazno: Boolean(),
        });
      });
  };

  const deleteNotification = (e) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notification?"
    );

    if (confirmed) {
      axios.delete(`http://localhost:3002/obavijesti/${e}`).then(() => {
        axios.get("http://localhost:3002/obavijesti").then((n) => {
          setNotifications(n.data);
        });
      });
    }
  };

  const notificationChange = (e) => {
    const { name, value } = e.target;

    setNewNotification({ ...newNotification, [name]: value });
  };

  const notificationChangeCheck = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewNotification({ ...newNotification, [name]: newValue });
  };

  return (
    <div className="not-con">
      <button onClick={handleInputShow}>New notification</button>
      <div className="new-not">
        {inputField ? (
          <form className="form-not" onSubmit={notificationSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="naslov"
                value={newNotification.naslov}
                onChange={notificationChange}
                maxLength={20}
                required
              />
            </label>
            <label>
              Text:
              <input
                type="text"
                name="tekst"
                value={newNotification.tekst}
                onChange={notificationChange}
                minLength={10}
                maxLength={200}
              />
            </label>
            {isAdmin ? (
              <label>
                <input type="checkbox" disabled />
                Important
              </label>
            ) : (
              <label>
                <input
                  type="checkbox"
                  name="vazno"
                  value={newNotification.vazno}
                  onChange={notificationChangeCheck}
                />
                Important
              </label>
            )}
            <button type="submit">Save</button>
          </form>
        ) : (
          <></>
        )}
      </div>
      {sort.map((n) => (
        <div key={n.id} className="notifications">
          {n.vazno ? (
            <div className="not-body">
              <div
                style={{ border: "2px solid #634B66", borderRadius: "15px" }}
              >
                <div className="title-not">
                  <h3>{n.naslov}</h3>
                  <h3>{n.vazno ? <h3>Important!</h3> : <></>}</h3>
                  <h3>{n.datum}</h3>
                </div>
                <p>{n.tekst}</p>
                {isAdmin ? (
                  <></>
                ) : (
                  <button onClick={() => deleteNotification(n.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="not-body">
              <div
                style={{ border: "2px solid #E5FFDE", borderRadius: "15px" }}
              >
                <div className="title-not">
                  <h3>{n.naslov}</h3>
                  <h3></h3>
                  <h3>{n.datum}</h3>
                </div>
                <p>{n.tekst}</p>
                {isAdmin ? (
                  <></>
                ) : (
                  <button onClick={() => deleteNotification(n.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Notifications;
