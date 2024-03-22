const SureFunc = ({ handleYes, handleNo }) => {
  return (
    <div className="w-[480px]">
      <div className="grid grid-cols-12 gap-1 place-items-center">
        <div className="m-4 ml-14 col-span-2">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="66"
            height="66"
            fill="none"
            viewBox="0 0 66 66"
          >
            <path
              fill="#F6BD37"
              d="M55.548 55.687H10.452c-3.254 0-5.296-3.405-3.715-6.164L29.285 10.37c1.624-2.836 5.806-2.836 7.43 0l22.548 39.154c1.58 2.759-.461 6.164-3.715 6.164z"
              opacity="0.2"
            ></path>
            <path
              fill="#F6BD37"
              d="M61.05 48.492L38.504 9.338a6.383 6.383 0 00-11.008 0L4.95 48.492a6.061 6.061 0 000 6.115 6.278 6.278 0 005.504 3.143h45.092a6.278 6.278 0 005.499-3.143 6.061 6.061 0 00.005-6.115zm-3.576 4.05a2.192 2.192 0 01-1.928 1.083H10.454a2.192 2.192 0 01-1.928-1.083 1.957 1.957 0 010-1.99L31.07 11.398a2.256 2.256 0 013.868 0l22.545 39.154a1.957 1.957 0 01-.01 1.99zM30.937 37.125V26.813a2.062 2.062 0 014.125 0v10.312a2.062 2.062 0 01-4.125 0zm5.157 9.281a3.093 3.093 0 11-6.187 0 3.093 3.093 0 016.187 0z"
            ></path>
          </svg>
        </div>
        <div className="col-span-10 font-medium text-[1.06rem]">
          Are you Sure, you want to proceed?
        </div>
      </div>

      <div className="flex items-center justify-end px-3 py-3 border-t ">
        <button
          className="inline-flex items-center py-2.5 px-6 mr-3 text-[1rem] font-medium text-center text-blue-700 border border-2 border-blue-700  rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-600 hover:text-white transfrom ease-out"
          onClick={handleNo}
        >
          No
        </button>
        <button
          className="inline-flex items-center py-2.5 px-6 mr-3 text-[1rem] font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
          onClick={handleYes}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default SureFunc;
