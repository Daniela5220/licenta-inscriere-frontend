import React, {Component} from 'react'
import {
    Button,
    Dropdown,
    Menu,
    MenuItem,
    Table,
    TextArea,
    Modal,
    Dimmer,
    Loader,
    Segment,
    Image
} from "semantic-ui-react";
import Style from './Style.css';
import axios from "./axios-API"
import FisaPreliminara from "./FisaPreliminara"
import FisaLucrarii from "./FisaLucrarii";

const optiune = {}
let i=0;
let idstud=0;
class FiseLucrariList extends Component {


    state = {
        ID_An:39,

        ID_AnUniv:39,
        usernameStudent:null,
        an:null,
        showResults:true,
        fiselucrari:[]



    }

    afisare=()=>{
        console.log(idstud)
        console.log(this.state.usernameStudent)

        if(this.state.usernameStudent==null){
            return(

                <div>
                            <Loader active inline='centered'>Loading</Loader>
                </div>

            )
        }else{
            return(

                <div>
                    {console.log("Retureneaza ceva")}
                    <FisaLucrarii
                        usernameStudent={this.state.usernameStudent}
                        ID_AnUniv={this.state.ID_AnUniv}
                    />
                    {console.log("Unde e problema")}


                </div>

            )

        }
    }

    componentDidMount() {



        axios
            .get('Optiune/GetFisaLucrareListByProfesorDirDepUsername?ID_AnUniv=39')
            .then(r => {
                let fiselucrari = [];
                for (let fisa of r.data) {
                    fiselucrari.push({
                        key: fisa.ID_fisa_lucrare_absolvire,
                        value:fisa.ID_student,
                        text: fisa.PrenumeStudent



                    })
                }
                this.setState({fiselucrari: fiselucrari})
                idstud=this.state.fiselucrari[i].value
                {this.seteazaUsername(idstud)}


            });
    }
    next=()=> {

        if(i+1<this.state.fiselucrari.length) {
            i = i + 1
            idstud = this.state.fiselucrari[i].value

            {
                this.seteazaUsername(idstud)
            }
        }else{
            console.log("STOP")

        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.usernameStudent !== this.state.usernameStudent &&
            prevState.usernameStudent !== null
        ) {

            this.afisare();

        }

    }



    back=()=>{
        if(i>=1) {
            i=i-1
            idstud=this.state.fiselucrari[i].value
            {this.seteazaUsername(idstud)}

        }else{
            console.log("STOP")
        }


    }
    seteazaUsername = (IDStudent) => {
        axios
            .get('Optiune/GetStudentUsernameByID?ID_Student=' + IDStudent)
            .then(rez => {
                this.setState({
                    usernameStudent: rez.data
                })

            })


    }




    render() {


        return (

            <div className={"body"}>

                <Menu
                    borderless inverted color={'grey'}>
                    <MenuItem>
                        <Dropdown

                            searchInput={{ type: 'string' }}
                            placeholder='Alege fisa lucrării'
                            search selection   options={this.state.fiselucrari}
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

export default FiseLucrariList;