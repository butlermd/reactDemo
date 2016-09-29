
var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    TestCrap = require("./chat-window/ChatMessages"),
    mountNode = document.getElementById("app");

var ChatWindow = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
        <div>
            {/*<ChatMessages />*/}
            {/*<UserList />*/}
        </div>
    );
  }
});


ReactDOM.render(<ChatWindow />, mountNode);

