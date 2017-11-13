export function handleEmptyCells(changes, source) {
  let numericCols = {
    estimatedValue: true,
    winProbability: true
  };

  let dateCols = {
    expectedCloseDate: true
  };

  if (changes && source !== 'loadData') {
    for (let change of changes) {
      let field = change[1];
      if (field in numericCols) {
        if (change[3] === '') { change[3] = '0'; }
      } else if (field in dateCols) {
        if (change[3] === '') { change[3] = '1900-01-01'; }
      }
    }
  }
};

