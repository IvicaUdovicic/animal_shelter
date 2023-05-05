import "./listStyle.css";
import { useContext, useState, useRef } from "react";
import FilterAdoptElement from "./filterAdoptElement";
import FilterTypeElement from "./filterTypeElement";
import axios from "axios";
import AdminContext from "./context";
import ShowPopUp from "./popUp";

function List({ animals, setAnimals }) {
  const [adopted, setAdopted] = useState("");
  const [type, setType] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [showData, setShowData] = useState();
  const [anim, setAnim] = useState({});
  const [edit, setEdit] = useState(false);
  const isAdmin = useContext(AdminContext);

  const closePopUp = () => setPopUp(false);

  const filterAdopt =
    adopted !== ""
      ? animals.filter((a) => a.udomljen === (adopted === "true"))
      : animals;

  const filterType = type
    ? filterAdopt.filter((a) => a.vrsta === type)
    : filterAdopt;

  function adoptPatchRequest(id) {
    axios
      .patch(`http://localhost:3002/zivotinje/${id}`, {
        udomljen: true,
      })
      .then(() => {
        axios
          .get("http://localhost:3002/zivotinje")
          .then((ani) => setAnimals(ani.data));
      });
  }

  function changeItems(a) {
    setAnim({
      id: a.id,
      ime: a.ime,
      vrsta: a.vrsta,
      cip: a.cip,
      godine: a.godine,
      opis: a.opis,
      pregled: a.pregled,
      udomljen: a.udomljen,
      slika: a.slika,
    });

    setEdit(true);
  }

  function updateItems(items) {
    return {
      id: items.id,
      ime: items.ime,
      vrsta: items.vrsta,
      cip: Boolean(items.cip),
      godine: Number(items.godine),
      opis: items.opis,
      pregled: items.pregled,
      udomljen: Boolean(items.udomljen),
      slika: items.slika,
    };
  }

  function itemPutRequest(id) {
    const update = updateItems(anim);

    axios.put(`http://localhost:3002/zivotinje/${id}`, update).then(() => {
      axios
        .get("http://localhost:3002/zivotinje")
        .then((ani) => setAnimals(ani.data))
        .then(setEdit(false));
    });
  }

  const itemChange = (e) => {
    const { name, value } = e.target;

    setAnim({ ...anim, [name]: value });
  };

  const itemChangeCheck = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setAnim({ ...anim, [name]: newValue });
  };

  const dataToPopUp = (data) => {
    setPopUp(true);
    setShowData(data);
  };

  const handleFilterChange = (e) => {
    setAdopted(e.target.value);
  };
  const handleFilterTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div>
      <div className="list-body">
        <div className="filter">
          <FilterAdoptElement
            selectedType={adopted}
            handleFilterChange={handleFilterChange}
          />
          <FilterTypeElement
            selectedType={type}
            handleFilterTypeChange={handleFilterTypeChange}
          />
        </div>
        <div className="list">
          {filterType.map((a) => (
            <div key={a.id} className="list-item">
              <h2>{a.ime}</h2>
              <div onClick={() => dataToPopUp(a)}>
                {a.udomljen ? (
                  <img
                    src={a.slika}
                    alt={a.vrsta}
                    style={{ border: "5px green solid", borderRadius: "15px" }}
                  />
                ) : (
                  <img
                    src={a.slika}
                    alt={a.vrsta}
                    style={{ border: "5px red solid", borderRadius: "15px" }}
                  />
                )}
                <p>{a.opis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {popUp ? (
        <ShowPopUp
          data={showData}
          edit={edit}
          anim={anim}
          itemChange={itemChange}
          itemChangeCheck={itemChangeCheck}
          closePopUp={closePopUp}
          adoptPatchRequest={adoptPatchRequest}
          itemPutRequest={itemPutRequest}
          isAdmin={isAdmin}
          changeItems={changeItems}
        />
      ) : null}
    </div>
  );
}

export default List;
