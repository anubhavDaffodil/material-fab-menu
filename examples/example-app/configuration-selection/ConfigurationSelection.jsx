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
    return(
      <div style={styles.container}>
        <div style={styles.dropdown}>
          <LayoutDropdown />
        </div>
        <div style={styles.toggle}>
          <MiniToggle />
          <DirectionToggle />
        </div>
      </div>
      )
  }
})