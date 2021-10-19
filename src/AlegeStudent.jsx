import React, {Component} from 'react'

import Style from './Style.css';
import {Dimmer, Dropdown, Image, Input, Loader, Menu, MenuItem, Segment, TableBody, TableCell} from "semantic-ui-react";
import {Table, Select, Button} from "semantic-ui-react";
import axios from "./axios-API"
import moment from "moment";

//var selectedOption=null;





var Nr_Optiune
var dirDep

class AlegeStudent extends Component {

    state = {

        ID_AnUniv:null,
        listaCereri: [],
        idStatusNou:null,
        listaStatus: [],
       // selectedOption: null,
        ID_SefDep:null,
        Nr_op:null,
        listaTermene:[],
       AnUniv:null,
        FacultateList:null,
        ID_facultate:null,
        loading:true,

    }


    componentDidMount() {
        //populeaza lista AnUniv
        axios
            .get('Optiune/AnUnivLista')

            .then(r => {
                let AnUniv = [];
                for (let an of r.data) {
                    AnUniv.push({
                        key: an.ID_AnUniv,
                        value: an.ID_AnUniv,
                        text: an.Denumire
                    })}
                this.setState({AnUniv: AnUniv})
                this.setState({ID_AnUniv:this.state.AnUniv[0].value})


                //populeaza lista cu facultati
        axios
            .get('Optiune/FacultateList?ID_AnUniv='+this.state.ID_AnUniv)
            .then(r => {
                let FacultateList = [];
                for (let facultate of r.data) {
                    FacultateList.push({
                        key: facultate.ID_Facultate,
                        value: facultate.ID_Facultate,
                        text: facultate.Denumire
                    })}
                this.setState({FacultateList: FacultateList})
                this.setState({ID_facultate: this.state.FacultateList[0].value})

        //lista cu termene pentru vizualizarea optiunilor in functie de data
        axios
            .get('Optiune/TermenInscriereListByAnUnivFacultate?ID_AnUnivCerereInscriere='+this.state.ID_AnUniv+'&ID_Facultate='+this.state.ID_facultate)
            .then(rez=> {
                this.setState({listaTermene: rez.data})
                if(rez.data.length==0){
                 var   Nr_Optiune=1
                }else{
                    var Nr_Optiune=this.seteazanroptiune(this.state.Nr_op)
                }
                //popularea listei cu optiuni pentru fiecare profesor
            axios

                .get('Optiune/GetOptiuniListByProfesorUsername?ID_An=' + this.state.ID_AnUniv +'&Nr_optiune='+Nr_Optiune)
                .then(re => {
                    this.setState({listaCereri: re.data})
                    console.log(re.data);
                })
                this.setState({loading:false})

            })
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
        // if (
        //     prevState.ID_AnUniv !== this.state.ID_AnUniv
        // ) {
        //
        //     this.componentDidMount()
        // }
        if (
            prevState.ID_facultate !== this.state.ID_facultate
        ) {
            this.componentDidMount()
        }

    }
    seteazanroptiune = (op) => {

        var m = moment()
        var t3 = moment(this.state.listaTermene[2].DataStartAlegere)
        var t2 = moment(this.state.listaTermene[1].DataStartAlegere)
        var t1 = moment(this.state.listaTermene[1].DataStartAlegere)

        console.log(op)
        if (op) {
            this.setState({Nr_op: op})
            return op
        } else {
            if (m > t3) {
                return this.state.listaTermene[2].Nr_ordine
            } else {
                if (m > t2) {
                    return this.state.listaTermene[1].Nr_ordine
                } else {
                    if (m > t1) {
                        return this.state.listaTermene[1].Nr_ordine
                    }
                }}}}







    alegeStatus = (selectedOption) => {


        this.setState({
            idStatusNou: selectedOption
        })
        console.log(selectedOption)
        console.log(this.state.idStatusNou)
    }
    alegeAnUniv = (selectedOption) => {
        this.setState({ID_AnUniv: selectedOption})
        axios
            .get('Optiune/TermenInscriereListByAnUnivFacultate?ID_AnUnivCerereInscriere='+this.state.ID_AnUniv+'&ID_Facultate='+this.state.ID_facultate)
            .then(rez=> {
                this.setState({listaTermene: rez.data})
                if(rez.data.length==0){
                    var   Nr_Optiune=1
                }else{
                    var Nr_Optiune=this.seteazanroptiune(this.state.Nr_op)
                }
                //popularea listei cu optiuni pentru fiecare profesor
                axios

                    .get('Optiune/GetOptiuniListByProfesorUsername?ID_An=' + this.state.ID_AnUniv +'&Nr_optiune='+Nr_Optiune)
                    .then(re => {
                        this.setState({listaCereri: re.data})
                        console.log(re.data);
                    })
                this.setState({loading:false})

            })
        console.log(selectedOption)

    }
    alegeFacultate = (selectedOption) => {
        this.setState({
            ID_facultate: selectedOption
        })
        console.log(selectedOption)
    }


    savefunction = (varop,ID_student,tema,profesor) => {


        console.log(ID_student)
        console.log(varop)
        console.log(tema)
        console.log(profesor)



        axios
            .put('Optiune/Put?id_optiune=' + varop + '&id_status_optiune=' + this.state.idStatusNou+ '&ID_student='+ID_student)
            .then(re => {

                console.log('Modificarile au fost salvate');
                console.log(this.state.ID_SefDep)
                if (this.state.idStatusNou == 1) {
                    const request = {
                        ID_student: ID_student,
                        ID_optiune: varop,
                        Tema_lucrare: tema,
                        ID_AnUnivFisa: this.state.ID_AnUniv,
                        ID_profesor_coordonator: profesor
                    };
                    const post = JSON.stringify(request);
                    axios
                        .post('Optiune/PostFisaPreliminara', post)
                        .then(re => {
                            axios
                                .post('Optiune/PostFisaLucrare?ID_student=' + ID_student)
                                .then(rezultat => {
                                    console.log("Fisa lucrarii a fost creata")
                                    const request2 = {
                                        ID_student: ID_student,
                                        ID_AnUniv: this.state.ID_AnUniv,

                                    };
                                    const post2 = JSON.stringify(request2);
                                    axios
                                        .post('Optiune/PostRezultatSustinereLicenta?ID_student='+ID_student+'&ID_AnUniv='+this.state.ID_AnUniv)
                                        .then(rez=>{
                                            console.log("Rezultat sustinere licenta a fost creat")
                                        })
                                })

                        });
                }
                if (this.state.idStatusNou == 2) {
                    axios
                        .delete('Optiune/DeleteFisaLucrareAbsolvire?ID_student=' + ID_student)
                        .then(re => {
                            console.log("Fisa lucrarii a fost stearsa")
                        })
                    axios
                        .delete('Optiune/DeleteFisaPreliminara?ID_optiune=' + varop)
                        .then(re => {
                            console.log("Fisa preliminara a fost stearsa")
                        })


                }
                this.componentDidMount()
            })
    }




    render() {

        return (

            <div className={"body"}>

                {this.state.loading == true ? <Segment>
                        <Dimmer active inverted>
                            <Loader/>
                        </Dimmer>

                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png'/>
                    </Segment> :

                        <div>
                    <div className={"titlu"}>Lista studentilor si temelor pentru un anumit profesor </div>
                    <Menu borderless inverted color={'green'}>

                    <MenuItem style={{width:"50%"}} >

                    <Dropdown
                        style={{width:"100%"}}

                        searchInput={{type: 'string'}}
                    placeholder='Alege anul universitar'
                    search selection   options={this.state.AnUniv}
                    defaultValue={this.state.AnUniv[0].value}

                    onChange={((e, data) => this.alegeAnUniv(data.value))}

                    />
                    </MenuItem>
                    <MenuItem  style={{width:"50%"}}>

                    <Dropdown
                        style={{width:"100%"}}
                    searchInput={{type: 'string'}}
                    placeholder='Alege facultatea'
                    search selection   options={this.state.FacultateList}
                    defaultValue={this.state.FacultateList[0].value}
                    onChange={((e, data) => this.alegeFacultate(data.value))}
                    />
                    </MenuItem>
                    </Menu>

                    <Input className={"teme-textArea"}
                    onChange={((e, data) => this.seteazanroptiune(data.value))}
                    placeholder={"Alege numarul optiunii"}/>


                    <div>
                    <div></div>
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
                   </div> </div>
                }
            </div>
        );


    }
}



export default AlegeStudent;