export function handleEmptyCells(changes, source) {
  if (changes && source !== 'loadData') {
    for (let change of changes) {
      if (change[3] === '') { change[3] = 'null'; }
    }
  }
};
