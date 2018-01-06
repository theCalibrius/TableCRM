import moment from 'moment';

// given changes array
export function getNewAndUpdatedRows(changes, source) {
  // if changes array is not null
  if (changes && source !== 'loadData') {
    // create empty arrays to store new rows and updated rows as objects, respectively
    const newRows = [];
    const updatedRows = [];

    // for each change array in changes array
    for (const change of changes) {
      // get change's corresponding row's index (per spreadsheet) and id (per database)
      const rowIndex = change[0];
      const rowId = this.refs.hot.hotInstance.getDataAtRow(rowIndex)[0];
      // get change's field-newValue pair
      const field = change[1];
      let newValue = change[3];
      // get change's corresponding cell
      const colIndex = this.refs.hot.hotInstance.propToCol(field);
      const cell = this.refs.hot.hotInstance.getCell(rowIndex, colIndex);

      // if change is of valid data type
      if (
        cell === null ||
				cell === undefined ||
				!cell.classList.value.split(' ').includes('htInvalid')
      ) {
        // format date for persisting in database
        if (field === 'expectedCloseDate' || field === 'closeDate') {
          newValue = moment(newValue).format('YYYY-MM-DD');
        }
        // if change's corresponding row was empty prior to change
        if (rowId === null) {
          // create a variable to check whether row index is found in newRows array & set its initial value to false
          let found = false;

          // for each row object in newRows array
          for (const newRow of newRows) {
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
            const newRow = { index: rowIndex };
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
          for (const updatedRow of updatedRows) {
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
            const updatedRow = { id: rowId };
            // add change's field-newValue pair to the object
            updatedRow[field] = newValue;
            // push the object to updatedRows array
            updatedRows.push(updatedRow);
          }
        }
      }
    }

    // for each new row in newRows array, remove row index before ajax call
    for (const newRow of newRows) {
      if ('index' in newRow) {
        delete newRow.index;
      }
    }
    return { newRows, updatedRows };
  }
}

export function getRemovedIds() {
  const selectedRows = this.refs.hot.hotInstance.getSelected();
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

export function getSortedColumnsByRank(columns) {
  // set columns state sorted by rank
  const rankedColumns = [];
  const currentColumns = this.state.columns;
  for (let i = 0; i < currentColumns.length; i++) {
    rankedColumns.push(Object.assign({}, currentColumns[i], columns[i]));
  }
  // sort rankedColumns by object rank value
  rankedColumns.sort((a, b) => {
    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0;
  });
  this.setState({ columns: rankedColumns });
  // get colHeaders sorted by rank
  const columnsHeader = [];
  for (const column of rankedColumns) {
    columnsHeader.push(column.name);
  }
  return columnsHeader;
}

export function getMovedColumnsIndexRange(columns, target) {
  return new Promise(resolve => {
    let movedRange;
    let movedRight;
    // determine if user moved column(s) to right or left
    columns[0] < target ? (movedRight = true) : (movedRight = false);
    if (movedRight) {
      // if moved right
      const movedIndex = target - columns.length - 1;
      movedRange = [columns[0], movedIndex + columns.length];
    } else {
      // if moved left
      const movedIndex = target;
      movedRange = [movedIndex, columns[columns.length - 1]];
    }
    resolve(movedRange);
  });
}

export function mapColumnIdToName() {
  return new Promise(resolve => {
    const currentColumns = this.state.columns;
    const ColumnIdToNameObj = {};
    for (const column of currentColumns) {
      const columnName = column.name;
      const columnId = column.id;
      ColumnIdToNameObj[columnName] = columnId;
    }
    resolve(ColumnIdToNameObj);
  });
}

export function getUpdatedColumnsObj(
  entityColumnsObj,
  movedRangeIndexes,
  afterColumnsArray
) {
  return new Promise(resolve => {
    const updatedColumnOrders = [];
    const movedRangeStart = movedRangeIndexes[0];
    const movedRangeEnd = movedRangeIndexes[movedRangeIndexes.length - 1];
    for (let i = movedRangeStart; i <= movedRangeEnd; i++) {
      const updatedColumns = {};
      const columnName = afterColumnsArray[i];
      const columnId = entityColumnsObj[columnName];
      const columnOrder = i;
      updatedColumns.columnName = columnName;
      updatedColumns.columnId = columnId;
      updatedColumns.columnOrder = columnOrder;
      updatedColumnOrders.push(updatedColumns);
    }
    resolve(updatedColumnOrders);
  });
}

export function getHiddenColsFromResponse(response) {
  const hiddenColumnsIndexes = response.data
    .filter(column => column.hidden === 1)
    .map(column => column.rank);
  return hiddenColumnsIndexes;
}

export function getHiddenColsFromContext(context) {
  const hiddenColIndices = context.hot.getPlugin('hiddenColumns').hiddenColumns;
  const hiddenColProps = [];
  for (const hiddenColIndex of hiddenColIndices) {
    const hiddenColProp = this.refs.hot.hotInstance.colToProp(hiddenColIndex);
    hiddenColProps.push(hiddenColProp);
  }
  return hiddenColProps;
}

export const commonTableSetting = {
  licenseKey: '7fb69-d3720-89c63-24040-8e45b',
  manualColumnMove: true,
  rowHeaders: true,
  height: window.innerHeight - 60,
  colWidths: 120,
  wordWrap: false,
  contextMenu: ['remove_row', 'hidden_columns_show', 'hidden_columns_hide'],
  dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
  filters: true,
  columnSorting: true,
  minSpareRows: 1,
  fixedRowsBottom: 1
};

export function buildObjToAssignOpportunityToContact(
  changes,
  opportunityIDs,
  opportunityIDsNames
) {
  // build object to store OppIDs and contactIDs
  const contactIDs = [];
  for (const change of changes) {
    const rowIndex = change[0];
    const contactID = this.refs.hot.hotInstance.getSourceDataAtRow(rowIndex).id;
    contactIDs.push(contactID);
  }
  if (!opportunityIDs) {
    const selectedOpportunities = changes.map(selectedOpp => selectedOpp[3]);
    if (selectedOpportunities.every((val, i, arr) => val === arr[0]) === true) {
      const oppIDArray = opportunityIDsNames
        .filter(({ name }) => name === selectedOpportunities[0])
        .map(({ id }) => id);
      const oppID = Number(oppIDArray);
      opportunityIDs = selectedOpportunities.map(selectedOpp => oppID);
    }
  }
  const data = {};
  contactIDs.forEach((contactID, oppID) => {
    data[contactID] = opportunityIDs[oppID];
  });
  // check if data has undefined values, meaning multiple relations were deleted
  if (Object.values(data).every(value => value === undefined) === true) {
    Object.keys(data).map(value => (data[value] = 'delete'));
  }
  return data;
}

export function prepareDetailedButton(event, coords, td) {
  this.setState({});
  // create button
  const button = document.createElement('i');
  button.className = 'detail_button material-icons';
  const textnode = document.createTextNode('open_in_new');
  button.appendChild(textnode);
  return button;
}
