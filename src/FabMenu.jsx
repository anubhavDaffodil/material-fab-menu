import React from 'react';
import ReactDOM from 'react-dom';

import {velocityHelpers, VelocityTransitionGroup} from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

const Animations = {
  scaleIn: velocityHelpers.registerEffect({
    defaultDuration: 500,
    calls: [
      [{
        scaleX: 1,
        scaleY: 1,
      }, 1,
      {
        easing: [500, 50]
      }]
    ]
  }),

  scaleOut: velocityHelpers.registerEffect({
    defaultDuration: 500, 
    calls: [
      [{
        scaleX: 0,
        scaleY: 0,
      }, 1,
      {
        easing: [500, 50]
      }]
    ]
  }),

  makeTranslate(options) {
    // Get options and assign default isMini
    const {isEntering, orientation, isMini} = Object.assign({isMini: false}, options);

    // Determine offset
    let offset;
    switch(`${orientation}${isEntering ? 'In' : 'Out'}${isMini ? 'Mini' : ''}`) {
      case 'downwardIn':
        offset = -61;
        break;
      case 'downwardInMini':
        offset = -45;
        break;
      case 'downwardOut':
        offset = -62;
        break;
      case 'downwardOutMini':
        offset = -47;
        break;
      case 'upwardIn':
        offset = 61;
        break;
      case 'upwardInMini':
        offset = 45;
        break;
      case 'upwardOut':
        offset = 60;
        break;
      case 'upwardOutMini':
        offset = 46;
        break;
    }
    // Set translateY and reset
    let transforms;
    let reset;

    if (isEntering) {
      const translateY = function translateY() {
        const index = Number(this.getAttribute("id"));
        Velocity.hook(this, "translateY", `${(index + 1) * offset}px`)
        return 0;
      };

      transforms = {
        translateY,
      };

    } else {
      const translateY = function translateY() {
        const index = Number(this.getAttribute("id"));
        return (index + 1) * offset;
      };

      transforms = {
        translateY,
        scaleX: 0.8,
        scaleY: 0.8,
      }

      reset = {scaleX: 1, scaleY: 1,};
    }

    // Return constructed animation
    return velocityHelpers.registerEffect({
      defaultDuration: 500,
      calls: [
        [transforms, 1,
          {
            easing: [500, 50],
          }
        ]
      ],
      reset,
    })
  }
};

const FabMenu = React.createClass({
  propTypes: {
    animation: React.PropTypes.oneOf(['pop', 'popStaggered', 'translate']),
    childrenButtons: React.PropTypes.node.isRequired,
    layout: React.PropTypes.oneOf(['downward', 'upward']),
    onRootMouseUp: React.PropTypes.func,
    open: React.PropTypes.bool,
    rootButton: React.PropTypes.node.isRequired,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      animation: 'pop',
      layout: 'upward',
      open: false,
      style: {
        top: 600,
        left: 300,
        position: 'fixed',
      },
    }
  },

  render() {
    return (
      <div 
        ref="root"
        style={this.props.style}
      >
        {this._makeRootButton()}
        <VelocityTransitionGroup
          enter={this._makeAnimationIn()} 
          leave={this._makeAnimationOut()}
        >
          {this.props.open ? this._makeChildrenButtons() : null}
        </VelocityTransitionGroup>
      </div>
      )
  },

  componentDidMount() {
    // Force the re-render if the menu starts with open=true
    if (this.props.open) {
      this.forceUpdate();
    }
  },

  _calculateRelativeChildrenPositions() {
    const LENGTH = 56;
    const MINI_LENGTH = 40;
    const SPACE = 5;

    // Get position of root button. Absolute positioning doesn't work as expected
    // with getRootPosition.
    const {top: rootTop, left: rootLeft} = this.props.style.position === 'absolute'
      ? {top: 0, left: 0}
      : this._getRootPosition();

    // Determine the positions of the childrenButtons.
    const childPosition = this.props.style.position === 'absolute'
      ? 'absolute'
      : 'fixed';

    // the left value of a mini button so that it's centered wrt to root
    const miniLeft = rootLeft + (LENGTH - MINI_LENGTH) / 2;
    switch(this.props.layout){
      case 'downward':
        return this.props.childrenButtons.map((button, index) => {
          let left;
          let top;
          if (button.props.mini) {
            left = miniLeft,
            top = index *  (MINI_LENGTH + SPACE) + LENGTH + SPACE + rootTop;
          } else {
            left = rootLeft;
            top = index * (LENGTH + SPACE) + LENGTH + SPACE + rootTop; 
          }

          return {
            left,
            top,
            position: childPosition
          }
        });
      case 'upward':
        return this.props.childrenButtons.map((button, index) => {
          let left;
          let top;
          if (button.props.mini) {
            left = miniLeft,
            top = index * (-MINI_LENGTH - SPACE) - MINI_LENGTH - SPACE + rootTop;
          } else {
            left = rootLeft,
            top = index * (-LENGTH - SPACE) - LENGTH - SPACE + rootTop;
          }
          return {
            left,
            top,
            position: childPosition
          }
        });
    }
  },

  _getRootPosition() {
    return this.refs.root.getBoundingClientRect();
  },

  _makeAnimationIn() {
    var base = {
      display: 'block',
      duration: 500,
      style: {
        display: 'none',
      },
    };

    switch(this.props.animation) {
      case 'pop':
        return Object.assign(base, {
          animation: Animations.scaleIn,
        });
      case 'popStaggered':
        return Object.assign(base, {
          animation: Animations.scaleIn,
          stagger: 70,
        });
      case 'translate':
        const options = {
          isEntering: true,
          orientation: this.props.layout,
          isMini:  this.props.childrenButtons[0].props.mini,
        };
        return Object.assign(base, {
          animation: Animations.makeTranslate(options),
        })
    }
  },

  _makeAnimationOut() {
    var base = {
      backwards: true,
      display: 'none',
      duration: 500,
    };

    switch(this.props.animation) {
      case 'pop':
        return Object.assign(base, {
          animation: Animations.scaleOut,
        });
      case 'popStaggered':
        return Object.assign(base, {
          animation: Animations.scaleOut,
          stagger: 70,
        });
      case 'translate':
        const options = {
          isEntering: false,
          orientation: this.props.layout,
          isMini: this.props.childrenButtons[0].props.mini,
        };
        return Object.assign(base, {
          animation: Animations.makeTranslate(options),
        });
    }
  },

  _makeChildrenButtons() {
    // If this is the iniital render, we want to return null in the case
    // that open is true, and therefore this method is called.
    // A render with the children elements will be forced after the initial
    // render in componentDidMount
    if (!this.refs.root) {return null};
    const positions = this._calculateRelativeChildrenPositions();
    const childrenButtonsLength = this.props.childrenButtons.length;
    return this.props.childrenButtons.map((button, index) => {
      const style = Object.assign({zIndex: childrenButtonsLength - index}, positions[index]);
      return(
        <div id={String(index)} key={index} style={style}>
          <div style={{position: 'relative', zIndex: childrenButtonsLength - index}}>
            {button}
          </div>
        </div>
        )
    });
  },

  _makeRootButton() {
    const onMouseUp = (event) => {
        this.props.onRootMouseUp(event);
        return this.props.rootButton.props.onMouseUp;
    };

    const rootButton = React.cloneElement(this.props.rootButton, {
      onMouseUp: onMouseUp,
      style: {
        zIndex: 9000,
      }   
    });

    return rootButton;
  },
});

export default FabMenu;