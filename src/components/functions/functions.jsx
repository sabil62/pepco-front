export const returnKeyWithMinComp = (json_data) => {
  let arr_keys = [];
  let arr_len = [];

  Object.keys(json_data).map((key) => {
    arr_keys.push(key);
    arr_len.push(json_data[key].length);
    return null;
  });

  let min_index = findMinValueIndexOfArray(arr_len);
  return arr_keys[min_index];
  //   [ { pepco_list: 2 }, { new_list: 4 } ]
};

export const returnKeyWithMaxComp = (json_data) => {
  let arr_keys = [];
  let arr_len = [];

  Object.keys(json_data).map((key) => {
    arr_keys.push(key);
    arr_len.push(json_data[key].length);
    return null;
  });

  let min_index = findMaxValueIndexOfArray(arr_len);
  return arr_keys[min_index];
  //   [ { pepco_list: 2 }, { new_list: 4 } ]
};

export const returnKeyDataFromArr = ({ firstArr, secondArr }) => {
  let firstArrLen = firstArr?.filter((item) => item !== "");
  let secondArrLen = secondArr?.filter((item) => item !== "");

  let firstArrLength = firstArrLen?.length;
  let secondArrLength = secondArrLen?.length;

  console.log(firstArrLen, secondArrLen, firstArrLength, secondArrLength);

  if (firstArrLength === secondArrLength) {
    return [firstArrLen, firstArrLen];
  } else if (firstArrLength > secondArrLength) {
    return [firstArrLen, secondArrLen];
  }
  return [secondArrLen, firstArrLen];
};

const findMinValueIndexOfArray = (arr) => {
  let min_value = Math.min(...arr);
  let ind = arr.indexOf(min_value);
  return ind;
};

const findMaxValueIndexOfArray = (arr) => {
  let min_value = Math.max(...arr);
  let ind = arr.indexOf(min_value);
  return ind;
};

export const extractFilenameFromURL = (url) => {
  // Split the URL by '/'
  const parts = url.split("/");
  // Get the last part (filename)
  const filenameWithExtension = parts[parts.length - 1];
  // Split the filename by '.' to separate the extension
  const filenameParts = filenameWithExtension.split(".");
  // Return the filename without extension
  return filenameParts[0];
};
