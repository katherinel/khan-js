function showTestResults(treeInput) {
  whitelist(treeInput);
  blacklist(treeInput);
};

function whitelist(i) {
  return "test passed"
}

function blacklist(i) {
  return "test passed"
}

var CodeBox = React.createClass({
  parse: function(input) {
    return esprima.parse(input);
  },
  getInitialState: function() {
    return { 
      inputCode: this.props.inputCode,
      outputCode: this.parse(this.props.inputCode)
    };
  },
  handleCodeChange: function(e) {
    //console.log(JSON.stringify(esprima.parse(e.target.value)));
    this.setState({
      inputCode: e.target.value,
      outputTree: this.parse(e.target.value),
      testResults: showTestResults(this.parse(e.target.value))
    });
    e.target.value = this.state.inputCode;
  },
  render: function() {
    return (
      <div>
        <h3>Enter code here:</h3>
        <textarea className="codeBox" onChange={this.handleCodeChange} value={this.state.inputCode} />
        <h3>Esprima output:</h3>
        <p className="outputBox">{ JSON.stringify(this.state.outputTree) }</p>
        <h3>Unit tests:</h3>
        <p className="unitTests">{ this.state.testResults }</p>
      </div>
    );
  }
});


ReactDOM.render(
  <CodeBox inputCode="var foo = 5;"/>, document.getElementById('content')
);
