export function downloadFileExcel(response:any, title:string, type?: string) {
  console.log("🚀 ~ downloadFileExcel ~ title:", title)
  const typeExcel = type ?? "xls";
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const date = `${year}/${month}/${day}` || "";
  const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${response}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.setAttribute("download", `${title} ${date}.${typeExcel}`);
  downloadLink.target = "_blank";
  downloadLink.click();
  // Báo cáo chi tiết
}