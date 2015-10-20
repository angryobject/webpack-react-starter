export default React.createClass({

   getInitialState() {
      return {
         name: 'App'
      };
   },

   render() {
      return <div className={styles.App}>
         <span className={styles.AppName}>{this.state.name}</span> has rendered
      </div>;
   }

});
