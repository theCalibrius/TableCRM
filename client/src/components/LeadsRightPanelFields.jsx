// react & redux
import React from 'react';
import { connect } from 'react-redux';
// styled-component
import styled from 'styled-components';

const InputTitle = styled.p`
	margin-bottom: 4px;
	color: #888;
`;

const InputWrap = styled.div`
	margin: 0 0 8px 0;
`;

const InputField = styled.input`
	border-radius: 2px;
	margin-bottom: 16px;
	font-size: 13px;
	color: #363636;
	border-bottom: 1px solid #ccc;
	width: 100%;
	max-width: 600px;
	padding: 0 0 5px 0;
	border-radius: 0;
	font-size: 14px;
	font-family: inherit;
	line-height: inherit;
	background-image: none;
	&:focus {
		border-bottom: 2px solid #3f51b5;
	}
`;

class LeadsRightPanelFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.selectedLead ? (
          this.props.selectedLead.map(i => (
            <div key={Object.keys(i)[0]}>
              <InputTitle>{Object.keys(i)[0]}</InputTitle>
              <InputWrap>
                <InputField
                  className="field_input"
                  type="field"
                  placeholder=""
                  defaultValue={i[Object.keys(i)[0]]}
                  key={i[Object.keys(i)[0]]}
                  disabled
                />
              </InputWrap>
            </div>
          ))
        ) : (
          <p>loading...</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedLead: state.leadsReducer.selectedLead
});

export default connect(mapStateToProps, null)(LeadsRightPanelFields);
