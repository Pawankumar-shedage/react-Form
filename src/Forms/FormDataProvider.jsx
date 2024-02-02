import { createContext, useContext, useState } from "react";

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  //   console.log(formData);

  return (
    <>
      <FormDataContext.Provider value={{ formData, setFormData }}>
        {children}
      </FormDataContext.Provider>
    </>
  );
};

export const useFormData = () => {
  return useContext(FormDataContext);
};
