import React, {Component} from 'react'
import {Button, Checkbox, Dropdown, Grid, GridColumn, GridRow, Icon, Input} from "semantic-ui-react";
import Style from'./Style.css';
import axios from "./axios-API"
const optiune = {

}
class Optiune extends Component {
    constructor(props) {
        super(props)

    }
    iconStatus=(param)=>{
        console.log(param)
        if(param=='ADMIS'){
            return (
                <div>
                <Icon color='green' name='check circle outline' />
                <label>{param}</label>
                 </div>
            )
        }else
            if(param==null){
            }
            else{
            return(
                <div>
                <Icon color='red' name='window close outline' />
                <label>{this.props.optiuneCopy.Status}</label>
                </div>
            )}}


    alegeProfesor = (profesorAles) => {

        this.props.actualizareOptiuniState(this.props.index, "ID_profesor", profesorAles)
    }

    alegeTema = (TemaAleasa) => {
        this.props.actualizareOptiuniState(this.props.index, "Tema_lucrare", TemaAleasa)

    }


    render() {
        return (
            <div>

                <div>Tema</div>
                <Grid columns={2}  >
                    <Grid.Row >
                        <Grid.Column width={14} >
                <Input className={"teme-textArea"}

                       defaultValue={this.props.optiuneCopy.Tema_lucrare}
                       placeholder={"Intodu tema lucrarii"}
                       onChange={((e, data) => this.alegeTema(data.value))}

                />
                    </Grid.Column>
                        <Grid.Column  width={2} >
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            {this.iconStatus(this.props.optiuneCopy.Status)}
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
                <div>Cadrul didactic indrumator</div>
                <Dropdown

                    className={"dropdown-profesorilist"}
                    searchInput={{type: 'string'}}
                    value={this.props.optiuneCopy.ID_profesor}
                    placeholder='Alege profesor coordonator'
                    search selection options={this.props.listaProfesori}

                    onChange={((e, data) => this.alegeProfesor(data.value))}
                />


            </div>
            )
    }

}
export   default Optiune;