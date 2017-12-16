// react & redux
import React from 'react';
import { connect } from 'react-redux';
// styled-component
import styled from 'styled-components';

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
`;

class RightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <RightPanelWrap className="right_panel">
        <RightPanelInner>
          <HidePanelButton>
            <i
              className="material-icons hide_panel"
              onClick={() => {
                const rightPanel = document.getElementsByClassName(
                  'right_panel'
                )[0];
                rightPanel.style.webkitTransform = 'translateX(800px)';
              }}
            >
							arrow_forward
            </i>
            <p>${JSON.stringify(this.props.selectedLead)}</p>
          </HidePanelButton>
        </RightPanelInner>
      </RightPanelWrap>
    );
  }
}

const mapStateToProps = state => ({
  selectedLead: state.leadsReducer.selectedLead
});

export default connect(mapStateToProps, null)(RightPanel);
