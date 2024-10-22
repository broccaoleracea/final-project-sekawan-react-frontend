function FormatDate({ dateString }) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export default FormatDate;
