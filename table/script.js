document.addEventListener('DOMContentLoaded', function (event) {
  let table = new Table('#tabela1');
  table.tableDraw();
  table.tableSort({column:'data nascimento',type:'date',order_by:'asc',format:'DD/MM/YYYY'});
  table.tableDraw();
  // console.log(memorySizeOf(table))
  
});

//lib
function Table(table_id){
  this.table_header=[];
  this.table_map =[];
  this.search;
  this.table_id = table_id;

  this.tableMap();
}
	


Table.prototype.tableMap = function(){
  document.querySelectorAll(`${this.table_id} > THEAD > TR > TH`).forEach((cell) => {
    this.table_header.push(cell.textContent.toUpperCase());
  })
  document.querySelectorAll(`${this.table_id} > TBODY > TR`).forEach((field,i) => {
    let row = {};
    this.table_header.forEach((value,key)=>{ row[value] = field.children[key].textContent});
    row['_STATUS'] = true;
    row['_RAW'] = field;
    this.table_map.push(row);
  })
}

Table.prototype.tableDraw = function () {
  let table = document.querySelector(`${this.table_id} > TBODY`);
  table.innerHTML = '';
  this.table_map.forEach(value=>{ if (value['_STATUS']) table.appendChild(value['_RAW'])});
}

Table.prototype.tableSort = function order(...rules) {
  this.table_map = this.table_map.sort((a, b) => {
    for (i in rules) {
      rules[i].column = rules[i].column.toUpperCase();
      if (rules[i].type.toUpperCase() === 'NUMBER') {
        if (rules[i].order_by.toUpperCase() === 'ASC') {
          if (a[rules[i].column] == b[rules[i].column]) continue
          return a[rules[i].column] - b[rules[i].column]
        } else if (rules[i].order_by.toUpperCase() === 'DESC') {
          if (b[rules[i].column] == a[rules[i].column]) continue
          return b[rules[i].column] - a[rules[i].column]
        }
      } else if (rules[i].type.toUpperCase() === 'STRING') {
        if (rules[i].order_by.toUpperCase() === 'ASC') {
          if (a[rules[i].column].localeCompare(b[rules[i].column]) == 0) continue
          return a[rules[i].column].localeCompare(b[rules[i].column]) === 1 ? 1 : -1;
        } else if (rules[i].order_by.toUpperCase() === 'DESC') {
          if (b[rules[i].column].localeCompare(a[rules[i].column]) == 0) continue
          return b[rules[i].column].localeCompare(a[rules[i].column]) === 1 ? 1 : -1;
        }
      } else if (rules[i].type.toUpperCase() === 'DATE'){
        let regex_data = {}
        if (rules[i].format == 'DD/MM/YYYY') regex_data = { r: new RegExp(/(\d{2})\/(\d{2})\/(\d{4})/), p: "$2-$1-$3"}
        a_aux = new Date(a[rules[i].column].replace(regex_data.r,regex_data.p))
        b_aux = new Date(b[rules[i].column].replace(regex_data.r, regex_data.p))
        if (rules[i].order_by.toUpperCase() === 'ASC') {
          if (a_aux == b_aux ) continue
          return a_aux - b_aux 
        } else if (rules[i].order_by.toUpperCase() === 'DESC') {
          if (b_aux == a_aux) continue
          return b_aux - a_aux
        }
      }
      // throw new Error('order-1');
    }
  });
}


