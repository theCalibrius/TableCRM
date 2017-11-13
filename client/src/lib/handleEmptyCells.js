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
      if (field in numericCols || field in dateCols) {
        if (change[3] === '') { change[3] = 'null'; }
      }
    }
  }
};

