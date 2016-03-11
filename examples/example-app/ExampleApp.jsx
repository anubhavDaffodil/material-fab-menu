import React from 'react';
import Radium from 'radium';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Divider from 'material-ui/lib/divider';

import {FabMenu, FabMenuButton} from '../../src';
import ConfigurationSelection from './configuration-selection/ConfigurationSelection';
import DisplayExample from './DisplayExample';
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
  appContainer: {
    height: '100%',
  },

  container: {
    height: '100vh',
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
              {configurationSelection}
              <Divider />
              {displayExample}
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

  _makeFabMenu() {
    const childrenButtons = Array.from(Array(4).keys()) 
      .map((i) => {
        return (
            <FabMenuButton
              key={i}
              mini={this.state.isMini}
              secondary={true}
            >
              <ContentAdd />
            </FabMenuButton>
          )
      });

    const rootButton = (
        <FabMenuButton>
          <ContentAdd />
        </FabMenuButton>
      );

    const style = Object.assign({}, styles.fabMenu, {
      bottom: this.state.isDirectionUp ? '0px' : '',
      top: this.state.isDirectionUp ? '' : '0px',
    });

    const props = {
      animation: animations[this.state.indexOfSelectedAnimation],
      childrenButtons,
      layout: this.state.isDirectionUp ? 'upward' : 'downward',
      rootButton,
      style,
    };

    return React.createElement(FabMenu, props);
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

export default ExampleApp;