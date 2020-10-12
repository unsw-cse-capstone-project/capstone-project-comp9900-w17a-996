import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';

import './App.css';
import MovieDetial from './routes/MovieDetail';
import WishList from './routes/WishList';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route component={MovieDetial} path="/movie"/>
          <Route component={WishList} path="/wishList"/>
        </Switch>
      </HashRouter>
    )
  }
  /*const [initialData, setInitialData] = useState([{}])

  useEffect(() => {
    fetch('/app').then(
      response => response.json()
    ).then(data => setInitialData(data))
  });
  return (
    <div className="App">
      <h1>{initialData.title}</h1>
      <br/>
      <h2>{initialData.message}</h2>
    </div>
  );*/
}

export default App;
