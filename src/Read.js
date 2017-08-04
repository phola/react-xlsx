import XLSX from 'xlsx-style'

export const workBookFromFile = (file, callback) => {
  var name = file.name
  var reader = new FileReader()
  reader.onload = function (e) {
    var data = e.target.result

    var workbook

    /* if binary string, read with type 'binary' */
    workbook = XLSX.read(data, { type: 'binary' })

    callback(workbook)
  }
  reader.readAsBinaryString(file)
}

/* processing array buffers, only required for readAsArrayBuffer */
function fixdata (data) {
  var o = '', l = 0, w = 10240
  for (; l < data.byteLength / w; ++l) {
    o += String.fromCharCode.apply(
      null,
      new Uint8Array(data.slice(l * w, l * w + w))
    )
  }
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
  return o
}
