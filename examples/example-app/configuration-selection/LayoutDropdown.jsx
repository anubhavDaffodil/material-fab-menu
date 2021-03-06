import React from 'react';
import Radium from 'radium';

import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

const styles = {
  dropDown: {
    width: '60%'
  }
};

const LayoutDropdown = React.createClass({
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.string),
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.number,
  },

  render() {
    const menuItems = this._makeMenuItems();
    
    return (
      <DropDownMenu
        autoWidth={false}
        onChange={this._handleChange}
        style={styles.dropDown}
        value={this.props.value}
      >
        {menuItems}
      </DropDownMenu>
      );
  },

  _handleChange(event, index, value) {
    this.props.onChange(index);
  },

  _makeMenuItems() {
    return this.props.items.map((item, index) => {
      return (
        <MenuItem
          key={index}
          primaryText={item}
          value={index}
        />
        );
    });
  }

});

export default Radium(LayoutDropdown);