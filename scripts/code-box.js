// Helpers
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

// Tests
var UnitTests = {
  whitelist: function(i, typesArray) {
    if (Array.isArray(typesArray)) {
      var missingTypesArray = [];
      for (var t in typesArray) {
        if (!analyzeCode(i, typesArray[t]))
          missingTypesArray.push(typesArray[t])
      }
      if (missingTypesArray.length == 0) {
        return "Whitelist test passed!"
      } else {
        return "Whitelist test failed - Missing: "+missingTypesArray.join(", ")
      }
    }
  },
  blacklist: function(i, typesArray) {
    if (Array.isArray(typesArray)) {
      var presentTypesArray = [];
      for (var t in typesArray) {
        if (analyzeCode(i, typesArray[t]))
          presentTypesArray.push(typesArray[t])
      }
      if (presentTypesArray.length == 0) {
        return "Blaclist test passed!"
      } else {
        return "Blacklist test failed - Code contains: "+presentTypesArray.join(", ")
      }
    }
  }
};



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
      whitelist: UnitTests.whitelist( this.parseInput(e.target.value), ["ForStatement", "VariableDeclaration"] ),
      blacklist: UnitTests.blacklist( this.parseInput(e.target.value), ["IfStatement", "WhileStatement"] )
    });
    e.target.value = this.state.inputCode;
  },

  render: function() {
    return (
      <div>
        <h3>Enter code here:</h3>
        <textarea className="codeBox" onChange={this.handleCodeChange} value={this.state.inputCode} />
        <h3>Unit tests:</h3>

        <p><b>Check that the code contains these types: ForStatement, VariableDeclaration</b></p>
        <p id="whitelistResults" className="testResults">{ this.state.whitelist }</p>
        <p><b>Check that the code does not contain any of these types: IfStatement, WhileStatement</b></p>
        <p id="blacklistResults" className="testResults">{ this.state.blacklist }</p>
        <h3>Esprima output:</h3>
        <p className="outputBox">{ JSON.stringify(this.state.outputTree) }</p>
      </div>
    );
  }
});


ReactDOM.render(
  <CodeBox inputCode="var foo = 5;"/>, document.getElementById('content')
);
