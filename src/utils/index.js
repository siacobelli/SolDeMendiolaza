import { format, parseISO } from "date-fns";

const uFormat = function (date, pattern = "yyyy-MM-dd HH:mm") {
  return format(parseISO(date), pattern);
};

const ragPalette = {
  red: "#E16A69",
  amber: "#FFE06A",
  green: "#B5D568",
};

export default {
  uFormat,
  ragPalette
};
