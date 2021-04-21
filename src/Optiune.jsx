import React, {Component} from 'react'
import {Button, Dropdown,Input} from "semantic-ui-react";
import Style from'./Style.css';
import axios from "./axios-API"
const optiune = {

}
class Optiune extends Component {
    constructor(props) {
        super(props)

    }
alegeProfesor=(profesorAles)=>{

        this.props.actualizareOptiuniState(this.props.index,"ID_profesor",profesorAles)


    }

alegeTema=(TemaAleasa)=>{
    this.props.actualizareOptiuniState(this.props.index,"Tema_lucrare",TemaAleasa)

    }



    render(){
        return(
            <div>
            <div>Optine student</div>
                <div>Tema </div>
                <Input className={"teme-textArea"}
                       onChange={((e, data) => this.alegeTema(data.value))}
                       defaultValue={this.props.optiuneCopy.Tema_lucrare}
                       placeholder={"Intodu tema lucrarii"}/>

                <div>Cadrul didactic indrumator</div>
                <Dropdown

                    searchInput={{ type: 'string' }}
                    placeholder='Alege profesor coordonator'
                    search selection   options={this.props.listaProfesori}
                    defaultValue={this.props.optiuneCopy.ID_profesor}
                    onChange={((e, data) => this.alegeProfesor(data.value))}
                />





            </div>
        )
    }

}
export   default Optiune;