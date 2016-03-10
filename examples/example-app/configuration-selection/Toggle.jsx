import React from 'react';
import MatToggle from 'material-ui/lib/toggle';

const Toggle = React.createClass({
  render() {
    return (
      <MatToggle
        label={this.props.label}
        onToggle={this.props.onToggle}
        toggled={this.props.isToggled}
      />
    );
  },

});

export default Toggle;