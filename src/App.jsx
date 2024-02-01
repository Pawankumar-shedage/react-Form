import { ErrorMessage, Field, Form, Formik } from "formik";
import { AttendieInformation } from "./Forms/AttendieInformation";
import "/src/App.css";
import { Route, Routes } from "react-router-dom";
import { EventDetails } from "./Forms/EventDetails";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      {/* event registration form */}
      <Routes>
        <Route path="/" element={<AttendieInformation />} />
        <Route path="/eventDetails" element={<EventDetails />} />
      </Routes>

      {/* Global */}
      {/* Toast container */}
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
