import { useState } from "react";
import axios from "axios";
import "./formStyle.css";

function Input({ setAnimals }) {
  const [inputForm, setInputForm] = useState({
    ime: "",
    vrsta: "",
    godine: "",
    cip: Boolean(),
    udomljen: Boolean(),
    pregled: "",
    opis: "",
  });

  function inputProcess(anima) {
    return {
      ime: anima.ime,
      vrsta: anima.vrsta,
      godine: anima.godine,
      cip: Boolean(anima.cip),
      udomljen: Boolean(anima.udomljen),
      pregled: anima.pregled,
      opis: anima.opis,
      slika: anima.slika,
    };
  }

  const formSubmit = (e) => {
    e.preventDefault();

    const inputData = inputProcess(inputForm);

    axios.post("http://localhost:3002/zivotinje", inputData).then((a) => {
      axios.get("http://localhost:3002/zivotinje").then((a) => {
        setAnimals(a.data);
      });
    });

    setInputForm({
      ime: "",
      vrsta: "",
      godine: "",
      cip: Boolean(),
      udomljen: Boolean(),
      pregled: "",
      opis: "",
      slika: "",
    });
  };

  const itemChange = (e) => {
    const { name, value } = e.target;

    setInputForm({ ...inputForm, [name]: value });
  };

  const itemChangeCheck = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setInputForm({ ...inputForm, [name]: newValue });
  };

  return (
    <form className="form-body" onSubmit={formSubmit}>
      <h2>New animal input</h2>
      <div className="form">
        <div className="input-name">
          <label>
            Name:{" "}
            <input
              type="text"
              name="ime"
              value={inputForm.ime}
              onChange={itemChange}
              placeholder="Name"
              required
            />
          </label>
        </div>
        <div className="input-type">
          <label>
            Type:
            <select
              name="vrsta"
              value={inputForm.vrsta}
              onChange={itemChange}
              required
            >
              <option value="">Choose type:</option>
              <option value="pas">Dog</option>
              <option value="macka">Cat</option>
              <option value="ostalo">Other</option>
            </select>
          </label>
        </div>
        <div className="input-year">
          <label>
            Age:
            <input
              type="number"
              name="godine"
              value={inputForm.godine}
              onChange={itemChange}
              required
              placeholder="Age"
            />
          </label>
        </div>
        <div className="input-check">
          <label>
            Chipped
            <input
              type="checkbox"
              name="udomljen"
              value={inputForm.cip}
              style={{ margin: "10px" }}
              onChange={itemChangeCheck}
            />
          </label>
          <label>
            Adopted
            <input
              type="checkbox"
              name="udomljen"
              value={inputForm.udomljen}
              style={{ margin: "10px" }}
              onChange={itemChangeCheck}
            />
          </label>
          <label className="input-pregled">
            Examination:
            <input
              type="date"
              name="pregled"
              value={inputForm.pregled}
              onChange={itemChange}
              required
              placeholder="Pregled"
            />
          </label>
          <label className="input-pic">
            Picture:
            <select
              name="slika"
              value={inputForm.slika}
              onChange={itemChange}
              required
            >
              <option value="">Choose Picture:</option>
              <option value="dog2.png">Dog</option>
              <option value="cat2.png">Cat</option>
              <option value="ostalo.png">Other</option>
            </select>
          </label>
        </div>
        <div className="input-description">
          <label>
            Description:{" "}
            <input
              type="text"
              name="opis"
              value={inputForm.opis}
              onChange={itemChange}
              placeholder="Description"
            />
          </label>
        </div>
        <div className="btn">
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}

export default Input;
