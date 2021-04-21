import React, {Component} from 'react'
import {Button, Dropdown, Table, TextArea} from "semantic-ui-react";
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
        usernameprofesor:"maican@unitbv.ro",
        ID_AnUniv:39,
        username:null,
        an:null


    }

    afisare=()=>{
        console.log(idstud)
        console.log(this.state.username)

        if(this.state.username==null){
            return(
                "Se incarca datele"
            )
        }else{
            return(

                <div>

                    <FisaPreliminara
                        username={this.state.username}
                        ID_AnUniv={this.state.ID_AnUniv}

                    />

                </div>

            )

        }
    }

    componentDidMount() {



        axios
            .get('Optiune/GetFisaPreliminaraListByProfesorUsername?Username='+this.state.usernameprofesor+'&ID_AnUniv='+this.state.ID_AnUniv)
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
                idstud=this.state.fisepreliminarii[i].value
               {this.seteazaUsername(idstud)}


            });
    }
     next=()=> {
         i = i + 1
         idstud = this.state.fisepreliminarii[i].value

         {
             this.seteazaUsername(idstud)
         }

     }
    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.username !== this.state.username &&
            prevState.username !== null
        ) {

            this.afisare();
        }

    }



    back=()=>{
        i=i-1
        idstud=this.state.fisepreliminarii[i].value
        {this.seteazaUsername(idstud)}

    }
    seteazaUsername = (IDStudent) => {
        axios
            .get('Optiune/GetStudentUsernameByID?ID_Student=' + IDStudent)
            .then(rez => {
                this.setState({
                    username: rez.data
                })
                console.log(this.state.username)
            })


    }




    render() {


        return (

            <div className={"body"}>
                <h1>Fise preliminarii</h1>
                <Dropdown

                    searchInput={{ type: 'string' }}
                    placeholder='Alege fisa preliminara'
                    search selection   options={this.state.fisepreliminarii}
                     onChange={((e, data) => this.seteazaUsername(data.value))}

                />

                {this.afisare()}

                <Button className={"savebutton"} color='green' onClick={() => {this.back()}}>Inapoi</Button>
                <Button className={"savebutton"} color='green' onClick={() => {this.next()}}>Urmatorul</Button>

            </div>


        )}
}

export default FisaPreliminariiIndrumatori;