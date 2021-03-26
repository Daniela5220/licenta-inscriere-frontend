import React, {Component} from 'react'

import Style from './Style.css';
import {Dropdown, TableBody} from "semantic-ui-react";
import {Table, Select, Button} from "semantic-ui-react";
import axios from "./axios-API"

//var selectedOption=null;
const d =new Date();
d.setMonth(1,10);
const d1 =new Date();
d1.setMonth(1,9);
const d2 =new Date();
d2.setMonth(1,12);
const d3 =new Date();
d3.setMonth(1,15);
const d4 =new Date();
d4.setMonth(1,20);




class AlegeStudent extends Component {

    state = {
        username: "maican@unitbv.ro",
        id_An: 39,
        listaCereri: [],
        idStatusNou:null,
        listaStatus: [],
        selectedOption: null,
    }


    componentDidMount() {

                const Nr_Optiune= this.seteazanroptiune(d,d1,d2,d3,d4);

            axios

                .get('Optiune/Get?ProfesorUsername=' + this.state.username + '&ID_An=' + this.state.id_An +'&Nr_optiune='+Nr_Optiune)
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
    }

    seteazanroptiune = (d,d1,d2,d3,d4) => {
        if(d1<=d &&d<d2){
            return 1
        }else
        if(d2<=d &&d<d3){
            return 2
        }else
        if(d3<=d &&d<=d4) {
            return 3
        }else{
            console.log("In acesta perioada nu se pot actualiza statusurile optiunilor")
            return 0
        }


    }



    alegeStatus = (selectedOption) => {


        this.setState({
            idStatusNou: selectedOption
        })
        console.log(selectedOption)
    }


    savefunction = (varop,ID_student) => {


        console.log(varop)
        axios
            .put('Optiune/Put?id_optiune=' + varop + '&id_status_optiune=' + this.state.idStatusNou+ '&ID_student='+ID_student)
            .then(re => {

                console.log('Modificarile au fost salvate');

                const Nr_Optiune= this.seteazanroptiune(d,d1,d2,d3,d4);
                axios

                    .get('Optiune/Get?ProfesorUsername=' + this.state.username + '&ID_An=' + this.state.id_An +'&Nr_optiune='+Nr_Optiune)
                    .then(re => {
                        this.setState({listaCereri: re.data})
                        console.log(re.data);


                    })
            })

    }




    render() {

        return (
            <div>
                <div className={"titlu"}>Lista studentilor si temelor pentru un anumit profesor  </div>

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
                                            this.savefunction(e.ID_optiune,e.ID_student)
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