# What

A Webpack starter template. Includes:

* Babel
* React and jsx
* Sass stylesheets
* CSS Modules
* PostCSS + Autoprefixer
* Image loaders
* Dev server with hot reloading

See `webpack.config.js` for details.

`React` and `ReactDOM` variables are available on demand via `baggage-loader`.
`styles` variable is available inside components, containing mappings of your CSS classes (same as `import styles from './styles.sass'`).

# How

```
# install deps
npm install

# run dev server
gulp serve

# build
gulp
```

# Todo

* Add a flux implementation
* Add tests
* ~~Create yeoman generators for easy scaffolding~~ ([https://github.com/angryobject/generator-webpack](https://github.com/angryobject/generator-webpack))
