import { useEffect, useState } from "react";
import "./FormStyles/AttendieInformation.css";
import { useFormData } from "./FormDataProvider";

export const SummaryResult = ({ onPrevious, onSubmit }) => {
  const { formData, setFormData } = useFormData();

  useEffect(() => {
    setFormData({ ...formData });
  }, []);

  // console.log("All form Data: ", formData);

  return (
    <>
      <div className="attd-info-container">
        {/* header */}
        <div className="form-header mb-3">
          <div className=" form-title text-start  fs-2  ">Form Details</div>
        </div>

        {/* Rest form data */}
        <div className="formData-div">
          <div className="listItem d-flex flex-column justify-content-center align-items-start">
            {Object.entries(formData).map(([key, value], index) => (
              <div key={index} className=" mb-3">
                {/* key */}
                <div className="listItem-key">
                  <span>
                    <strong>{key}:</strong>
                  </span>
                </div>

                {/* value */}
                <div className="listItem-value">
                  <span>
                    {typeof value === "object" ? (
                      Object.entries(value).map(([key, data], index) => (
                        <div key={index} className="listItem-key mb-3">
                          {/* key */}
                          <div className="bAdd-listItem-key">
                            <span>
                              <strong>{key}:</strong>
                            </span>
                          </div>
                          {/* data */}
                          <div className="bAdd-listItem-value">
                            <span>{data}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span>{value}</span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submission */}
        <div className="nav-buttons mt-4">
          <div className="">
            <button type="button" className="my-btn" onClick={onPrevious}>
              <span className="fw-semibold ">Back</span>
            </button>
          </div>

          <div className="">
            <button type="button" className="my-btn" onClick={onSubmit}>
              <span className="fw-semibold p-2">Confirm and Submit</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
