// given changes array
export function getNewAndUpdatedRows(changes, source, postCallback, putCallback) {
  // if changes array is not null
  if (changes) {
    // create empty arrays to store new rows and updated rows as objects, respectively
    let newRows = [];
    let updatedRows = [];

    // for each cell array in changes array
    for (let cell of changes) {

      // get cell's corresponding row's number (per spreadsheet) and id (per database)
      let rowNum = cell[0];
      let rowId = this.refs.hot.hotInstance.getSourceDataAtRow(rowNum).id;
      // get cell's field-newValue pair
      let field = cell[1];
      let newValue = cell[3];

      // if cell's corresponding row was empty prior to change
      if (rowId === null) {
        // create a variable to check whether row number is found in newRows array & set its initial value to false
        let found = false;

        // for each row object in newRows array
        for (let newRow of newRows) {
          // if row object's num value is equal to row number
          if (newRow.num === rowNum) {
            // add cell's field-newValue pair to row object
            newRow[field] = newValue;
            // set check variable to true
            found = true;
            // exit loop
            break;
          }
        }

        // subsquent to loop, if check variable is false
        if (!found) {
          // create an object with key-value pair: {num: cell's row number}
          let newRow = {num: rowNum};
          // add cell's field-newValue pair to the object
          newRow[field] = newValue;
          // push the object to newRows array
          newRows.push(newRow);
        }

      // otherwise, if cell's corresponding row was not empty prior to change
      } else {
        // create a variable to check whether row id is found in updatedRows array & set its initial value to false
        let found = false;

        // for each row object in updatedRows array
        for (let updatedRow of updatedRows) {
          // if row object's id value is equal to row id
          if (updatedRow.id === rowId) {
            // add cell's field-newValue pair to row object
            updatedRow[field] = newValue;
            // set check variable to true
            found = true;
            // exit loop
            break;
          }
        }

        // subsquent to loop, if check variable is false
        if (!found) {
          // create an object with key-value pair: {id: cell's row id}
          let updatedRow = {id: rowId};
          // add cell's field-newValue pair to the object
          updatedRow[field] = newValue;
          // push the object to updatedRows array
          updatedRows.push(updatedRow);
        }
      }
    }

    // for each new row in newRows array, remove row number before ajax call
    for (let newRow of newRows) {
      if ('num' in newRow) {
        delete newRow.num;
      }
    }

    if (newRows.length > 0) {
      postCallback(newRows);
    }

    if (updatedRows.length > 0) {
      putCallback(updatedRows);
    }
  }
};

export function validateCellData(changes, callback) {
  const hot = this.refs.hot
  if (hot) {

    let resultArray = [];

    const validateCell = (rowIndex, colIndex) => {
      hot.hotInstance.validateCell(
        hot.hotInstance.getDataAtCell(rowIndex, colIndex),
        hot.hotInstance.getCellMeta(rowIndex, colIndex),
        result => {
          const returnResult = !result ? false : true;
          pushResult(result)
        },
        'validateCells'
      );
    }

    const pushResult = (result) => {
      resultArray.push(result)
      if(resultArray.length === changes.length){
        if(resultArray.includes(false)){
          callback(false)
        } else {
          callback(true)
        }
      }
    }

    for(let row of changes){
      let rowIndex = row[0]
      let colIndex = hot.hotInstance.propToCol(row[1])
      validateCell(rowIndex, colIndex);
    }

  }
}
