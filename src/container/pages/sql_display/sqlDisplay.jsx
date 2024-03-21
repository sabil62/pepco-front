const SqlDisplay = ({ queryData }) => {
  console.log(queryData);
  return (
    <>
      <div class="overflow-x-auto">
        <table className=" table-auto  min-w-full text-sm text-left shadow-sm border border-2">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b ">
            <tr className="divide-x odd:bg-gray-50 even:bg-white">
              {queryData?.length > 0 &&
                Object.keys(queryData[0])?.map((item, key) => (
                  <th key={key} className="py-4 px-6">
                    {item}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {queryData &&
              queryData?.map((item, idx) => (
                <tr key={idx} className="divide-x odd:bg-gray-50 even:bg-white">
                  {Object.keys(queryData[idx])?.map((key, ind) => (
                    <td
                      key={ind}
                      className="px-6 font-medium pt-6 pb-4 whitespace-nowrap "
                    >
                      {item[key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SqlDisplay;
