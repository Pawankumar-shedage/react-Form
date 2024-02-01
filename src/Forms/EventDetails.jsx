import { ErrorMessage, Field, Form, Formik } from "formik";
import "./FormStyles/AttendieInformation.css";
import * as Yup from "yup";
import { useRef, useState } from "react";

// icons
import { AiTwotoneExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EventDetails = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    location: "",
    eventType: "",
  });
  console.log(formData);

  // data rules
  const validData = Yup.object().shape({
    eventName: Yup.string().required("Event name is required"),
    date: Yup.date().required("Date is required"),
    eventType: Yup.string().required("Event type is required"),
    location: Yup.string().required("Location is required"),
  });

  // getting access to formik methods()
  const formikRef = useRef(null);

  // clear form
  const clearFormData = () => {
    console.log("clear form called");
    if (formikRef) {
      formikRef.current.resetForm();
    }
  };

  // notify
  const notify = () => {
    console.log("Notfiyf");
    toast.success("Detils submitted successfully!");
  };

  // navigate
  const navigate = useNavigate();

  const forwardToNextPage = () => {
    navigate("/payment");
  };

  return (
    <>
      <div className="attd-info-container ">
        {/* Header */}
        <div className="form-header mb-3">
          <div className=" form-title text-start  fs-2  ">Event Details</div>

          {/* clear form */}
          <div className="clear-form">
            <span role="button" onClick={clearFormData}>
              Clear form
            </span>
          </div>
        </div>

        <Formik
          initialValues={formData}
          validationSchema={validData}
          onSubmit={(values, { setSubmitting }) => {
            setFormData(values);

            setTimeout(() => {
              // next page
              forwardToNextPage();

              notify();
              // alert(JSON.stringify(values, null, 3));
              setSubmitting(false); //now users can submit form data again,(btn is enabled)
            }, 400);
          }}
          innerRef={formikRef}
        >
          {/* render prop-> sending function() as a child to a component. */}

          {({ isSubmitting, isValid }) => (
            <Form>
              {/* Event Name */}
              <div className="field-div mb-3">
                <label htmlFor="eventName" className="form-label ">
                  Event name
                </label>
                <Field type="text" name="eventName" className="form-control" />
                <ErrorMessage
                  name="eventName"
                  className="form-text"
                  component="div"
                >
                  {(errorMessage) => (
                    <div className="error-msg">
                      {/* ! icon */}
                      <div>
                        <svg
                          stroke="red"
                          fill="red"
                          strokeWidth="0"
                          viewBox="0 0 1024 1024"
                          height="1.5em"
                          width="1.5em"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ color: "red" }}
                        >
                          <path
                            fill="red"
                            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm-32 156c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
                          ></path>
                          <path
                            fill="red"
                            d="M488 576h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8zm-24 112a48 48 0 1 0 96 0 48 48 0 1 0-96 0z"
                          ></path>
                        </svg>
                      </div>
                      <div className="ms-2">{errorMessage}</div>
                    </div>
                  )}
                </ErrorMessage>
              </div>

              {/* Event Type category */}
              <div className="field-div mb-3">
                <label htmlFor="eventType" className="form-label ">
                  Event type
                </label>

                <Field
                  as="select"
                  name="eventType"
                  className="form-select mb-3"
                >
                  <option value="">--Select event type</option>
                  <option value="workshop">Workshop</option>
                  <option value="conference">Conference</option>
                  <option value="seminar">Seminar</option>
                  <option value="hackathon">Hackathon</option>
                </Field>

                <ErrorMessage
                  name="eventType"
                  className="form-text"
                  component="div"
                >
                  {(errorMessage) => (
                    <div className="error-msg">
                      {/* ! icon */}
                      <div>
                        <svg
                          stroke="red"
                          fill="red"
                          strokeWidth="0"
                          viewBox="0 0 1024 1024"
                          height="1.5em"
                          width="1.5em"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ color: "red" }}
                        >
                          <path
                            fill="red"
                            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm-32 156c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
                          ></path>
                          <path
                            fill="red"
                            d="M488 576h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8zm-24 112a48 48 0 1 0 96 0 48 48 0 1 0-96 0z"
                          ></path>
                        </svg>
                      </div>
                      <div className="ms-2">{errorMessage}</div>
                    </div>
                  )}
                </ErrorMessage>
              </div>

              {/* PLACE AND DATE */}
              <div className="mt-3 mb-3 d-flex flex-row justify-content-between align-items-center">
                {/* Location */}
                <div className="field-div-location mb-3">
                  <label htmlFor="location" className="form-label ">
                    Location
                  </label>
                  <Field type="text" name="location" className="form-control" />
                  <ErrorMessage
                    name="location"
                    className="form-text"
                    component="div"
                  >
                    {(errorMessage) => (
                      <div className="error-msg">
                        {/* ! icon */}
                        <div>
                          <svg
                            stroke="red"
                            fill="red"
                            strokeWidth="0"
                            viewBox="0 0 1024 1024"
                            height="1.5em"
                            width="1.5em"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "red" }}
                          >
                            <path
                              fill="red"
                              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm-32 156c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
                            ></path>
                            <path
                              fill="red"
                              d="M488 576h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8zm-24 112a48 48 0 1 0 96 0 48 48 0 1 0-96 0z"
                            ></path>
                          </svg>
                        </div>
                        <div className="ms-2">{errorMessage}</div>
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                {/* Date */}
                <div className="field-div-date mb-3">
                  <label htmlFor="date" className="form-label ">
                    Date
                  </label>
                  <Field type="date" name="date" className="form-control" />
                  <ErrorMessage
                    name="date"
                    className="form-text"
                    component="div"
                  >
                    {(errorMessage) => (
                      <div className="error-msg">
                        {/* ! icon */}
                        <div>
                          <svg
                            stroke="red"
                            fill="red"
                            strokeWidth="0"
                            viewBox="0 0 1024 1024"
                            height="1.5em"
                            width="1.5em"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "red" }}
                          >
                            <path
                              fill="red"
                              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm-32 156c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
                            ></path>
                            <path
                              fill="red"
                              d="M488 576h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8zm-24 112a48 48 0 1 0 96 0 48 48 0 1 0-96 0z"
                            ></path>
                          </svg>
                        </div>
                        <div className="ms-2">{errorMessage}</div>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>

              {/*--NAV BTNS-- Submission */}
              <div className="nav-buttons mt-4">
                <div className="">
                  <button
                    className="my-btn"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <span className="fw-semibold ">Back</span>
                  </button>
                </div>

                <div className="">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className={
                      isSubmitting || !isValid ? "disabled-btn" : "my-btn"
                    }
                  >
                    <span className="fw-semibold ">Next</span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
