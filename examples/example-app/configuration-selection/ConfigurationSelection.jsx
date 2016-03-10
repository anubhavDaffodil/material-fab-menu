import Radium from 'radium';
import React from 'react';

import LayoutDropdown from './LayoutDropdown';
import Toggle from './Toggle';
const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
  },

  dropdown: {
    display: 'flex',
    justifyContent: 'center',
  },

  toggles: {
    display: 'flex',
    flexDirection: 'column',
  }

}
const ConfigurationSelection = React.createClass({
  render() {
    const directionToggle = this._makeToggle('direction');
    const miniToggle = this._makeToggle('mini');

    return(
      <div style={styles.container}>
        <div style={styles.dropdown}>
          <LayoutDropdown />
        </div>
        <div style={styles.toggle}>
          {miniToggle}
          {directionToggle}
        </div>
      </div>
      )
  },

  _makeDropdown() {
    const props = {
      items: this.props.animations.animations,
      onChange: this.props.animations.onChange,
      value: this.props.animations.selectedIndex,
    };

    return React.createElement(LayoutDropdown, props);
  },

  _makeToggle(type) {
    let label;
    switch(type) {
      case 'mini':
        label = 'Mini buttons';
        break;
      case 'direction':
        label = 'Direction up';
        break;
    }

    const props = {
      label,
      isToggled: this.props[type].isToggled,
      onToggle: this.props[type].onToggle,
    };

    return React.createElement(Toggle, props);
  },
})