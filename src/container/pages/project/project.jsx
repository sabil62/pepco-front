import { Button, Grid } from "../../../components/tailwind/tailwind_variable";

const handleSubmit = () => {};

const Project = () => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid grid12>
          <div className="col-span-12 mx-6 mt-6">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Project Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter Project Name"
                required
              />
            </div>
          </div>
          <div className="col-span-6 my-1 ml-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Source Excel
            </label>
            <select
              id="source_excel"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option selected="">Select Excel</option>
              <option value="TV">Excel 1</option>
            </select>
          </div>
          <div className="col-span-6 my-1 mr-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Destination Excel
            </label>
            <select
              id="destination_excel"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option selected="">Select Excel</option>
              <option value="TV">Excel 1</option>
            </select>
          </div>
          {/* <div className="col-span-6"></div> */}
          <div className="col-span-12 mx-left flex justify-end mr-6 mb-6 mt-1">
            <Button blue>
              <svg
                class="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Add new project
            </Button>
          </div>
        </Grid>
      </form>
    </>
  );
};

export default Project;
