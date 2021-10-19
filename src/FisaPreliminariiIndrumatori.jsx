import React, {Component} from 'react'
import {Button, Dropdown, Menu, MenuItem, Table, TextArea, Modal, Dimmer, Loader, Checkbox} from "semantic-ui-react";
import Style from './Style.css';
import axios from "./axios-API"
import FisaPreliminara from "./FisaPreliminara"

const optiune = {}
let i=0;
let idstud=0;

class FisaPreliminariiIndrumatori extends Component {


    state = {
        ID_An:39,
        fisepreliminarii:[],
        selectedValue:null,
        ID_AnUniv:39,
        username:null,
        an:null,
        showResults:true,
    }


    afisare=()=>{
        console.log(idstud)
        console.log(this.state.username)

        if(this.state.username==null){
            return(
                <div>
                    <Loader active inline='centered'>Loading</Loader>
                </div>

            )
        }else{
            return(

                <div>

                    <FisaPreliminara
                        username={this.state.username}
                        ID_AnUniv={this.state.ID_AnUniv}
                        rol={this.props.rol}

                    />

                </div>

            )

        }
    }

    componentDidMount() {
        axios
            .get('Optiune/GetFisaPreliminaraListByProfesorDirDepUsername')
            .then(r => {
                let fisepreliminarii = [];
                for (let fisa of r.data) {
                    fisepreliminarii.push({
                        key: fisa.ID_fisa_preliminara,
                        value:fisa.ID_student,
                        text: fisa.PrenumeStudent
                    })
                }
                this.setState({fisepreliminarii: fisepreliminarii})
                this.setState({selectedValue:fisepreliminarii[1].value})
                idstud=this.state.fisepreliminarii[i].value
               {this.seteazaUsername(idstud)}


            });
    }
    //buton prin intermediul cauia se obtine ID-ul urmatorului student din lista
    // si se apeleaza functie pentru setarea usernameului
     next=()=> {
        if(i+1<this.state.fisepreliminarii.length) {
            i = i + 1
            idstud = this.state.fisepreliminarii[i].value

            {
                this.seteazaUsername(idstud)
            }
        }else{
            console.log("STOP")
        }
    }
    //buton prin intermediul cauia se obtine ID-ul precedentului student din lista
    // si se apeleaza functie pentru setarea usernameului
    back=()=>{
        if(i>=1) {
            i=i-1
            idstud=this.state.fisepreliminarii[i].value
            {this.seteazaUsername(idstud)}

        }else{
            console.log("STOP")
        }
    }
    //la modificarea usernamului se apeleaza functia afisare
    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.username !== this.state.username &&
            prevState.username !== null
        ) {

            this.afisare();
        }

    }
    // setarea noului username
    seteazaUsername = (IDStudent) => {
        axios
            .get('Optiune/GetStudentUsernameByID?ID_Student=' + IDStudent)
            .then(rez => {
                this.setState({
                    username: rez.data
                })
                    this.setState({selectedValue:IDStudent})
            })
    }




    render() {


        return (

            <div className={"body"}>
                <h1>Fise preliminarii</h1>

                <Menu
                    borderless inverted color={'grey'}>
                    <MenuItem>
                        <Dropdown

                            searchInput={{ type: 'string' }}
                           placeholder='Alege fisa preliminara'
                            search   selection   options={this.state.fisepreliminarii}
                            value={this.state.selectedValue}
                            onChange={((e, data) => this.seteazaUsername(data.value))}
                        />
                    </MenuItem>


                    <MenuItem>

                        <Button className={"savebutton"} color='green' onClick={() => {this.back()}}>Inapoi</Button>
                    </MenuItem>
                    <MenuItem>
                        <Button className={"savebutton"} color='green' onClick={() => {this.next()}}>Urmatorul</Button>
                    </MenuItem>

                </Menu>

                {this.afisare()}

                <Button className={"savebutton"} color='green' onClick={() => {this.back()}}>Inapoi</Button>
                <Button className={"savebutton"} color='green' onClick={() => {this.next()}}>Urmatorul</Button>


            </div>


        )}
}

export default FisaPreliminariiIndrumatori;