const SqlDisplay = ({ queryData }) => {
  console.log(queryData);
  const aplhabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  return (
    <>
      <div class="overflow-x-auto shadow-lg mb-16">
        <table className=" table-auto  min-w-full text-sm text-left shadow-sm border border-2">
          <thead className="text-gray-600 bg-[#E6E6E6] text-center">
            <tr className="divide-x  ">
              {queryData?.length > 0 && (
                <th className="py-2 px-6 border-r-2 border-b-2 border-gray-300">
                  {aplhabet[0]}
                </th>
              )}
              {queryData?.length > 0 &&
                Object.keys(queryData[0])?.map((item, ind) => (
                  <th
                    key={ind}
                    className="py-2 px-6 border-r-2 border-b-2 border-gray-300"
                  >
                    {aplhabet[ind + 1]}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y">
            <tr className="divide-x ">
              {queryData?.length > 0 && (
                <th className="bg-[#E6E6E6] text-center border-b-2 border-gray-300 font-normal">
                  1
                </th>
              )}
              {queryData?.length > 0 &&
                Object.keys(queryData[0])?.map((item, key) => (
                  <th key={key} className="py-2 px-6">
                    {item}
                  </th>
                ))}
            </tr>

            {queryData &&
              queryData?.map((item, idx) => (
                // <tr className="bg-[#E6E6E6] text-center">1</tr>
                <tr key={idx} className="divide-x bg-white">
                  <td className="bg-[#E6E6E6] text-center border-b-2 border-gray-300">
                    {idx + 2}
                  </td>
                  {Object.keys(queryData[idx])?.map((key, ind) => (
                    <td
                      key={ind}
                      className="px-6 font-medium py-2 whitespace-nowrap "
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

{
  /* <div class="overflow-x-auto">
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
</div> */
}
