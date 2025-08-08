import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { LoginForm } from "../Forms/LoginForm";
import ForgotPassword from "../modals/ForgotPasswordModal";

export function Login() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <CssBaseline enableColorScheme />
      <ForgotPassword open={openModal} handleClose={handleCloseModal} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f5f9ff] to-white p-4">
        <LoginForm onForgotPassword={() => setOpenModal(true)} />
      </div>
    </>
  );
}