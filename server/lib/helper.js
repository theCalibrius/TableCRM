module.exports.getFieldsArr = (row) => {
  let fieldsArr = Object.keys(row);

  return fieldsArr;
};

module.exports.getFields = (fieldsArr) => {
  let fields = fieldsArr.join(', ');

  return fields;
};

module.exports.getValues = (row, fieldsArr) => {
  let values = fieldsArr.map((field) => { return row[field]; });
  for (let i = 0; i < values.length; i++) {
    if (typeof(values[i]) === 'string' && values[i] !== 'null') {
      values[i] = `"${values[i]}"`;
    }
  }
  values = values.join(', ');

  return values;
};

module.exports.getUpdateQuery = (row) => {
  let fields = Object.keys(row);
  for (let i = 0; i < fields.length; i++) {
    fields[i] = `${fields[i]}=VALUES(${fields[i]})`;
  }
  let updateQuery = fields.join(', ');

  return updateQuery;
};

