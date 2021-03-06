import React from 'react';
import Radium from 'radium';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Divider from 'material-ui/lib/divider';

import {FabMenu, FabMenuButton} from '../../src';
import ConfigurationSelection from './configuration-selection/ConfigurationSelection';
import DisplayExample from './display-example/DisplayExample';
import PaperContainer from './PaperContainer';

require('./style.css');

const animations = [
  'translate',
  'pop',
  'popStaggered',
];

const layoutClasses = {
  content: "col-xs-12 col-md-8",
  padding: "col-xs-0 col-md-2",
};

const styles = {
  appContainer: {
    height: '100%',
  },

  container: {
    height: '100vh',
  },

  exampleContainer: {
    display: 'flex',
  },

  paperContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
  }
};



const ExampleApp = React.createClass({
  getInitialState() {
    return {
      isDirectionUp: true,
      isMini: false,
      isOpen: false,
      indexOfSelectedAnimation: 0,
    };
  },

  render() {
    const configurationSelection = this._makeConfigurationSelection();
    const displayExample = this._makeDisplayExample();
    return (
      <div 
        className="container-fluid"
        style={styles.container}
      >
        <div className={layoutClasses.padding} />
        <div className={layoutClasses.content} style={styles.appContainer}>
          <PaperContainer>
            <div style={styles.paperContainer}>
              <div >
                {configurationSelection}
              </div>
              <div style={styles.exampleContainer}>
                {displayExample}
              </div>
            </div>
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

  _makeDisplayExample() {
    const props = {
      animation: animations[this.state.indexOfSelectedAnimation],
      isDirectionUp: this.state.isDirectionUp,
      isMini: this.state.isMini,
      isOpen: this.state.isOpen,
      onRootClick: this._toggleOpen,
    };

    return React.createElement(DisplayExample, props);
  },

  _setNewAnimation(index) {
    this.setState({indexOfSelectedAnimation: index});
  }, 

  _toggleDirection() {
    this.setState({isDirectionUp: !this.state.isDirectionUp});
  },

  _toggleMini() {
    this.setState({isMini: !this.state.isMini});
  },

  _toggleOpen() {
    this.setState({isOpen: !this.state.isOpen});
  },
});

export default Radium(ExampleApp);