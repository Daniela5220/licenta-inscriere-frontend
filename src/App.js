/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
import AlegeStudent from "./AlegeStudent";
import {Component} from "react";
import DepuneCerere from "./DepuneCerere";
import Optiune from "./Optiune";
import RepartizareStudenti from "./RepartizareStudenti";
import {Dimmer} from "semantic-ui-react";
import FisaPreliminara from "./FisaPreliminara";
import FisaPreliminariiIndrumatori from "./FisaPreliminariiIndrumatori";

class App extends Component {
    state={
        username:'maican@unitbv.ro',
        ID_AnUniv:39
    }
    fisapreliminaraacces=()=>{

        if(this.state.username==='maican@unitbv.ro'){
            return(
                <FisaPreliminariiIndrumatori/>
                )


        }else{
            return(
                <FisaPreliminara
                    username={this.state.username}
                    ID_AnUniv={this.state.ID_AnUniv}
                />
            )
        }
    }

  render() {
    return (
        <div>

            {this.fisapreliminaraacces()}

        </div>
    )
  }
}

export default App;


