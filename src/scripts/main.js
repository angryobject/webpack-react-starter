// load styles
import 'normalize.css';
import 'styles/main.sass';

// import polyfills if needed
import 'babel/polyfill';


import App from 'components/app';

function renderApp() {
   ReactDOM.render(<App />, document.getElementById('main'));
}

function main() {
   renderApp();
}

main();
