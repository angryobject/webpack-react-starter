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
   /*eslint no-console: 0*/
   if (process.env.NODE_ENV !== 'production') {
      console.log('%cApp is mounted', 'font-size: large');
   }
}

function main() {
   renderApp();
}

main();
