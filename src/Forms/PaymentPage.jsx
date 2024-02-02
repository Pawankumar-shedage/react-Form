import { ErrorMessage, Field, Form, Formik } from "formik";
import "./FormStyles/AttendieInformation.css";
import * as Yup from "yup";
import { useRef, useState } from "react";

// icons
import { AiTwotoneExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormData } from "./FormDataProvider";

export const PaymentPage = ({ onPrevious, onNext }) => {
  const { formData, setFormData } = useFormData();

  console.log("Current formData: ", formData);

  // Data rules

  // billing address schema validation
  const billingAddSchema = Yup.object().shape({
    streetAddress: Yup.string().required("Address is Required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string()
      .matches(/^[0-4]{6}$/, "Zip code must be of 6 digits")
      .required("City is required"),
    country: Yup.string(),
  });

  const validData = Yup.object().shape({
    paymentMethodOption: Yup.string().required("Payment method is required"),
    cardNumber: Yup.string()
      .matches(
        /^\d{6} \d{2} \d{4} \d{4}/,
        "Card Number should be in 123456 12 1234 12345 format"
      )
      .required("Card Number is required"),
    expirationDate: Yup.string()
      .matches(/^\d{2}\/\d{2}$/, "MM/YY format is required")
      .required("Expiration Date is required"),
    cvv: Yup.string()
      .matches(/^[0-9]{3}$/, "Three digit number is required")
      .required("CVV is required"),
    // billing add
    billingAddress: billingAddSchema,
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

  return (
    <>
      <div className="attd-info-container ">
        {/* header */}
        <div className="form-header mb-3">
          <div className=" form-title text-start  fs-2  ">Payment Details</div>

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
            setFormData({ ...formData, ...values });

            // Storing form data in local storage
            localStorage.setItem("paymentDetails", JSON.stringify(values));

            setTimeout(() => {
              // next page
              onNext();

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
              {/* Payment Method */}
              <div className="field-div mb-3">
                <label htmlFor="paymentMethodOption" className="form-label ">
                  Payment Method
                </label>

                <div className=" form-check d-flex flex-column justify-content-center align-items-start">
                  <label
                    htmlFor="paymentMethodOption"
                    className="form-check-label "
                  >
                    <Field
                      type="radio"
                      name="paymentMethodOption"
                      className="form-check-input"
                      value="Credit card"
                    />
                    Credit Card
                  </label>
                  <label
                    htmlFor="paymentMethodOption"
                    className="form-check-label "
                  >
                    <Field
                      type="radio"
                      name="paymentMethodOption"
                      className="form-check-input"
                      value="Debit card"
                    />
                    Debit Card
                  </label>
                  <label
                    htmlFor="paymentMethodOption"
                    className="form-check-label "
                  >
                    <Field
                      type="radio"
                      name="paymentMethodOption"
                      className="form-check-input"
                      value="UPI"
                    />
                    UPI
                  </label>
                </div>
                <ErrorMessage
                  name="paymentMethodOption"
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

              {/* Card NUMBER  */}
              <div className="field-div mb-3">
                <label htmlFor="cardNumber" className="form-label ">
                  Card number
                </label>
                <Field
                  type="text"
                  name="cardNumber"
                  placeholder="XXXXXX XX XXXX XXXX"
                  className="form-control"
                />
                <ErrorMessage
                  name="cardNumber"
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

              {/* Card Dates: Exp , Cvv */}
              <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="field-div mb-3">
                  <label htmlFor="expirationDate" className="form-label ">
                    Expiration Date
                  </label>
                  <Field
                    type="text"
                    name="expirationDate"
                    className="form-control"
                    placeholder="MM/YY"
                  />
                  <ErrorMessage
                    name="expirationDate"
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

                {/* CVV */}
                <div className="field-div mb-3">
                  <label htmlFor="cvv" className="form-label ">
                    CVV
                  </label>
                  <Field
                    type="text"
                    name="cvv"
                    placeholder="XXX"
                    className="form-control"
                  />

                  <ErrorMessage
                    name="cvv"
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

              {/* Billing Address div */}
              <div className="billing-add">
                <div
                  className="field-div pt-3 pb-3 mb-3"
                  style={{
                    borderTop: "5px solid rgb(41, 137, 4)",
                    width: "50%",
                  }}
                >
                  <label htmlFor="bi">Billing Address</label>
                </div>
                {/* Street add */}
                <div className="field-div mb-3">
                  <label
                    htmlFor="billingAddress.streetAddress"
                    className="form-label "
                  >
                    Street Address
                  </label>
                  <Field
                    component="textarea"
                    name="billingAddress.streetAddress"
                    className="form-control"
                  />

                  <ErrorMessage
                    name="billingAddress.streetAddress"
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

                {/* City and state */}
                <div className=" d-flex  flex-row justify-content-between align-items-center">
                  {/* City */}
                  <div className="field-div  mb-3">
                    <label
                      htmlFor="billingAddress.city"
                      className="form-label "
                    >
                      City
                    </label>
                    <Field
                      type="text"
                      name="billingAddress.city"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="billingAddress.city"
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

                  {/* State */}
                  <div className="field-div  mb-3">
                    <label
                      htmlFor="billingAddress.state"
                      className="form-label "
                    >
                      State
                    </label>
                    <Field
                      type="text"
                      name="billingAddress.state"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="billingAddress.state"
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

                {/* ZIP CODE and Country */}
                <div className=" d-flex  flex-row justify-content-between align-items-center">
                  {/* Zip code */}
                  <div className="field-div  mb-3">
                    <label
                      htmlFor="billingAddress.zipCode"
                      className="form-label "
                    >
                      Zip Code
                    </label>
                    <Field
                      type="text"
                      name="billingAddress.zipCode"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="billingAddress.zipCode"
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

                  {/* Country */}
                  <div className="field-div  mb-3">
                    <label
                      htmlFor="billingAddress.country"
                      className="form-label "
                    >
                      Country
                    </label>
                    <Field
                      type="text"
                      name="billingAddress.country"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="billingAddress.country"
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

                {/* !Billing Add */}
              </div>

              {/* Submission */}
              <div className="nav-buttons mt-4">
                <div className="">
                  <button
                    type="button"
                    className="my-btn "
                    onClick={onPrevious}
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
