var CodeBox = React.createClass({
  getInitialState: function() {
    return { inputCode: "// var foo = 5;" };
  },
  handleCodeChange: function(e) {
    console.log(JSON.stringify(esprima.parse(e.target.value)));
    this.setState({inputCode: e.target.value});
    e.target.value = this.state.inputCode;
  },
  render: function() {
    return (
      <textarea className="codeBox" onChange={this.handleCodeChange} value={this.state.inputCode} />
    );
  }
});


ReactDOM.render(
  <CodeBox />,
  document.getElementById('content')
);