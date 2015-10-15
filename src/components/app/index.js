import { connect } from 'react-redux';
import { changeExclamation } from 'actions';


const App = React.createClass({

   render() {
      const { dispatch, exclamation } = this.props;

      return (
         <div className={styles.App}
            onClick={() => dispatch(changeExclamation(exclamation))}
         >

            <span className={styles.AppName}>App</span>
            {` has rendered. ${this.props.exclamation}`}

         </div>
      );
   }

});

export default connect(state => state)(App);
