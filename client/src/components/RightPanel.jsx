// react & redux
import React from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import RightPanelLead from './RightPanelLead.jsx';
// styled-component
import styled from 'styled-components';
import { getLeadById } from '../actions/leadsActions';

const RightPanelWrap = styled.div`
	overflow-x: hidden;
	overflow-y: scroll;
	height: calc(100vh - 65px);
	position: fixed;
	background-color: #fff;
	z-index: 1000000000;
	width: 800px;
	right: -800px;
	bottom: 0;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.24);
	border-radius: 2px;
	transition: transform 0.3s ease;
`;

const RightPanelInner = styled.div`
	padding: 28px;
`;

const HidePanelButton = styled.div`
	cursor: pointer;
	margin: 0 0 20px 0;
	width: 40px;
`;

const InputWrap = styled.div`
	margin: 0 0 8px 0;
`;

const InputTitle = styled.p`
	margin-bottom: 4px;
	color: #888;
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

const Test = () => <div>test</div>;

class RightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (!this.props.selectedLead) {
      const rowId = this.props.match.params.id;
      this.props.dispatch(getLeadById(rowId));
    }
    const rightPanel = document.getElementsByClassName('right_panel')[0];
    if (rightPanel.style.webkitTransform === '') {
      rightPanel.style.webkitTransform = 'translateX(-800px)';
    }
  }
  render() {
    return (
      <RightPanelWrap className="right_panel">
        <RightPanelInner>
          {/* <Route exact path="/leads/:id" component={RightPanelLead} /> */}
          <HidePanelButton>
            <i
              className="material-icons hide_panel"
              onClick={() => {
                if (this.props.match.path === '/opportunities/:id') {
                  this.props.history.push('/opportunities');
                } else if (this.props.match.path === '/leads/:id') {
                  this.props.history.push('/leads');
                }
                const rightPanel = document.getElementsByClassName(
                  'right_panel'
                )[0];
                rightPanel.style.webkitTransform = 'translateX(800px)';
              }}
            >
							arrow_forward
            </i>
          </HidePanelButton>
          {this.props.selectedLead
            ? this.props.selectedLead.map(i => (
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
            : null}
        </RightPanelInner>
      </RightPanelWrap>
    );
  }
}

const mapStateToProps = state => ({
  selectedLead: state.leadsReducer.selectedLead
});

export default connect(mapStateToProps, null)(RightPanel);
