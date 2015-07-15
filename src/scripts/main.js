import 'normalize.css';
import 'styles/main.sass';

import React from 'react';
import App from 'components/app';

function main() {
   renderApp();
}

function renderApp() {
   React.render(<App /> ,document.getElementById('app'));
}

main();
