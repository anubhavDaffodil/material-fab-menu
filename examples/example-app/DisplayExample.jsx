import React, {PropTypes} from 'react';
import Radium from 'radium';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import {FabMenu, FabMenuButton} from '../../src';

const styles = {
  container: {
    height: '100%',
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
    const fabMenu = this._makeFabMenu();
   return (
    <div style={styles.container}>
      {fabMenu}
    </div>
   ) 
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