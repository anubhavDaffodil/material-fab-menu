'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _velocityReact = require('velocity-react');

require('velocity-animate');

require('velocity-animate/velocity.ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Animations = {
  scaleIn: _velocityReact.velocityHelpers.registerEffect({
    defaultDuration: 500,
    calls: [[{
      scaleX: 1,
      scaleY: 1
    }, 1, {
      easing: [500, 50]
    }]]
  }),

  scaleOut: _velocityReact.velocityHelpers.registerEffect({
    defaultDuration: 500,
    calls: [[{
      scaleX: 0,
      scaleY: 0
    }, 1, {
      easing: [500, 50]
    }]]
  }),

  makeTranslate: function makeTranslate(options) {
    // Get options and assign default isMini

    var _Object$assign = Object.assign({ isMini: false }, options);

    var isEntering = _Object$assign.isEntering;
    var orientation = _Object$assign.orientation;
    var isMini = _Object$assign.isMini;

    // Determine offset

    var offset = void 0;
    switch ('' + orientation + (isEntering ? 'In' : 'Out') + (isMini ? 'Mini' : '')) {
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
    var transforms = void 0;
    var reset = void 0;

    if (isEntering) {
      var translateY = function translateY() {
        var index = Number(this.getAttribute("id"));
        Velocity.hook(this, "translateY", (index + 1) * offset + 'px');
        return 0;
      };

      transforms = {
        translateY: translateY
      };
    } else {
      var _translateY = function translateY() {
        var index = Number(this.getAttribute("id"));
        return (index + 1) * offset;
      };

      transforms = {
        translateY: _translateY,
        scaleX: 0.8,
        scaleY: 0.8
      };

      reset = { scaleX: 1, scaleY: 1 };
    }

    // Return constructed animation
    return _velocityReact.velocityHelpers.registerEffect({
      defaultDuration: 500,
      calls: [[transforms, 1, {
        easing: [500, 50]
      }]],
      reset: reset
    });
  }
};

var FabMenu = _react2.default.createClass({
  displayName: 'FabMenu',

  propTypes: {
    animation: _react2.default.PropTypes.oneOf(['pop', 'popStaggered', 'translate']),
    childrenButtons: _react2.default.PropTypes.node,
    layout: _react2.default.PropTypes.oneOf(['downward', 'upward']),
    onRootMouseUp: _react2.default.PropTypes.func,
    open: _react2.default.PropTypes.bool,
    rootButton: _react2.default.PropTypes.node,
    style: _react2.default.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      layout: 'upward',
      style: {
        top: 600,
        left: 300,
        lineHeight: 0,
        position: 'fixed'
      }
    };
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      {
        ref: 'root',
        style: this.props.style
      },
      this._makeRootButton(),
      _react2.default.createElement(
        _velocityReact.VelocityTransitionGroup,
        {
          enter: this._makeAnimationIn(),
          leave: this._makeAnimationOut()
        },
        this.props.open ? this._makeChildrenButtons() : null
      )
    );
  },
  componentDidMount: function componentDidMount() {
    // Force the re-render if the menu starts with open=true
    if (this.props.open) {
      this.forceUpdate();
    }
  },
  _calculateRelativeChildrenPositions: function _calculateRelativeChildrenPositions() {
    var LENGTH = 56;
    var MINI_LENGTH = 40;
    var SPACE = 5;

    // Get position of root button. Absolute positioning doesn't work as expected
    // with getRootPosition.

    var _ref = this.props.style.position === 'absolute' ? { top: 0, left: 0 } : this._getRootPosition();

    var rootTop = _ref.top;
    var rootLeft = _ref.left;

    // Determine the positions of the childrenButtons.

    var childPosition = this.props.style.position === 'absolute' ? 'absolute' : 'fixed';

    // the left value of a mini button so that it's centered wrt to root
    var miniLeft = rootLeft + (LENGTH - MINI_LENGTH) / 2;
    switch (this.props.layout) {
      case 'downward':
        return this.props.childrenButtons.map(function (button, index) {
          var left = void 0;
          var top = void 0;
          if (button.props.mini) {
            left = miniLeft, top = index * (MINI_LENGTH + SPACE) + LENGTH + SPACE + rootTop;
          } else {
            left = rootLeft;
            top = index * (LENGTH + SPACE) + LENGTH + SPACE + rootTop;
          }

          return {
            left: left,
            top: top,
            position: childPosition
          };
        });
      case 'upward':
        return this.props.childrenButtons.map(function (button, index) {
          var left = void 0;
          var top = void 0;
          if (button.props.mini) {
            left = miniLeft, top = index * (-MINI_LENGTH - SPACE) - MINI_LENGTH - SPACE + rootTop;
          } else {
            left = rootLeft, top = index * (-LENGTH - SPACE) - LENGTH - SPACE + rootTop;
          }
          return {
            left: left,
            top: top,
            position: childPosition
          };
        });
    }
  },
  _getRootPosition: function _getRootPosition() {
    return this.refs.root.getBoundingClientRect();
  },
  _makeAnimationIn: function _makeAnimationIn() {
    var base = {
      display: 'block',
      duration: 500,
      style: {
        display: 'none'
      }
    };

    switch (this.props.animation) {
      case 'pop':
        return Object.assign(base, {
          animation: Animations.scaleIn
        });
      case 'popStaggered':
        return Object.assign(base, {
          animation: Animations.scaleIn,
          stagger: 70
        });
      case 'translate':
        var options = {
          isEntering: true,
          orientation: this.props.layout,
          isMini: this.props.childrenButtons[0].props.mini
        };
        return Object.assign(base, {
          animation: Animations.makeTranslate(options)
        });
    }
  },
  _makeAnimationOut: function _makeAnimationOut() {
    var base = {
      backwards: true,
      display: 'none',
      duration: 500
    };

    switch (this.props.animation) {
      case 'pop':
        return Object.assign(base, {
          animation: Animations.scaleOut
        });
      case 'popStaggered':
        return Object.assign(base, {
          animation: Animations.scaleOut,
          stagger: 70
        });
      case 'translate':
        var options = {
          isEntering: false,
          orientation: this.props.layout,
          isMini: this.props.childrenButtons[0].props.mini
        };
        return Object.assign(base, {
          animation: Animations.makeTranslate(options)
        });
    }
  },
  _makeChildrenButtons: function _makeChildrenButtons() {
    // If this is the iniital render, we want to return null in the case
    // that open is true, and therefore this method is called.
    // A render with the children elements will be forced after the initial
    // render in componentDidMount
    if (!this.refs.root) {
      return null;
    };
    var positions = this._calculateRelativeChildrenPositions();
    var childrenButtonsLength = this.props.childrenButtons.length;
    return this.props.childrenButtons.map(function (button, index) {
      var style = Object.assign({ zIndex: childrenButtonsLength - index }, positions[index]);
      return _react2.default.createElement(
        'div',
        { id: String(index), key: index, style: style },
        _react2.default.createElement(
          'div',
          { style: { position: 'relative', zIndex: childrenButtonsLength - index } },
          button
        )
      );
    });
  },
  _makeRootButton: function _makeRootButton() {
    var _this = this;

    var onMouseUp = function onMouseUp(event) {
      _this.props.onRootMouseUp(event);
      return _this.props.rootButton.props.onMouseUp;
    };

    var rootButton = _react2.default.cloneElement(this.props.rootButton, {
      onMouseUp: onMouseUp,
      style: {
        zIndex: 9000
      }
    });

    return rootButton;
  }
});

exports.default = FabMenu;