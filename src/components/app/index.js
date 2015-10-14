export default React.createClass({

   getInitialState() {
      return {
         name: 'App'
      };
   },

   componentDidMount() {
      /*eslint no-console: 0*/
      if (DEBUG) { console.log('App is mounted'); }
   },

   render() {
      return <div className="App">
         <span className="AppName">{this.state.name}</span> has rendered
      </div>;
   }

});
