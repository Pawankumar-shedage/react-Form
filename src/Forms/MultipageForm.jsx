import { useState } from "react";
import { AttendieInformation } from "./AttendieInformation";
import { EventDetails } from "./EventDetails";
import { PaymentPage } from "./PaymentPage";
import { SummaryResult } from "./SummaryResult";

export const MultipageForm = () => {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  console.log(formData);
  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Submit form data
    console.log("Form submitted:", formData);
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
