function convertDateToNumber(date) {
  //from 22/12/2024(Date object) to 20241222
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object");
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based

  const day = String(date.getDate()).padStart(2, "0");
  return parseInt(`${year}${month}${day}`, 10);
}

module.exports = {
  convertDateToNumber,
};
