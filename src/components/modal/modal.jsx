import "./modal.css";
import Background from "../background/background";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ title = "Modal Title", component, isModal, onModalClick }) => {
  // const defaultCSS =
  //   "bgg w-[520px] rounded-lg bg-white z-[1200] transform -translate-x-1/2 -translate-y-1/2 ";
  const defaultCSS =
    "bgg rounded-lg bg-white z-[1200] transform -translate-x-1/2 -translate-y-1/2 max-h-[880px]";

  const backgroundClass = isModal ? `bg--active ${defaultCSS}` : defaultCSS;
  return isModal === true ? (
    <>
      <ToastContainer className="margin-offset" />
      <Background onModalClick={onModalClick}></Background>
      <div className="fixed top-[46%] left-[50%] z-[1200]">
        <div className={backgroundClass}>
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900 ">{title}</h3>
            <button
              onClick={onModalClick}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div>{component}</div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Modal;
