const getFields = (row) => {
  if ('num' in row) {
    delete row.num;
  }

  let fields = Object.keys(row).join(', ');

  return fields;
};

const getValues = (row) => {
  if ('num' in row) {
    delete row.num;
  }

  let values = Object.keys(row).map((key) => { return row[key]; });
  for (let i = 0; i < values.length; i++) {
    if (typeof(values[i]) === 'string') {
      values[i] = `"${values[i]}"`;
    }
  }
  values = values.join(', ');

  return values;
};

module.exports = {
  getFields,
  getValues
};
