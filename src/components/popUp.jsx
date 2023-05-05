import React from "react";

function ShowPopUp({
  data,
  edit,
  anim,
  itemChange,
  itemChangeCheck,
  closePopUp,
  adoptPatchRequest,
  itemPutRequest,
  isAdmin,
  changeItems,
}) {
  return (
    <div className="listPopUpBody">
      <div className="listPopUp" key={data.id}>
        {edit ? (
          <input
            type="text"
            name="ime"
            value={anim.ime}
            onChange={itemChange}
            maxLength={20}
            style={{ margin: "10px" }}
            required
          />
        ) : (
          <h2>{data.ime}</h2>
        )}
        <img src={data.slika} alt={data.vrsta} />
        <p>{data.vrsta}</p>
        {data.udomljen ? <p>Udomljen</p> : <p>Nije Udomljen</p>}
        {edit ? (
          <label>
            <input
              type="checkbox"
              name="udomljen"
              checked={anim.udomljen}
              style={{ margin: "10px" }}
              onChange={itemChangeCheck}
              required
            />
            Udomljen?
          </label>
        ) : (
          <></>
        )}
        {edit ? (
          <input
            type="text"
            name="opis"
            value={anim.opis}
            onChange={itemChange}
            style={{ margin: "10px" }}
            required
          />
        ) : (
          <p>{data.opis}</p>
        )}
        <div className="buttons">
          <button onClick={() => adoptPatchRequest(data.id)}>Udomi</button>
          {edit ? (
            <button onClick={() => itemPutRequest(data.id)}>Save</button>
          ) : (
            <div>
              {isAdmin ? (
                <button
                  style={{ color: "gray", pointerEvents: "none" }}
                  isDisabled
                >
                  Edit
                </button>
              ) : (
                <button onClick={() => changeItems(data)}>Edit</button>
              )}
            </div>
          )}
          <button onClick={closePopUp}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ShowPopUp;
