import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  //  _(items) converts into lodash format
  //  slice(startIndex) slice the array from the starting index
  //  take(pageSize) take the pageSize number of elements from the array
  // value() return a regular array
  return _(items).slice(startIndex).take(pageSize).value();
}
