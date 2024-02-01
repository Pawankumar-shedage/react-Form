import { useEffect, useState } from "react";

export const SummaryResult = () => {
  const [formData, setFormData] = useState({});

  console.log(formData);

  useEffect(() => {
    const page1Data =
      JSON.parse(localStorage.getItem("attendeeInformation")) || {};
    const page2Data = JSON.parse(localStorage.getItem("eventDetails")) || {};
    const page3Data = JSON.parse(localStorage.getItem("paymentDetails")) || {};

    setFormData({ ...page1Data, ...page2Data, ...page3Data });
  }, []);

  return <div>Summary registration data</div>;
};
