export default class App extends React.Component {
   constructor() {
      super();

      this.state = {
         name: 'App'
      };
   }

   componentDidMount() {
      document.documentElement.classList.add('appIsMounted');
   }

   render() {
      return <div className="App">
         <span className="AppName">{this.state.name}</span> component has rendered
      </div>;
   }
}
