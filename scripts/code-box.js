// Helpers

function showTestResults(treeInput) {
  return blacklist(treeInput)

};

function whitelist(i) {
  if (analyzeCode(i, 'IfStatement'))
    return "Whitelist Test Passed - Contains IfStatement"
  else
    return "Whitelist Test Failed - Does not contain IfStatement"
}

function blacklist(i) {
  if (!analyzeCode(i, 'IfStatement'))
    return "Blacklist Test Passed - Does not contain IfStatement"
  else
    return "Blacklist Test Failed - Should not contain IfStatement"
}

function traverse(node, func) {
      func(node);//1
      for (var key in node) { //2
          if (node.hasOwnProperty(key)) { //3
              var child = node[key];
              if (typeof child === 'object' && child !== null) { //4
                  if (Array.isArray(child)) {
                      child.forEach(function(node) { //5
                          traverse(node, func);
                      });
                  } else {
                      traverse(child, func); //6
                  }
              }
          }
      }
  }

function analyzeCode(ast, type) {
    var var_types = [];
    traverse(ast, function(node) {
      //console.log(node.type);
      var_types.push(node.type);
    });
    if (var_types.includes(type)) {
      return true;
    } else {
      return false;
    }
}


// React Component

var CodeBox = React.createClass({
  parseInput: function(input) {
    return esprima.parse(input);
  },
  getInitialState: function() {
    return { 
      inputCode: this.props.inputCode,
      outputCode: this.parseInput(this.props.inputCode)
    };
  },
  handleCodeChange: function(e) {
    //console.log(JSON.stringify(esprima.parse(e.target.value)));
    this.setState({
      inputCode: e.target.value,
      outputTree: this.parseInput(e.target.value),
      testResults: showTestResults(this.parseInput(e.target.value))
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
