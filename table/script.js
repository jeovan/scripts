document.addEventListener('DOMContentLoaded', function (event) {
  let table = new Table('#tabela1');
  table.tableDraw();
  table.tableSort({column:'data nascimento',type:'date',order_by:'asc',format:'DD/MM/YYYY'});
  table.tableDraw();
  // console.log(memorySizeOf(table))
  table.tableFilter(
    {
      column:'valor',
      range:[1,51]
      // regex:/^(?:(?!\Júlio César Batista\b).)*$/i
    },
    {column:'nome',regex:/^(?:(?!\Suélen\b).)*$/i}
  )
  // table.tableFilter(  )
  table.tableDraw();
  
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

Table.prototype.tableSort = function (...r) {
  this.table_map = this.table_map.sort((a, b) => {
    for (i in r) {
      r[i].column = r[i].column.toUpperCase();
      if (r[i].type.toUpperCase() === 'NUMBER') {
        if (r[i].order_by.toUpperCase() === 'ASC') {
          if (a[r[i].column] == b[r[i].column]) continue
          return a[r[i].column] - b[r[i].column]
        } else if (r[i].order_by.toUpperCase() === 'DESC') {
          if (b[r[i].column] == a[r[i].column]) continue
          return b[r[i].column] - a[r[i].column]
        }
      } else if (r[i].type.toUpperCase() === 'STRING') {
        if (r[i].order_by.toUpperCase() === 'ASC') {
          if (a[r[i].column].localeCompare(b[r[i].column]) == 0) continue
          return a[r[i].column].localeCompare(b[r[i].column]) === 1 ? 1 : -1;
        } else if (r[i].order_by.toUpperCase() === 'DESC') {
          if (b[r[i].column].localeCompare(a[r[i].column]) == 0) continue
          return b[r[i].column].localeCompare(a[r[i].column]) === 1 ? 1 : -1;
        }
      } else if (r[i].type.toUpperCase() === 'DATE'){
        let regex_data = {}
        if (r[i].format == 'DD/MM/YYYY') regex_data = { r: new RegExp(/(\d{2})\/(\d{2})\/(\d{4})/), p: "$2-$1-$3"}
        a_aux = new Date(a[r[i].column].replace(regex_data.r,regex_data.p))
        b_aux = new Date(b[r[i].column].replace(regex_data.r, regex_data.p))
        if (r[i].order_by.toUpperCase() === 'ASC') {
          if (a_aux == b_aux ) continue
          return a_aux - b_aux 
        } else if (r[i].order_by.toUpperCase() === 'DESC') {
          if (b_aux == a_aux) continue
          return b_aux - a_aux
        }
      }
      // throw new Error('order-1');
    }
  });
}

Table.prototype.tableFilter = function(...r){
  for(i in r){
    if(typeof r[i].regex != 'undefined'){
      let regex = new RegExp(r[i].regex)
      this.table_map.forEach( field=>{
        if(field['_STATUS']){
          if(regex.test(field[r[i].column.toUpperCase()])) field['_STATUS'] = true;
          else  field['_STATUS'] = false;
        }
      });
    }else if(typeof r[i].range != 'undefined'){
      this.table_map.forEach( field=>{
        if(field['_STATUS']){
          if(field[r[i].column.toUpperCase()] >= r[i].range[0] && field[r[i].column.toUpperCase()] <= r[i].range[1]) field['_STATUS'] = true;
          else  field['_STATUS'] = false;
        }
      });
    }
  }
}


// /(\d)(\1)+/g