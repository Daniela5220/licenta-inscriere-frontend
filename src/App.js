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
import {Dimmer, Loader} from "semantic-ui-react";
import FisaPreliminara from "./FisaPreliminara";
import FisaPreliminariiIndrumatori from "./FisaPreliminariiIndrumatori";
import Vize from "./Vize";
import FisaLucrarii from "./FisaLucrarii";
import Semnatura from "./Semnatura";
import axios from "./axios-API";
import FiseLucrariList from "./FiseLucrariList";
import RezultatSustinereLicenta from "./RezultatSustinereLicenta";

class App extends Component {
    state={
        username:null,
        ID_AnUniv:null,
        log:0


    }

    componentDidMount() {
        axios
            .get('Optiune/AnUnivCurent')
            .then(re=> {
                this.setState({ID_AnUniv: re.data[0].ID_AnUniv})
            } )
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
                this.setState({log:1})
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
      {this.state.log===0&&
      <div>
          <Loader active inline='centered'>Loading</Loader>
      </div>
      }
    return (
        <div>
            {/*<DepuneCerere/>*/}
            <AlegeStudent/>
            {/*<RepartizareStudenti/>*/}
            {/*{this.fisapreliminaraacces()}*/}
            {/*{this.fisalucrareafisare()}*/}
            {/*<RezultatSustinereLicenta/>*/}






        </div>
    )
  }
}

export default App;


