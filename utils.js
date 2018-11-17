document.addEventListener('DOMContentLoaded', function (event) {
  // generateRows()


});








// justifica string a esquerda
String.prototype.lpad = function (padString, length) {
  var str = this;
  while (str.length < length) str = padString + str;
  return str;
}


// gera linhas para testes {dependencia:fakerjs}
function generateRows() {
  faker.locale = "pt_BR";
  let table_body = document.querySelector("#tabela1").getElementsByTagName('TBODY')[0];
  for (let i = 0; i < 100; i++) {
    let row = document.createElement('tr');
    let date = faker.date.between('1990-01-01', '2000-01-05')
    row.className = 'odd'
    row.innerHTML = `
    <tr role="row" class="odd">
        <td class="text-center">${faker.name.findName()}</td>
        <td class="text-center ">${faker.internet.email()}</td>
        <td class="text-center ">${date.getDate().toString().lpad("0", 2)}/${date.getMonth().toString().lpad("0", 2)}/${date.getFullYear()}</td>
        <td class="text-center ">${faker.finance.amount()}</td>
        <td class="text-center ">${faker.phone.phoneNumber()}</td>
    </tr>
    `;
    table_body.appendChild(row)
  }
}


function memorySizeOf(obj) {
  var bytes = 0;

  function sizeOf(obj) {
    if (obj !== null && obj !== undefined) {
      switch (typeof obj) {
        case 'number':
          bytes += 8;
          break;
        case 'string':
          bytes += obj.length * 2;
          break;
        case 'boolean':
          bytes += 4;
          break;
        case 'object':
          var objClass = Object.prototype.toString.call(obj).slice(8, -1);
          if (objClass === 'Object' || objClass === 'Array') {
            for (var key in obj) {
              if (!obj.hasOwnProperty(key)) continue;
              sizeOf(obj[key]);
            }
          } else bytes += obj.toString().length * 2;
          break;
      }
    }
    return bytes;
  };

  function formatByteSize(bytes) {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
    else return (bytes / 1073741824).toFixed(3) + " GiB";
  };

  return formatByteSize(sizeOf(obj));
};