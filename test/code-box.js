var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var input = "var foo = 5;"

describe('CodeBox', function() {

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

	function analyzeCode(code, type) {
	    var ast = esprima.parse(code);
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
	
	// A whitelist of specific functionality. 
	// For example, the ability to say "This program MUST use a 'for loop' and a 'variable declaration'."

	//var types = ['ForStatement', 'VariableDeclaration'];
	it('should include a ForStatement', function() {
		expect(analyzeCode(input, 'ForStatement')).to.equal(true);
	});


	//A blacklist of specific functionality.
	//For example, the ability to say "This program MUST NOT use a 'while loop' or an 'if statement'."

	it('should not include a ForStatement', function() {
		expect(analyzeCode(input, 'ForStatement')).to.equal(false);
	});




});

