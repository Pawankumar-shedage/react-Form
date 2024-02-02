import { ErrorMessage, Field, Form, Formik } from "formik";
import { AttendieInformation } from "./Forms/AttendieInformation";
import "/src/App.css";
import { Route, Routes } from "react-router-dom";
import { EventDetails } from "./Forms/EventDetails";
import { ToastContainer } from "react-toastify";
import { PaymentPage } from "./Forms/PaymentPage";
import { MultipageForm } from "./Forms/MultipageForm";
import { SummaryResult } from "./Forms/SummaryResult";
import { FormDataProvider } from "./Forms/FormDataProvider";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MultipageForm />} />
        <Route path="/attendieInfo" element={<AttendieInformation />} />
        <Route path="/eventDetails" element={<EventDetails />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<SummaryResult />} />
      </Routes>

      {/* Global Toast container */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
