// A whitelist of specific functionality. 
// For example, the ability to say "This program MUST use a 'for loop' and a 'variable declaration'."

// pass in an array of the types that should be included e.g. ['ForStatement', 'VariableDeclaration']

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('Compare Numbers', function() {
	it('1 should equal 1', function() {
	  expect(1).to.equal(1);
	});
});