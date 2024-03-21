import * as XLSX from "xlsx";

export const exportToExcel = (data, filename) => {
  if (data) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    let fileNam = filename ? filename : "Downloaded File";

    XLSX.writeFile(workbook, `${fileNam}.xlsx`, {
      bookType: "xlsx",
      type: "binary",
    });
  }
};
