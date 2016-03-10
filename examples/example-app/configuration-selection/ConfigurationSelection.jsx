import Radium from 'radium';
import React, {PropTypes} from 'react';

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
    flex: 2,
    justifyContent: 'center',
  },

  toggles: {
    alignItems: 'flex-end',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  }

}
const ConfigurationSelection = React.createClass({
  propTypes: {
    animations: PropTypes.shape({
      animations: PropTypes.arrayOf(PropTypes.string),
      onChange: PropTypes.function,
      value: PropTypes.function,
    }),

    direction: PropTypes.shape({
      isToggled: PropTypes.bool,
      onToggle: PropTypes.func,
    }),

    mini: PropTypes.shape({
      isToggled: PropTypes.bool,
      onToggle: PropTypes.func,
    }),
  },

  render() {
    const directionToggle = this._makeToggle('direction');
    const miniToggle = this._makeToggle('mini');
    const layoutDropdown = this._makeDropdown();

    return(
      <div style={styles.container}>
        <div style={styles.dropdown}>
          {layoutDropdown}
        </div>
        <div style={styles.toggles}>
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
});

export default Radium(ConfigurationSelection);