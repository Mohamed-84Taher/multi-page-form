import { createContext, useState, useEffect } from "react";

const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
  const title = {
    0: "Billing Info",
    1: "Shipping Info",
    2: "Opt-In"
  };
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    billFirstName: "",
    billLastName: "",
    billAddress1: "",
    billAddress2: "",
    billCity: "",
    billState: "",
    billZipCode: "",
    sameAsBilling: false,
    shipFirstName: "",
    shipLastName: "",
    shipAddress1: "",
    shipAddress2: "",
    shipCity: "",
    shipState: "",
    shipZipCode: "",
    optInNews: false
  });

  const handleChange = e => {
    const type = e.target.type;

    const name = e.target.name;

    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    if (data.sameAsBilling) {
      setData(prevData => ({
        ...prevData,
        shipFirstName: prevData.billFirstName,
        shipLastName: prevData.billLastName,
        shipAddress1: prevData.billAddress1,
        shipAddress2: prevData.billAddress2,
        shipCity: prevData.billCity,
        shipState: prevData.billState,
        shipZipCode: prevData.billZipCode
      }));
    } else {
      setData(prevData => ({
        ...prevData,
        shipFirstName: "",
        shipLastName: "",
        shipAddress1: "",
        shipAddress2: "",
        shipCity: "",
        shipState: "",
        shipZipCode: ""
      }));
    }
  }, [data.sameAsBilling]);

  const {
    billAddress2,
    shipAddress2,
    sameAsBilling,
    optInNews,
    ...requiredInputs
  } = data;

  const canSubmit =
    page === [...Object.keys(title)].length - 1 &&
    [...Object.values(requiredInputs)].every(Boolean);

  return (
    <FormContext.Provider
      value={{ title, page, setPage, data, setData, handleChange, canSubmit }}>
      {children}
    </FormContext.Provider>
  );
};
export default FormContext;
