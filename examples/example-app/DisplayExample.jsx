import React, {PropTypes} from 'react';
import Radium from 'radium';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import CodeDisplay from './CodeDisplay';
import {FabMenu, FabMenuButton} from '../../src';

const styles = {
  codeDisplayContainer: {
    display: 'flex',
    flex: 1,
    paddingRight: '70px',
    width: '100%'
  },

  container: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    width: '100%',
  },

  fabMenu : {
    margin: '3px',
    position: 'absolute',
    right: '0px',
  },
};

const DisplayExample = React.createClass({
  propTypes: {
    animation: PropTypes.string,
    isDirectionUp: PropTypes.bool,
    isMini: PropTypes.bool,
    isOpen: PropTypes.bool,
    onRootClick: PropTypes.func,
  },

  render() {
    const codeDisplay = this._makeCodeDisplay();
    const fabMenu = this._makeFabMenu();
   return (
    <div style={styles.container}>
      <div style={styles.codeDisplayContainer}>
        {codeDisplay}
      </div>
      {fabMenu}
    </div>
   ) 
  },

  _makeCodeDisplay() {
    const props = {
      configuration: {
        animation: this.props.animation,
        isDirectionUp: this.props.isDirectionUp,
        isMini: this.props.isMini
      }
    };

    return React.createElement(CodeDisplay, props);
  },

  _makeFabMenu() {
    const childrenButtons = Array.from(Array(4).keys()) 
      .map((i) => {
        return (
            <FabMenuButton
              key={i}
              mini={this.props.isMini}
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
      bottom: this.props.isDirectionUp ? '0px' : '',
      top: this.props.isDirectionUp ? '' : '0px',
    });

    const props = {
      animation: this.props.animation,
      childrenButtons,
      layout: this.props.isDirectionUp ? 'upward' : 'downward',
      onRootMouseUp: this.props.onRootClick,
      open: this.props.isOpen,
      rootButton,
      style,
    };

    return React.createElement(FabMenu, props);
  },
});

export default Radium(DisplayExample);