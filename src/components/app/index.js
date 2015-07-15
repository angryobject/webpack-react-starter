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
         {this.state.name} component has rendered
      </div>;
   }
}
