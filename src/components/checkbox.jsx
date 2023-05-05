import { useContext } from "react";
import AdminContext from "./context";

function Checkbox({ onChange }) {
  const isAdmin = useContext(AdminContext);

  return (
    <>
      <label>
        <input value={isAdmin} onChange={onChange} type="checkbox" />
        Admin
      </label>
    </>
  );
}

export default Checkbox;
