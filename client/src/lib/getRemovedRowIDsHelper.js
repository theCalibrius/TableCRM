// helper function to return deleted Row ID(s)
export function getRemovedIds(selectedRows) {
  const startRow = selectedRows[0];
  const endRow = selectedRows[2];
  // smallest and biggest Row ID
  const smallestRowIndex = Math.min(startRow, endRow);
  const biggestRowIndex = Math.max(startRow, endRow);
  // get list of deleted row IDs
  const removedIds = [];
  for (let i = smallestRowIndex; i <= biggestRowIndex; i++) {
    removedIds.push(this.refs.hot.hotInstance.getDataAtRow(i)[0]);
  }
  console.log(removedIds);
  return removedIds;
}
