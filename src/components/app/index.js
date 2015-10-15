export default React.createClass({

   getInitialState() {
      return {
         name: 'App'
      };
   },

   render() {
      return <div className="App">
         <span className="AppName">{this.state.name}</span> has rendered
      </div>;
   }

});
