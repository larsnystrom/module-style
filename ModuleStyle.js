'use strict';

var React = require('react');
var withSideEffect = require('react-side-effect');

var ModuleStyle = React.createClass({
  displayName: 'ModuleStyle',

  propTypes: {
    style: React.PropTypes.array.isRequired,
    children: React.PropTypes.element,
  },

  render: function render() {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    } else {
      return null;
    }
  }
});

function reducePropsToState(modules) {
  return modules.reduce(function toCssString(css, module) {
    return css.concat(module.style.toString());
  }, '');
}

var styleElement;
function getStyleElement() {
  if (!styleElement) {
    var head = document.head || document.getElementsByTagName('head')[0];
    styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    head.appendChild(styleElement);
  }

  return styleElement;
}

function handleStateChangeOnClient(css) {
  var style = getStyleElement();

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }
    style.appendChild(document.createTextNode(css));
  }
}

module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(ModuleStyle);
