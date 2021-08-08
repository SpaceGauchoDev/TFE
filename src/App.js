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
import Store from './store/store';
import Login from './components/login/login';
import Register from './components/register/register';
import Dashboard from './components/dashboard/dashboard';

const App = () => {
  return (
    <Provider store={Store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>    
  );
}

export default App;