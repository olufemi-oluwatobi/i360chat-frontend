import * as xlsx from 'xlsx';

export const convertToBase64File = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function convertToCSV(objArray) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  for (let i = 0; i < array.length; i++) {
    let line = '';

    for (const index in array[i]) {
      if (line != '') line += ',';

      line += array[i][index];
    }

    str += `${line}\r\n`;
  }

  return str;
}

export function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  const jsonObject = JSON.stringify(items);

  const csv = convertToCSV(jsonObject);

  const exportedFilename = fileTitle ? `${fileTitle}.csv` : 'export.csv';

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilename);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', exportedFilename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

export const convertExcelToJSON = (excelFile) => {
  var reader = new FileReader();
  reader.readAsBinaryString(excelFile);
  return new Promise((resolve, reject) => {
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = xlsx.read(data, { type: 'binary' });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = xlsx.utils.sheet_to_json(ws, { header: 1 });
      resolve(dataParse);
    };
  });
};
export const monefyString = (string, currency) => {
  const stringArray = [...string];
  return `${currency ?? ''}${stringArray
    .reverse()
    .map((value, index) =>
      (index + 1) % 3 === 0 && stringArray.length - 1 !== index
        ? `,${value}`
        : value
    )
    .reverse()
    .join('')}`;
};
export const capitalize = (string) => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const camelCasify = (string) =>
  string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');

export const ordinify = (number) =>
  [
    number,
    ['st', 'nd', 'rd'][((((number + 90) % 100) - 10) % 10) - 1] || 'th'
  ].join('');
