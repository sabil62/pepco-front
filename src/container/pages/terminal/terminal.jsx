import Container from "../../../layout/container/container";

const Terminal = () => {
  return (
    <>
      {/* <div className="text-2xl mt-6 text-center">Terminal</div> */}
      <Container>
        <form className="mt-12">
          <div className="border border-gray-200 rounded-lg">
            <div className="text-[1.32rem] px-5 py-3 bg-gray-50 border-b rounded-t-lg font-medium">
              Terminal
            </div>
            <div className=" border border-gray-200 rounded-lg bg-gray-50 mx-6 mt-4 mb-6">
              {/* <div  className="text-2xl px-4 py-4 border-b">
              Terminal
            </div> */}
              <div className="px-5 py-3 bg-white rounded-t-lg ">
                <textarea
                  id="query"
                  rows="4"
                  className="w-full px-0 rouned-md text-sm font-medium text-gray-900 bg-white border-0  h-[160px] focus:ring-0 outline-none"
                  placeholder="Paste Your Query..."
                  required
                />
              </div>
              <div className="flex items-center justify-end px-3 py-3 border-t ">
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-6 mr-3 text-[1rem] font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
                >
                  Submit Query
                </button>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Terminal;
