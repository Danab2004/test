const DropDown = ({ options, selected, onSelectedChange ,formDataName, id, onChange=()=>{}}) => {


  return (
    // <div className="ui form">
      <div className="field">
        <select
          id={id}
          value={formDataName || ""}
          onChange={onChange}
        >
          <option value="">--Please choose an option--</option>
          {
          options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    // </div>
  );
}
export default DropDown;