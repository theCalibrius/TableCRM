// react & redux
import React from 'react';
import { connect } from 'react-redux';
// redux actions
import { getLeads } from '../actions/leadsActions';
// api call
import axios from 'axios';
// handsontable
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full.js';
import 'handsontable-pro/dist/handsontable.full.css';

class Leads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getLeads());
  }
  render() {
    return <div>Leads</div>;
  }
}

const mapStateToProps = state => {
  return {
    leads: state.leadsReducer.leads
  };
};

export default connect(mapStateToProps, null)(Leads);
