const SureFunc = ({ handleYes, handleNo }) => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-5">
        <div className="m-4">Warning!</div>
        <div>Are you Sure, you want to proceed?</div>
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
