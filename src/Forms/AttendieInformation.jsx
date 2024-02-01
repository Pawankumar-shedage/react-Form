import { ErrorMessage, Field, Form, Formik } from "formik";
import "./FormStyles/AttendieInformation.css";
import * as Yup from "yup";
import { useRef, useState } from "react";

// icons
import { AiTwotoneExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AttendieInformation = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  console.log(formData);

  // data rules
  const validData = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
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

  const forwardToEventDetails = () => {
    navigate("/eventDetails");
  };

  return (
    <>
      <div className="attd-info-container ">
        {/* header */}
        <div className="form-header mb-3">
          <div className=" form-title text-start  fs-2  ">Attendee Details</div>

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
              forwardToEventDetails();

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
              {/* Name */}
              <div className="field-div mb-3">
                <label htmlFor="name" className="form-label ">
                  Name
                </label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage name="name" className="form-text" component="div">
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

              {/* Email */}
              <div className="field-div mb-3">
                <label htmlFor="email" className="form-label ">
                  Email
                </label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage
                  name="email"
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

              {/* Phone */}
              <div className="field-div mb-3">
                <label htmlFor="phone" className="form-label ">
                  Phone no.
                </label>
                <Field type="text" name="phone" className="form-control" />
                <ErrorMessage
                  name="phone"
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

              {/* Submission */}
              <div className="nav-buttons mt-4">
                <div className="">
                  {/* not for first page */}
                  {/* <button className="my-btn ">
                    <span className="fw-semibold ">Back</span>
                  </button> */}
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
