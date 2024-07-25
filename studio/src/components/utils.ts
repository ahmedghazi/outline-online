// import opentype from "opentype.js";

export const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export const blobToBase64 = (blob: Blob) => {
  console.log('blobToBase64', blob)
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result)
    }
  })
}

// export const _getFontMimeTypeByBase64 = (base64) => {
//   let mimeType = "";
//   if (base64.indexOf("data:font/ttf;base64,") > -1) mimeType = "truetype";
//   if (base64.indexOf("data:font/otf;base64,") > -1) mimeType = "opentype";
//   return mimeType;
// };

const _base64ToArrayBuffer = (base64: string) => {
  var binary_string = window.atob(base64)
  var len = binary_string.length
  var bytes = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i)
  }
  return bytes.buffer
}

// export const _getOpenTypeMetadata = (base64) => {
//   const parsed = opentype.parse(_base64ToArrayBuffer(base64Binary));
//   // console.log(parsed);
//   const metadata = {
//     supported: true,
//     tables: parsed.tables,
//     names: parsed.names,
//   };

//   return metadata;
// };
