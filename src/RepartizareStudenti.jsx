import React, {Component} from 'react'
import {Button, Dropdown, TextArea, Menu, MenuItem,Input} from "semantic-ui-react";
import Style from'./Style.css';
import axios from "./axios-API"
import App from "./App";

class RepartizareStudenti extends Component {

    state ={
        tema:null,
        ID_profesor:null,

        ID_student:null,
        Specializari:[],
        Stud:[],
        ID_AnUniv:39,
        ID_specializare:null,
        Profesori: []
    }
    componentDidMount() {
        axios
            .get('Optiune/GetSpecializariListBySefCatedraCoordonatoare?UsernameSefCatedra=tiberiu.foris@unitbv.ro&ID_AnUniv=39')
            .then(response => {
                let Specializari = [];
                for (let specializari of response.data) {
                    Specializari.push({
                        key: specializari.ID_Specializare,
                        value: specializari.ID_Specializare,
                        text: specializari.DenumireSpecializare

                    })
                }
                this.setState({Specializari: Specializari})

            });

    }

    seteazaTema =(prop)=>{
        this.setState({tema:prop})
    }

    seteazaProfesor =(prop)=>{
        this.setState({ID_profesor:prop})
    }
    save=(tema,profesor,student)=>{
        console.log(tema)
            console.log(profesor)
        console.log(student)
        axios
            .post('Optiune/PostOptiune?tema_lucrare='+tema+'&ID_profesor='+profesor+'&ID_student='+student)
            .then(response => {
               console.log("Optiunea a fost adaugata")
            })

    }
    alegeSpecializare =(prop)=>{
        this.setState({ID_specializare:prop})
        console.log(this.state.ID_specializare)
        axios
            .get('Optiune/GetStudentiNeacceptatiListBySpecializare?ID_specializare='+prop)
            .then(response => {
                let Stud = [];
                for (let studenti of response.data) {
                    Stud.push({
                        key: studenti.ID_student,
                        value: studenti.ID_student,
                        text: studenti.NumeIntreg,
                        facultate:studenti.ID_Facultate

                    })
                }
                this.setState({Stud: Stud})


            });


    }
    alegeStud =(prop,facultate)=>{

        this.setState({ID_student:prop})
        axios
            .get('Optiune/GetProfesoriList?ID_AnUniv=' + this.state.ID_AnUniv + '&ID_facultate=' +facultate)

            .then(r => {
                let Profesori = [];
                for (let profesor of r.data) {
                    Profesori.push({
                        key: profesor.ID_Profesor,
                        value: profesor.ID_Profesor,
                        text: profesor.NumeIntreg


                    })
                }
                this.setState({Profesori: Profesori})
            });
    }

    render(){
        return(
            <div className={"body"}>
                <h1 className={"titlu"}>Repartizare studenti</h1>
                <Menu borderless inverted color={'green'}>

                    <MenuItem>
                <Dropdown  className={"dropdownr"}

                    searchInput={{ type: 'string' }}
                    placeholder='Alege specializare'
                    search selection   options={this.state.Specializari}
                    onChange={((e, data) => this.alegeSpecializare(data.value))}
                />
                </MenuItem>

                    <MenuItem>

                <Dropdown  className={"dropdownr"}

                    searchInput={{ type: 'string' }}
                    placeholder='Alege student'
                           search selection   options={this.state.Stud}
                    onChange={((e, data) => this.alegeStud(data.value,data.options[0].facultate))}
                />
                    </MenuItem>
                </Menu>


                <div>Tema  </div>
                <Input  className={"teme-textArea"} onChange={((e, data) => this.seteazaTema(data.value))} />

                <div>Cadrul didactic indrumator</div>
                <Dropdown className={"dropdownr"}
                    search
                    searchInput={{ type: 'string' }}
                    placeholder='Alege profesor coordonator'
                    search selection   options={this.state.Profesori}
                   onChange={((e, data) => this.seteazaProfesor(data.value))}
                />
                <div>
                    <Button className={"ui active button"} color='green'
                           onClick={() => {

                         this.save(this.state.tema,this.state.ID_profesor,this.state.ID_student)}}
                        >
                       Save
                    </Button>
                </div>
            </div>
        )
    }
}
export default RepartizareStudenti;