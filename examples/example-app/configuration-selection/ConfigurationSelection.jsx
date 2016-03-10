import Radium from 'radium';
import React, {PropTypes} from 'react';

import LayoutDropdown from './LayoutDropdown';
import Toggle from './Toggle';

const styles = {
  container: {
    alignItems: 'stretch',
    display: 'flex',
    justifyContent: 'space-around',
  },

  dropdown: {
    alignItems: 'center',
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  toggle : {
    width: '120px',
  },

  toggles: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: '140px',
    padding: '5px',
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
          <div style={styles.toggle}>
            {miniToggle}
          </div>
          <div style={styles.toggle}>
            {directionToggle}
          </div>
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
        label = this.props.mini.isToggled ? 'Mini' : 'Normal';
        break;
      case 'direction':
        label = this.props.direction.isToggled ? 'Up' : 'Down';
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