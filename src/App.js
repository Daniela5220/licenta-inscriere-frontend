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
import Vize from "./Vize";
import FisaLucrarii from "./FisaLucrarii";
import Semnatura from "./Semnatura";
import axios from "./axios-API";
import FiseLucrariList from "./FiseLucrariList";
import SetariDate from "./SetariDate";
class App extends Component {
    state={
        username:null,
        ID_AnUniv:39,


    }

    componentDidMount() {
        axios
            .get('Optiune/GetUsername')
            .then(re => {
                this.setState({username: re.data});
                console.log(this.state.username)
            })
        axios
            .get('Optiune/Rol')
            .then(re => {
                this.setState({rol: re.data});
                console.log(this.state.rol)
            })


    }
    fisapreliminaraacces=()=>{

        console.log(this.state.rol)

        if(this.state.rol==0||this.state.rol==1){
            return(
                <FisaPreliminariiIndrumatori
                rol={this.state.rol}
                />
                )


        }
        if(this.state.rol==2){
            return(
                <FisaPreliminara
                    username={this.state.username}
                    ID_AnUniv={this.state.ID_AnUniv}
                    rol={this.state.rol}
                />
            )
        }

    }
    fisalucrareafisare=()=>{
        console.log(this.state.rol)
        if(this.state.rol==0||this.state.rol==1){
            return(
                <FiseLucrariList
                    rol={this.state.rol}
                />
            )


        }
        if(this.state.rol==2){
            return(
                <FisaLucrarii
                    usernameStudent={this.state.username}
                    ID_AnUniv={this.state.ID_AnUniv}
                    rol={this.state.rol}
                />

            )
        }


        }




  render() {
    return (
        <div>
            {/*<DepuneCerere/>*/}
            {/*<AlegeStudent/>/!**!/*/}
            {/*<RepartizareStudenti/>*/}
            {/*{this.fisapreliminaraacces()}*/}
            {/*<FiseLucrariList/>*/}
            {this.fisalucrareafisare()}
            {/*<SetariDate/>*/}





        </div>
    )
  }
}

export default App;


