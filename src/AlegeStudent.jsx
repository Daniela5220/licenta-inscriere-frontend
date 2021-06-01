import React, {Component} from 'react'

import Style from './Style.css';
import {Dropdown, Input, TableBody} from "semantic-ui-react";
import {Table, Select, Button} from "semantic-ui-react";
import axios from "./axios-API"
import moment from "moment";

//var selectedOption=null;





var Nr_Optiune

class AlegeStudent extends Component {

    state = {

        ID_AnUniv: 39,
        listaCereri: [],
        idStatusNou:null,
        listaStatus: [],
        selectedOption: null,
        ID_SefDep:null,
        Nr_op:null

    }


    componentDidMount() {
        axios
            .get('Optiune/GetTermene')
            .then(rez=>{




                 Nr_Optiune= this.seteazanroptiune(this.state.Nr_op,rez.data[0].Termen1,rez.data[0].Termen2,rez.data[0].Termen3,rez.data[0].Termen4);
                console.log(Nr_Optiune)

            axios

                .get('Optiune/GetOptiuniListByProfesorUsername?ID_An=' + this.state.ID_AnUniv +'&Nr_optiune='+Nr_Optiune)
                .then(re => {
                    this.setState({listaCereri: re.data})
                    console.log(re.data);


                })

        axios
            .get('Optiune/GetStatusOptiune')
            .then(response => {
                let listaStatus = [];
                for (let status of response.data) {
                    listaStatus.push({
                        key: status.ID_status_optiune,
                        value: status.ID_status_optiune,
                        text: status.Status

                    })
                }
                this.setState({listaStatus: listaStatus})

            });
            })
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.Nr_op !== this.state.Nr_op

        ) {

            this.componentDidMount()
        }

    }
    seteazanroptiune = (op,d1,d2,d3,d4) => {
        var m = moment()
        var a = moment(d1)
        var b = moment(d2)
        var c = moment(d3)
        var d = moment(d4)


        if (op != null) {
            this.setState({Nr_op: op})
            return op
        } else {
            if (a<=m&&m<b) {
                return 1
            } else if (b<=m&&m<c) {
                return 2
            } else if (c<=m&&m<d) {
                return 3
            } else {
                console.log("In acesta perioada nu se pot actualiza statusurile optiunilor")
                return 0
            }
        }
    }







    alegeStatus = (selectedOption) => {


        this.setState({
            idStatusNou: selectedOption
        })
        console.log(selectedOption)
    }


    savefunction = (varop,ID_student,tema,profesor) => {


        console.log(ID_student)
        console.log(varop)
        console.log(tema)
        console.log(profesor)
        axios
            .get('Optiune/GetIDProfesorSefCatedraByIDStudent?ID_student='+ID_student+'&ID_AnUniv=' + this.state.ID_AnUniv)
            .then(re => {

                this.setState({
                    ID_SefDep:re.data[0].ID_ProfesorSefCatedra
                })
            })

            console.log(this.state.ID_SefDep)

        axios
            .put('Optiune/Put?id_optiune=' + varop + '&id_status_optiune=' + this.state.idStatusNou+ '&ID_student='+ID_student)
            .then(re => {

                console.log('Modificarile au fost salvate');
                if(this.state.idStatusNou==1) {
                    const request = {
                        ID_student: ID_student,
                        ID_optiune: varop,
                        Tema_lucrare: tema,
                        ID_director_departament: this.state.ID_SefDep,
                        ID_AnUnivFisa: this.state.ID_AnUniv,
                        ID_profesor_coordonator: profesor
                    };
                    const post = JSON.stringify(request);
                    axios
                        .post('Optiune/PostFisaPreliminara', post)
                        .then(re =>
                            console.log("Fisa Preliminara a fost facuta")
                        );
                    axios
                        .post('Optiune/PostFisaLucrare?ID_student=' + ID_student)
                        .then(rezultat =>{
                                console.log("Fisa lucrarii a fost creata")
                        }

                        )}
                if(this.state.idStatusNou==2) {
                    axios
                        .delete('Optiune/DeleteFisaLucrareAbsolvire?ID_student='+ID_student)
                        .then(re=>{
                            console.log("Fisa lucrarii a fost stearsa")
                        })
                    axios
                        .delete('Optiune/DeleteFisaPreliminara?ID_optiune='+varop)
                        .then(re=>{
                            console.log("Fisa preliminara a fost stearsa")
                        })


                }

                axios

                    .get('Optiune/GetOptiuniListByProfesorUsername?ID_An=' + this.state.ID_AnUniv +'&Nr_optiune='+Nr_Optiune)
                    .then(re => {
                        this.setState({listaCereri: re.data})
                        console.log(re.data);


                    })
            })

    }




    render() {

        return (
            <div className={"body"}>
                <div className={"titlu"}>Lista studentilor si temelor pentru un anumit profesor  </div>
                <div>Lista optiunilor cu numarul</div>

                <Input className={"teme-textArea"}
                       onChange={((e, data) => this.seteazanroptiune(data.value))}
                       placeholder={"Alege numarul optiunii"}/>


                <div>
                    {this.state.listaCereri.map((e, index) => {

                        return (
                            <Table celled selectable className='table' className={"tb-teme-student"}
                                   textAlign={"center"} key={e.ID_optiune}>

                                <Table.Header  key={e.ID_optiune}>
                                    <Table.Row key={e.ID_optiune}>

                                        <Table.HeaderCell>Nume </Table.HeaderCell>
                                        <Table.HeaderCell> Prenume </Table.HeaderCell>

                                        <Table.HeaderCell>Nr_optiune</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                        <Table.HeaderCell>Schimba status</Table.HeaderCell>
                                        <Table.HeaderCell>Salveaza</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <TableBody>
                                    <Table.Row key={e.ID_optiune}>


                                        <Table.Cell>{e.Nume}</Table.Cell>
                                        <Table.Cell>{e.Prenume}</Table.Cell>

                                        <Table.Cell>{e.Nr_optiune}</Table.Cell>
                                        <Table.Cell>{e.Status}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Dropdown

                                                placeholder='Alege status lucrare'

                                                search selection   options={this.state.listaStatus}
                                                onChange={((e, data) => this.alegeStatus(data.value))}/>


                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button color='green' onClick={() => {
                                            this.savefunction(e.ID_optiune,e.ID_student,e.Tema_lucrare,e.ID_profesor)
                                                console.log(e.ID_student)
                                            }} >Salveaza</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell >Tema_lucrare</Table.Cell>
                                        <Table.Cell colSpan={5}>{e.Tema_lucrare}</Table.Cell>

                                    </Table.Row>
                                </TableBody>
                            </Table>


                        )
                    })

                    }
                </div>
            </div>
        );


    }
}


export default AlegeStudent;