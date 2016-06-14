var CodeBox = React.createClass({
  render: function() {
    return (
      <div className="codeBox">
        <h1>Code goes here</h1>
      </div>
    );
  }
});


ReactDOM.render(
  <CodeBox />,
  document.getElementById('content')
);