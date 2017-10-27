import React from 'react';
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full.js';

class Opportunities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Opportunities
        <div id="table">
          <HotTable
            root="hot"
            ref="hot"
            settings={{
              licenseKey: '58e7f6926ee806184e95a749',
              colHeaders: true,
              rowHeaders: true
            }}
          />
        </div>
      </div>
    );
  }
}
export default Opportunities;
