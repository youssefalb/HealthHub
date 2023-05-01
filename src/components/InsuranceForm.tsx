import { useState } from "react";
import TextInput from "./textInput";

const InsuranceForm = () => {
  const [hasInsurance, setHasInsurance] = useState(false);
  const [insuranceNumber, setInsuranceNumber] = useState("");

  const handleCheckboxChange = (e) => {
    setHasInsurance(e.target.checked);
  };

  const handleInsuranceNumberChange = (e) => {
    setInsuranceNumber(e.target.value);
  };

  return (
    <>
      <div className="mb-4">
        <label className="block mb-2">
          Do you have insurance?
        </label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasInsurance"
            checked={hasInsurance}
            onChange={handleCheckboxChange}
          />
          <label className="ml-2" htmlFor="hasInsurance">
            Yes
          </label>
        </div>
      </div>
      {hasInsurance && (
        <TextInput
        label={"Insurance Number:"}
        value={insuranceNumber}
        onChange={handleInsuranceNumberChange}
        />
      )}
    </>
  );
};

export default InsuranceForm;
