import React from 'react';

import Divider from 'material-ui/lib/divider';

import ConfigurationSelection from './configuration-selection/ConfigurationSelection';
import PaperContainer from './PaperContainer';

const animations = [
  'translate',
  'pop',
  'popStaggered',
];

const layoutClasses = {
  content: "col-xs-12 col-md-6 col-lg-4",
  padding: "col-xs-0 col-md-3 col-lg-4",
};

const styles = {
  container: {
    height: '100vh',
  },

  appContainer: {
    height: '100%',
  }
};



const ExampleApp = React.createClass({
  getInitialState() {
    return {
      isDirectionUp: true,
      isMini: false,
      indexOfSelectedAnimation: 0,
    };
  },

  render() {
    const configurationSelection = this._makeConfigurationSelection();
    return (
      <div 
        className="container-fluid"
        style={styles.container}
      >
        <div className={layoutClasses.padding} />
        <div className={layoutClasses.content} style={styles.appContainer}>
          <PaperContainer>
            {configurationSelection}
            <Divider />
          </PaperContainer>
        </div>
        <div className={layoutClasses.padding} />
      </div>
      )
  },

  _makeConfigurationSelection() {
    const props = {
      animations: {
        animations,
        onChange: this._setNewAnimation,
        selectedIndex: this.state.indexOfSelectedAnimation,
      },

      direction: {
        isToggled: this.state.isDirectionUp,
        onToggle: this._toggleDirection,
      },

      mini: {
        isToggled: this.state.isMini,
        onToggle: this._toggleMini,
      }
    };

    return React.createElement(ConfigurationSelection, props);
  },

  _setNewAnimation(index) {
    this.setState({selectedAnimation: index});
  }, 

  _toggleDirection() {
    this.setState({isDirectionUp: !this.state.isDirectionUp});
  },

  _toggleMini() {
    this.setState({isMini: !this.state.isMini});
  }
});

export default ExampleApp;