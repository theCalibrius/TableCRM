const getFields = (row) => {
  let fields = Object.keys(row).join(', ');

  return fields;
};

const getValues = (row) => {
  let values = Object.keys(row).map((key) => { return row[key]; });
  for (let i = 0; i < values.length; i++) {
    if (typeof(values[i]) === 'string') {
      values[i] = `"${values[i]}"`;
    }
  }
  values = values.join(', ');

  return values;
};

const getUpdateQuery = (row) => {
  let fields = Object.keys(row);
  for (let i = 0; i < fields.length; i++) {
    fields[i] = `${fields[i]}=VALUES(${fields[i]})`;
  }
  let updateQuery = fields.join(', ');

  return updateQuery;
};

module.exports = {
  getFields,
  getValues,
  getUpdateQuery
};
