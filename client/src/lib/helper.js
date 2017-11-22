import axios from 'axios';

// given changes array
export function getNewAndUpdatedRows(changes, source) {
  // if changes array is not null
  if (changes && source !== 'loadData') {
    // create empty arrays to store new rows and updated rows as objects, respectively
    let newRows = [];
    let updatedRows = [];

    // for each change array in changes array
    for (let change of changes) {

      // get change's corresponding row's index (per spreadsheet) and id (per database)
      let rowIndex = change[0];
      let rowId = this.refs.hot.hotInstance.getSourceDataAtRow(rowIndex).id;
      // get change's field-newValue pair
      let field = change[1];
      let newValue = change[3];
      // get change's corresponding cell
      let colIndex = this.refs.hot.hotInstance.propToCol(change[1]);
      let cell = this.refs.hot.hotInstance.getCell(rowIndex, colIndex);

      // if change is of valid data type
      if (!cell.classList.value.split(' ').includes('htInvalid')) {
        // if change's corresponding row was empty prior to change
        if (rowId === null) {
          // create a variable to check whether row index is found in newRows array & set its initial value to false
          let found = false;

          // for each row object in newRows array
          for (let newRow of newRows) {
            // if row object's index value is equal to row index
            if (newRow.index === rowIndex) {
              // add change's field-newValue pair to row object
              newRow[field] = newValue;
              // set check variable to true
              found = true;
              // exit loop
              break;
            }
          }

          // subsquent to loop, if check variable is false
          if (!found) {
            // create an object with key-value pair: {index: change's row index}
            let newRow = {index: rowIndex};
            // add change's field-newValue pair to the object
            newRow[field] = newValue;
            // push the object to newRows array
            newRows.push(newRow);
          }

        // otherwise, if change's corresponding row was not empty prior to change
        } else {
          // create a variable to check whether row id is found in updatedRows array & set its initial value to false
          let found = false;

          // for each row object in updatedRows array
          for (let updatedRow of updatedRows) {
            // if row object's id value is equal to row id
            if (updatedRow.id === rowId) {
              // add change's field-newValue pair to row object
              updatedRow[field] = newValue;
              // set check variable to true
              found = true;
              // exit loop
              break;
            }
          }

          // subsquent to loop, if check variable is false
          if (!found) {
            // create an object with key-value pair: {id: change's row id}
            let updatedRow = {id: rowId};
            // add change's field-newValue pair to the object
            updatedRow[field] = newValue;
            // push the object to updatedRows array
            updatedRows.push(updatedRow);
          }
        }
      }
    }

    // for each new row in newRows array, remove row index before ajax call
    for (let newRow of newRows) {
      if ('index' in newRow) {
        delete newRow.index;
      }
    }

    return {newRows, updatedRows};
  }
}

export function getRemovedIds(selectedRows) {

  const startRow = selectedRows[0];
  const endRow = selectedRows[2];
  // get smallest and biggest row id's
  const smallestRowIndex = Math.min(startRow, endRow);
  const biggestRowIndex = Math.max(startRow, endRow);
  // get list of deleted row id's
  const removedIds = [];
  for (let i = smallestRowIndex; i <= biggestRowIndex; i++) {
    removedIds.push(this.refs.hot.hotInstance.getDataAtRow(i)[0]);
  }
  return removedIds;
}


export function getHiddenCols(context) {
  let hiddenColIndices = context.hot.getPlugin('hiddenColumns').hiddenColumns;
  let hiddenColProps = [];

  for (let hiddenColIndex of hiddenColIndices) {
    let hiddenColProp = this.refs.hot.hotInstance.colToProp(hiddenColIndex);
    hiddenColProps.push(hiddenColProp);
  }

  return hiddenColProps;
}

export function colPropsToIndices(colProps) {
  const colIndices = [];

  for (let colProp of colProps) {
    let prop = colProp.name;
    let index = this.refs.hot.hotInstance.propToCol(prop);
    colIndices.push(index);
  }

  return colIndices;
}


export function getMovedColumnRange(columns, target) {
  return new Promise(resolve => {
    let movedRange;
    let movedRight;
    columns[0] < target ? (movedRight = true) : (movedRight = false);
    if (movedRight) {
      const movedIndex = target - columns.length - 1;
      movedRange = [columns[0], movedIndex + columns.length];
    } else {
      const movedIndex = target;
      movedRange = [movedIndex, columns[columns.length - 1]];
    }
    resolve(movedRange);
  })
}

export function entityColumnsToObj() {
  return new Promise(resolve => {
    axios
      .get('/api/leads/columnorders')
      .then(res => {
        let columns = res.data;
        const entityColumnsObj = {};
        for(let column of columns){
          let columnName = column.name
          let columnId = column.id
          entityColumnsObj[columnName] = columnId
        }
        resolve(entityColumnsObj);
      })
  });
}

export function getChangedColumnsObj(entityColumnsObj, movedRange, afterColumnsArray) {
  return new Promise(resolve => {
    const updatedColumnOrders = [];
    const movedRangeStart = movedRange[0];
    const movedRangeEnd = movedRange[movedRange.length - 1];
    for (let i = movedRangeStart; i <= movedRangeEnd; i++) {
      const updatedColumn = {};
      const columnName = afterColumnsArray[i];
      const columnId = entityColumnsObj[columnName];
      const columnOrder = i;
      updatedColumn.columnName = columnName;
      updatedColumn.columnId = columnId;
      updatedColumn.columnOrder = columnOrder;
      updatedColumnOrders.push(updatedColumn);
    }
    resolve(updatedColumnOrders);
  });
}
