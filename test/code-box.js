var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

// example inputs for now
var input1 = "var foo = 5; for (i=0; i<5; i++) {}"
var input2 = "while (true) { if (true) {} }"
var input3 = "if (foo == bar) { for (var i=0; i<5; i++) { } }"

describe('CodeBox', function() {

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



	// Tests 
	
	// A whitelist of specific functionality. 
	// For example, the ability to say "This program MUST use a 'for loop' and a 'variable declaration'."

	it('should include a ForStatement', function() {
		expect(analyzeCode(input1, 'ForStatement')).to.equal(true);
	});



	//A blacklist of specific functionality.
	//For example, the ability to say "This program MUST NOT use a 'while loop' or an 'if statement'."

	it('should not include an IfStatement', function() {
		expect(analyzeCode(input2, 'IfStatement')).to.equal(false);
	});


	//Determine the rough structure of the program. 
	//For example, "There should be a 'for loop' and inside of it there should be an 'if statement'."

	it('should have a ForStatement inside of an IfStatement', function() {

	});
});

