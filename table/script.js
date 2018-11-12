document.addEventListener('DOMContentLoaded', function (event) {
  // generateRows()
  let table = new Table('');

});


function Table(table_id){

}








// justifica string a esquerda
String.prototype.lpad = function(padString, length) {
  var str = this;
  while (str.length < length) str = padString + str;
  return str;
}


// gera linhas para testes {dependencia:fakerjs}
function generateRows(){
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

