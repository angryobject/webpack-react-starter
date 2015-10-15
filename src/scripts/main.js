// load styles
import 'normalize.css';
import 'styles/main.sass';

// import polyfills if needed
import 'babel/polyfill';


import App from 'components/app';

function renderApp() {
   ReactDOM.render(<App />, document.getElementById('main'), appDidMount);
}

function appDidMount() {
   /* eslint-disable no-console */
   if (process.env.NODE_ENV !== 'production') {
      console.log('%cApp is mounted', 'font-size: large');
   }
   /* eslint-enable no-console */
}

function main() {
   renderApp();
}

main();
