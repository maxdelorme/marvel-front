import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
import "./modal.css";
import SignupForm from "../../components/SignupForm/SignupForm";
import LoginForm from "../../components/LoginForm/LoginForm";

const Modal = ({ setToken, setModal, modal }) => {
  const closeModal = () => {
    setModal(null);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden"; // se déclenchera au montage du composant

    return () => {
      document.body.style.overflow = "unset"; // se déclenchera à la destruction du composant
    };
  }, []);

  return (
    // la class modalBg va afficher le flou d'arrière plan
    <div className="modalBg" onClick={closeModal}>
      <div
        className="modalWindow"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="closeButton" onClick={closeModal}>
          <IoMdClose />
        </div>
        <div className="modalContent">
          {modal === "signup" && (
            <SignupForm setToken={setToken} setModal={setModal}></SignupForm>
          )}
          {modal === "login" && (
            <LoginForm setToken={setToken} setModal={setModal}></LoginForm>
          )}
        </div>
      </div>
    </div>
  );
};
export default Modal;
//
