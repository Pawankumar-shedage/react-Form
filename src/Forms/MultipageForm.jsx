import { useState } from "react";
import { AttendieInformation } from "./AttendieInformation";
import { EventDetails } from "./EventDetails";
import { PaymentPage } from "./PaymentPage";
import { SummaryResult } from "./SummaryResult";
import { toast } from "react-toastify";
import { useFormData } from "./FormDataProvider";

export const MultipageForm = () => {
  const { formData, setFormData } = useFormData();
  const [step, setStep] = useState(1);

  const handleNext = (data) => {
    console.log("data ", data);
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  // console.log(formData);
  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Submit form data
    toast.success("Form details submitted successfully");

    //Now navigating user back to event registration (new) & clearing Formdata
    localStorage.clear();
    setFormData({});
    setStep(1);
    // console.log("Form Data:", formData);
  };

  return (
    <div>
      {step === 1 && <AttendieInformation onNext={handleNext} />}
      {step === 2 && (
        <EventDetails onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {step === 3 && (
        <PaymentPage onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {step === 4 && (
        <SummaryResult
          data={formData}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
