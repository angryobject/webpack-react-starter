// load styles
import 'normalize.css';
import 'styles/main.sass';

// import polyfills if needed
import 'babel/polyfill';


import App from 'components/app';

function main() {
   renderApp();
}

function renderApp() {
   React.render(<App />, document.getElementById('app'));
}

main();
