'use strict';

var React = require('react');

var TestCrap = React.createClass({
    componentDidMount: () => {console.log('mounted!')},
    render: (props, state) => {
        return <div>with stuff!</div>
    }
});
module.exports = TestCrap;
