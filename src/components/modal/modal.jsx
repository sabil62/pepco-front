import Background from "../background/background";

const Modal = ({ title = "Modal Title", component }) => {
  return (
    <Background>
      <div className="flex align-items justify-center h-screen w-full">
        <div className="mt-[110px] w-[450px] h-[500px] rounded-lg bg-white z-[1010]">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 ">{title}</h3>
            <button
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
          <div className="container">{component}</div>
        </div>
      </div>
    </Background>
  );
};

export default Modal;
