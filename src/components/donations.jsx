import { useContext, useState } from "react";
import axios from "axios";
import AdminContext from "./context";
import "./donationsStlye.css";

function Donations({ donations, setDonations }) {
  const [newDonation, setNewDonations] = useState(false);
  const [inputDonation, setInputDonation] = useState({
    kategorija: "trazi",
    tip: "",
    vrijednost: Number(),
    opis: "",
  });
  const isAdmin = useContext(AdminContext);
  const filterDonated = donations.filter((d) => d.kategorija == "donirano");
  const filterNeeded = donations.filter((d) => d.kategorija == "trazi");
  const filterOffered = donations.filter((d) => d.kategorija == "nudi");

  function inputDataDonation(don) {
    return {
      kategorija: "trazi",
      tip: don.tip,
      vrijednost: Number(don.vrijednost),
      opis: don.opis,
    };
  }

  function handleNewDonation() {
    setNewDonations(true);
  }

  const patchDonationAccept = (e) => {
    axios
      .patch(`http://localhost:3002/donacije/${e}`, {
        kategorija: "donirano",
      })
      .then(() => {
        axios
          .get("http://localhost:3002/donacije")
          .then((d) => setDonations(d.data));
      });
  };

  const patchDonationReset = (e) => {
    axios
      .patch(`http://localhost:3002/donacije/${e}`, {
        kategorija: "trazi",
      })
      .then(() => {
        axios
          .get("http://localhost:3002/donacije")
          .then((d) => setDonations(d.data));
      });
  };

  const deleteDonation = (e) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this donation?"
    );

    if (confirmed) {
      axios.delete(`http://localhost:3002/donacije/${e}`).then(() => {
        axios
          .get("http://localhost:3002/donacije")
          .then((d) => setDonations(d.data));
      });
    }
  };

  const donationSubmit = (e) => {
    e.preventDefault();

    const donationData = inputDataDonation(inputDonation);

    axios.post("http://localhost:3002/donacije", donationData).then(() => {
      axios
        .get("http://localhost:3002/donacije")
        .then((d) => {
          setDonations(d.data);
        })
        .then(setNewDonations(false));
      setInputDonation({
        kategorija: "trazi",
        tip: "",
        vrijednost: "",
        opis: "",
      });
    });
  };

  const donationChange = (e) => {
    const { name, value } = e.target;

    setInputDonation({ ...inputDonation, [name]: value });
  };

  return (
    <div>
      <h1>Donations</h1>
      {isAdmin ? (
        <></>
      ) : (
        <div>
          {newDonation ? (
            <form className="form" onSubmit={donationSubmit}>
              <label>
                Type of the donation:
                <select
                  name="tip"
                  value={inputDonation.tip}
                  onChange={donationChange}
                  required
                >
                  <option value="">Choose type of the donation:</option>
                  <option value="hrana">Food</option>
                  <option value="lijekovi">Medicine</option>
                  <option value="igračke">Toys</option>
                  <option value="veterinarski troškovi">
                    Veterinary expenses
                  </option>
                </select>
              </label>
              <label>
                Amount:
                <input
                  type="number"
                  name="vrijednost"
                  value={inputDonation.vrijednost}
                  onChange={donationChange}
                  placeholder="Amount"
                  required
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="opis"
                  value={inputDonation.opis}
                  onChange={donationChange}
                  placeholder="Description"
                />
              </label>
              <button type="submit">Submit Donation</button>
            </form>
          ) : (
            <button className="btn-don" onClick={handleNewDonation}>
              Nova donacija
            </button>
          )}
        </div>
      )}
      {filterDonated.map((d) => (
        <div key={d.id} className="donations">
          <table className="table">
            <thead>
              <h2>Donated:</h2>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{d.tip}</td>
                <td>{d.vrijednost}</td>
                <td>{d.opis}</td>
                <td>
                  {isAdmin ? (
                    <>
                      <button
                        style={{ color: "gray", pointerEvents: "none" }}
                        isDisabled
                      >
                        Ask again
                      </button>{" "}
                      <button style={{ color: "gray", pointerEvents: "none" }}>
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => patchDonationReset(d.id)}>
                        Ask again
                      </button>{" "}
                      <button onClick={() => deleteDonation(d.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      {filterNeeded.map((d) => (
        <div key={d.id} className="donations">
          <table className="table">
            <thead>
              <h2>Needed:</h2>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{d.tip}</td>
                <td>{d.vrijednost}</td>
                <td>{d.opis}</td>
                <td>
                  {isAdmin ? (
                    <>
                      <button
                        style={{ color: "gray", pointerEvents: "none" }}
                        isDisabled
                      >
                        Donated
                      </button>{" "}
                      <button style={{ color: "gray", pointerEvents: "none" }}>
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => patchDonationAccept(d.id)}>
                        Donated
                      </button>{" "}
                      <button onClick={() => deleteDonation(d.id)}>
                        Delete
                      </button>
                    </>
                  )}
                  <button onClick={() => patchDonationAccept(d.id)}>
                    Donate
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      {filterOffered.map((d) => (
        <div key={d.id} className="donations">
          <table className="table">
            <thead>
              <h2>Offered:</h2>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{d.tip}</td>
                <td>{d.vrijednost}</td>
                <td>{d.opis}</td>
                <td>
                  {isAdmin ? (
                    <>
                      <button
                        style={{ color: "gray", pointerEvents: "none" }}
                        isDisabled
                      >
                        Accept
                      </button>{" "}
                    </>
                  ) : (
                    <>
                      <button onClick={() => patchDonationAccept(d.id)}>
                        Accept
                      </button>{" "}
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Donations;
