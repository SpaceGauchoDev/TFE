// framework
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// styles
import './styles.css'; // imports styles and fonts
import 'bootstrap/dist/css/bootstrap.min.css';

// fonts
// to install more fonts: npm install @fontsource/NAME_OF_FONT
// find fonts here: https://fonts.google.com/
import "@fontsource/karla"; 
import "@fontsource/montecarlo"; 

// my stuffs
import store from './store/store';
import Login from './components/pages/login';

const App = () => {
  return (
    <Login />
  );
}

/*
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Menu />
        <hr />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/registro" component={Registro} />
          <Route path="/principal" component={Principal} />
          <Route component={NoEncontrado} />
        </Switch>
      </Router>
    </Provider>
  );
}
*/
export default App;