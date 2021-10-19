import axios from "./axios-API";
import React, {Component} from 'react';
import App from "./App";
import DataPicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/ro";
import DateTimePicker from 'react-datetime-picker';
import {
    Button, Dropdown, Input, Menu, MenuItem,
    Tab,
    Table,
    TableCell,
    TableFooter,
    TableHeader,
    TableHeaderCell,
    TableRow,
    TextArea,
    Checkbox
} from "semantic-ui-react";
import Vize from "./Vize";
import { Form, Radio } from 'semantic-ui-react'
import RezultatSustinereLicenta from "./RezultatSustinereLicenta";
import Optiune from "./Optiune";

let i=0;
let idstud=0;
var today = new Date(),
    date =today.getDate()+ '/' + (today.getMonth() + 1)+ '/' + today.getFullYear();

class FisaLucrarii extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        usernameStudent: null,
        date: date,
        apreciere: null,
        semnaturaAviz: null,
        semnaturaAvizIndrumător: null,
        fileSemn: null,
        lucrare: [],
        val1: null,
        val2: null,
        viza: [
            {

                Problema: null,
                Data_viza: moment(),
                ID_fisa_lucrare_absolvire: null,
                Indrumator_semnat: null,
                Indrumator_semnat_data: null
            },
            {

                Problema: null,
                Data_viza: moment(),
                ID_fisa_lucrare_absolvire: null,
                Indrumator_semnat: null,
                Indrumator_semnat_data: null
            },
            {

                Problema: null,
                Data_viza: moment(),
                ID_fisa_lucrare_absolvire: null,
                Indrumator_semnat: null,
                Indrumator_semnat_data: null
            },
            {

                Problema: null,
                Data_viza: moment(),
                ID_fisa_lucrare_absolvire: null,
                Indrumator_semnat: null,
                Indrumator_semnat_data: null
            },
            {

                Problema: null,
                Data_viza: moment(),
                ID_fisa_lucrare_absolvire: null,
                Indrumator_semnat: null,
                Indrumator_semnat_data: null
            }


        ],
        selectedFile: null,
       dataprimire: moment(),
        datapredare: moment(),
        disabled:false,
        disabled2:false,
        disabled1:false,

    }
    onFileChange = event => {
        // Update the state
        this.setState({semnaturaAviz: event.target.files[0]});
        //   console.log(event.target.files[0])
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })

    };
    FileChange = event => {
        // Update the state
        this.setState({fileSemn: event.target.files[0]});
        // console.log(event.target.files[0])
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    };


    // fileData = () => {
    //     if (this.state.semnaturaStudentFile) {
    //         return (
    //             <div>
    //                 <p>{/*Last Modified:{" "}*/}
    //                     {/*{this.state.selectedFile.lastModifiedDate.toDateString()}*/}
    //                     <object data={this.state.file} type="application/pdf" width="25%" height="25%"/>
    //                 </p>
    //             </div>
    //         );
    //     }
    // };
    actualizareOptiuniDinState = (index, key, value) => {

        // console.log(this.state.viza.length)
        if (index + 1 > this.state.viza.length) {
            this.adaugaVizeinState();
            let vizaCopy = [...this.state.viza]
            vizaCopy[index][key] = value;
            this.setState({viza: vizaCopy})
        } else {
            let vizaCopy = [...this.state.viza]
            vizaCopy[index][key] = value;
            this.setState({viza: vizaCopy})
        }

    }

    handleChange = (e, {value}) => {
        this.setState({val1: value})

    }
    handleChange2 = (e, {value}) => {
        this.setState({val2: value})

    }


    adaugaVizeinState = () => {

        this.state.viza.push(
            {

                Problema: null,
                Data_vizei: moment().format('MM/DD/yyyy'),
                ID_fisa_lucrare_absolvire: null,
                Indrumator_semnat: null,
                Indrumator_semnat_data: null
            }
        )
        this.setState({viza: this.state.viza})


    }

    componentDidMount() {
            if(this.props.rol==2){
                this.setState({disabled:true})
            }
        if(this.props.rol==0){
            this.setState({disabled1:true})
        }

        axios
            .get('Optiune/GetFisaLucrareAbsolvireStudent?UsernameStudent=' + this.props.usernameStudent)
            .then(response => {
                console.log(response.data)
                this.setState({
                    viza: [
                        {

                            Problema: null,
                            Data_viza: moment(),
                            ID_fisa_lucrare_absolvire: null,
                            Indrumator_semnat: null,
                            Indrumator_semnat_data: null
                        },
                        {

                            Problema: null,
                            Data_viza: moment(),
                            ID_fisa_lucrare_absolvire: null,
                            Indrumator_semnat: null,
                            Indrumator_semnat_data: null
                        },
                        {

                            Problema: null,
                            Data_viza: moment(),
                            ID_fisa_lucrare_absolvire: null,
                            Indrumator_semnat: null,
                            Indrumator_semnat_data: null
                        },
                        {

                            Problema: null,
                            Data_viza: moment(),
                            ID_fisa_lucrare_absolvire: null,
                            Indrumator_semnat: null,
                            Indrumator_semnat_data: null
                        },
                        {

                            Problema: null,
                            Data_viza: moment(),
                            ID_fisa_lucrare_absolvire: null,
                            Indrumator_semnat: null,
                            Indrumator_semnat_data: null
                        }

                    ]
                })

                this.setState({
                    lucrare: response.data

                })
                if (response.data[0].Indrumator_calificativ == 'ADMIS') {
                    this.setState({
                        val1: 1
                    })
                }
                if (response.data[0].Indrumator_calificativ == 'RESPINS') {
                    this.setState({
                        val1: 2
                    })
                }
                if (response.data[0].Indrumator_calificativ == null) {
                    this.setState({
                        val1: null
                    })
                }
                if (response.data[0].Director_departament_calificativ == 'ADMIS') {
                    this.setState({
                        val2: 1
                    })
                }
                if (response.data[0].Director_departament_calificativ == 'RESPINS') {
                    this.setState({
                        val2: 2
                    })
                }
                if (response.data[0].Director_departament_calificativ == null) {
                    this.setState({
                        val2: null
                    })
                }
                console.log(response.data[0].Indrumator_calificativ)
                console.log(this.state.val1)
                if (response.data[0].Tema_lucrare != null) {
                    this.setState({
                        tema: response.data[0].Tema_lucrare
                    })
                }
                if (response.data[0].Probleme_principale != null) {
                    this.setState({
                        problemePrincipale: response.data[0].Probleme_principale
                    })
                }
                if (response.data[0].Bibliografie != null) {
                    this.setState({
                        bibliografie: response.data[0].Bibliografie
                    })
                }
                if (response.data[0].Aspecte_particulare != null) {
                    this.setState({
                        aspecteParticulare: response.data[0].Aspecte_particulare
                    })
                }
                if (response.data[0].Aspecte_particulare != null) {
                    this.setState({
                        aspecteParticulare: response.data[0].Aspecte_particulare
                    })
                }
                if (response.data[0].Loc_durata_practica != null) {
                    this.setState({
                        locdurata: response.data[0].Loc_durata_practica
                    })
                }
                if (response.data[0].Data_predare != null) {
                    this.setState({
                        datapredare:moment(response.data[0].Data_predare).format('DD/MM/yyyy')
                    })
                }else{
                    this.setState({
                        datapredare: moment()
                    })
                }

                if (response.data[0].Data_primire!= null) {

                    this.setState({
                        dataprimire:moment(response.data[0].Data_primire).format('DD/MM/yyyy')
                    })

                }else{
                    this.setState({
                        dataprimire: moment()
                    })
                }



            });

    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.usernameStudent !== this.props.usernameStudent
        ) {
            this.componentDidMount()
        }
    }

    changeProblemePrincipale = (p) => {
        this.setState({problemePrincipale: p})


    }
    locdurata = (p) => {
        this.setState({locdurata: p})

    }
    temalucrare = (p) => {
        this.setState({tema: p})

    }
    bibliografie = (p) => {
        this.setState({bibliografie: p})

    }
    aspecteparticulare = (p) => {
        this.setState({aspecteParticulare: p})

    }
    apreciereindrumator = (p) => {
        this.setState({apreciere: p.toString()})

    }
    save = (ID_fisa_lucrare_absolvire) => {
        const formData = new FormData();
        console.log(this.state.semnaturaDirDep)
        formData.append(
            "myFile",
            this.state.semnaturaAviz,
            this.state.semnaturaAviz.name
        );
        //avizul directorului de departament
        axios
            .post('Optiune/PostAvizDirDep?ID_fisa_lucrare_absolvire=' + ID_fisa_lucrare_absolvire + '&ID_calificativ=' + this.state.val2, formData)
            .then(re => {


            })

    }

    saveChange = (idfisa) => {

        const request = {
            ID_fisa_lucrare_absolvire: idfisa,
            tema_lucrare: this.state.tema,
            probleme_principale: this.state.problemePrincipale,
            loc_durata_practica: this.state.locdurata,
            bibliografie: this.state.bibliografie,
            data_primire: moment(this.state.dataprimire).format('DD/MM/yyyy'),
            data_predare: moment(this.state.datapredare).format('DD/MM/yyyy'),
            Aspecte_particulare: this.state.aspecteParticulare
        };
        const post = JSON.stringify(request);
        if(this.state.fileSemn==null) {
            //post modificari fisa lucrare absolvire student +profesor coordonator
            axios
                .post('Optiune/PostFisaLucrareUpdate', post)
                .then(r => {

                })
        }else{
            const formData = new FormData();

            formData.append(
                "myFile",
                this.state.fileSemn,
                this.state.fileSemn.name
            );

            // post semnaturi student, profesor, dir deep

            axios
                .post('Optiune/PostFisaLucrareSemnaturi?ID_fisa_lucrare_absolvire=' + idfisa, formData)
                .then(r => {

                })
        }

    }


    saveIndrumatorAviz = (ID_fisa_lucrare_absolvire) => {
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.semnaturaAviz,
            this.state.semnaturaAviz.name
        );

        axios
            .post('Optiune/PostAvizIndrumator?ID_fisa_lucrare_absolvire=' + ID_fisa_lucrare_absolvire + '&Indrumator_calificativ=' + this.state.val1 + '&Indrumator_apreciere=' + this.state.apreciere, formData)
            .then(re => {


            }).catch(error => {
            console.log(error)
        })

    }
    dataAvizDirDep = (Data) => {
        if (Data != null) {
            var data = new Date(Data)
            date = data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
            return (date)
        } else {
            return (
                this.state.date
            )
        }
    }
    dataAvizIndrumator = (Data) => {
        if (Data != null) {
            var data = new Date(Data)
            date = data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
            return (date)
        } else {
            return (
                this.state.date
            )
        }
    }

    render() {
        return (
            <div>
                {this.state.lucrare.map((e, index) => {

                    return (
                        <div className={'body'} key={e.ID_fisa_lucrare_absolvire}>


                            <h1>FIŞA LUCRĂRII DE ABSOLVIRE/ LUCRĂRII DE LICENTĂ/ PROIECTULUI DE DIPLOMĂ/ DISERTATIE</h1>
                            <Table>
                                <TableRow>
                                    <TableCell>Universitatea Transilvania din Braşov</TableCell>
                                    <TableCell rowSpan={2}>Lucrare de absolvire/ lucrare de licenţă/ proiect de diplomă/
                                        disertaţie nr. ..........</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Facultatea: {e.DenumireFacultate}</TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell>Departamentul: {e.Departament} </TableCell>
                                    <TableCell>Viza facultăţii <Checkbox/></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Programul de studii: {e.DenumireSpecializare}</TableCell>
                                    <TableCell>{e.Denumire}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Candidat: {e.NumeStudent} {e.PrenumeStudent}</TableCell>
                                    <TableCell>Promoţia {e.Promotie}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Cadrul didactic îndrumător : {e.NumeCoordonamtor}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </Table>
                            <h1>LUCRARE DE ABSOLVIRE/ LUCRARE DE LICENŢĂ/ PROIECT DE DIPLOMĂ/
                                DISERTAŢIE
                                {/* eslint-disable-next-line no-undef */}

                            </h1>
                            <Table>
                                <TableRow>
                                    <TableCell>
                                        Tema lucrarii
                                        <TextArea className={'TextArea'} value={this.state.tema}
                                                  disabled = {this.state.disabled}
                                                  onChange={((e, data) => this.temalucrare(data.value))}
                                        ></TextArea>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Probleme principale

                                        <TextArea
                                            disabled = {this.state.disabled}
                                                className={'TextArea'} value={this.state.problemePrincipale}
                                                  onChange={((e, data) => this.changeProblemePrincipale(data.value))}
                                        ></TextArea>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Locul si durata
                                        <TextArea className={'TextArea'}
                                                  value={this.state.locdurata}
                                                  disabled = {this.state.disabled}
                                                  onChange={((e, data) => this.locdurata(data.value))}

                                        ></TextArea>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Bibliografie

                                        <TextArea className={'TextArea'} value={this.state.bibliografie}
                                                  disabled = {this.state.disabled}
                                                  onChange={((e, data) => this.bibliografie(data.value))}
                                        ></TextArea>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Aspecte particulare

                                        <TextArea
                                            disabled = {this.state.disabled1}
                                            className={'TextArea'} value={this.state.aspecteParticulare}
                                                  onChange={((e, data) => this.aspecteparticulare(data.value))}
                                        ></TextArea>

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Data primire tema: <SingleDatePicker
                                        disabled = {this.state.disabled1}
                                        date={moment(this.state.datapredare)}
                                        onDateChange={datapredare => this.setState({datapredare})}
                                        displayFormat="DD/MM/YYYY"
                                        placeholder="Data"
                                        focused={this.state.focused}
                                        onFocusChange={({focused: focused}) => this.setState({focused})}
                                        numberOfMonths={1}
                                        isOutsideRange={() => false}
                                    /></TableCell>
                                </TableRow>
                                <TableRow>



                                    <TableCell>Data primirii lucrării: <SingleDatePicker
                                        disabled = {this.state.disabled}
                                        date={moment(this.state.dataprimire)}
                                        onDateChange={dataprimire => this.setState({dataprimire})}
                                        displayFormat="DD/MM/YYYY"
                                        placeholder="Data"
                                        focused={this.state.focused2}
                                        onFocusChange={({focused: focused2}) => this.setState({focused2})}
                                        numberOfMonths={1}
                                        isOutsideRange={() => false}
                                    /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell disabled = {this.state.disable}
                                               disabled = {this.state.disabled1}
                                    >
                                        <div> Director departament: {e.NumeDirectorDepartamnet}</div>
                                        {e.Director_departament_semnatura == null ?
                                            <input type="file" onChange={this.FileChange}/> : <object
                                                style={{width: '100pt', height: '75pt'}}
                                                data={'data:application/pdf;base64,' + e.Director_departament_semnatura}></object>
                                        }
                                    </TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell disabled = {this.state.disabled}

                                    >
                                        <div>Cadru didactic îndrumător: {e.NumeCoordonamtor}</div>
                                        {e.Indrumator_semnatura == null ?
                                            <input type="file" onChange={this.FileChange}/> : <object
                                                style={{width: '100pt', height: '75pt'}}
                                                data={'data:application/pdf;base64,' + e.Indrumator_semnatura}></object>
                                        }

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div>Candidat: {e.NumeStudent} {e.PrenumeStudent} </div>
                                        {e.Semnatura_student == null ? <input type="file" onChange={this.FileChange}/> :
                                            <object
                                                style={{width: '100pt', height: '75pt'}}
                                                data={'data:application/pdf;base64,' + e.Semnatura_student}></object>
                                        }


                                    </TableCell>
                                </TableRow>
                            </Table>
                            <Button onClick={() => {
                                this.saveChange(e.ID_fisa_lucrare_absolvire)
                            }}>Salveaza</Button>

                            <Table  >
                                <TableHeader>
                                    <TableHeaderCell colSpan={3}>
                                        LUCRARE DE ABSOLVIRE/ LUCRARE DE LICENŢĂ/ PROIECT DE DIPLOMĂ/
                                        DISERTAŢIE – VIZE
                                    </TableHeaderCell>
                                    <TableHeaderCell colSpan={3}>
                                        <Button
                                            disabled = {this.state.disabled}
                                            className={"savebutton"} onClick={() => {

                                            this.adaugaVizeinState()

                                        }}>Adauga vize</Button>
                                    </TableHeaderCell>


                                </TableHeader>

                                <TableRow>
                                    <TableCell>Data vizei</TableCell>
                                    <TableCell className={"sizetablecell"}>Capitole/probleme analizate</TableCell>
                                    <TableCell>Semnatura cadrului didactic indrumator</TableCell>

                                </TableRow>
                            </Table>

                            <Table>

                                {this.state.viza.map((item, index) => {
                                    return (
                                        <Vize
                                            disabled = {this.state.disabled}

                                            colSpan={3}
                                              actualizareOptiuniDinState={this.actualizareOptiuniDinState.bind(this)}
                                              ID_fisa_lucrare_absolvire={e.ID_fisa_lucrare_absolvire}
                                              vizaCopy={item}
                                              index={index}
                                              key={index}
                                              viza={this.state.viza}
                                            disabled={this.state.disabled}


                                        />
                                    )
                                })}

                            </Table>



                            <Table>
                                <TableHeader>
                                    <TableHeaderCell colSpan={3}>
                                        APRECIEREA ŞI AVIZUL CADRULUI DIDACTIC ÎNDRUMĂTOR
                                    </TableHeaderCell>
                                </TableHeader>
                                <tbody>
                                <TableRow>
                                    <TableCell colSpan={3} disabled = {this.state.disabled}>
                                        <TextArea
                                            className={'TextArea'} defaultValue={e.Indrumator_apreciere}
                                            onChange={((e, data) => this.apreciereindrumator(data.value))}
                                        ></TextArea>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Data
                                    </TableCell>
                                    <TableCell>Alege status lucrare</TableCell>
                                    <TableCell> Profesor coordonator</TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                          {this.dataAvizIndrumator(e.Indrumator_data_aviz)}
                                    </TableCell>
                                    <TableCell disabled = {this.state.disabled}>

                                        <Form>

                                            <Form.Field>
                                                <Radio
                                                    label='ADMIS'
                                                    name='radioGroup1'
                                                    value={1}
                                                    checked={this.state.val1 === 1}
                                                    onChange={this.handleChange}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio
                                                    label='RESPINS'
                                                    name='radioGroup1'
                                                    value={2}
                                                    checked={this.state.val1 === 2}
                                                    onChange={this.handleChange}
                                                />
                                            </Form.Field>
                                        </Form>
                                    </TableCell>
                                    <TableCell disabled = {this.state.disabled}>

                                        {e.Indrumator_semnat_avize == null ?
                                            <input type="file" onChange={this.onFileChange}/> : <object
                                                style={{width: '30%', height: '85pt'}}
                                                data={'data:application/pdf;base64,' + e.Indrumator_semnat_avize}></object>

                                        }
                                    </TableCell>
                                </TableRow>
                                </tbody>
                            </Table>
                            <Button
                                disabled = {this.state.disabled}

                                onClick={() => {
                                this.saveIndrumatorAviz(e.ID_fisa_lucrare_absolvire)
                            }}>Salveaza</Button>

                            <Table disabled = {this.state.disable}
                                   disabled = {this.state.disabled1} >
                                <TableHeader>
                                    <TableHeaderCell colSpan={3}>
                                        AVIZUL DIRECTORULUI DE DEPARTAMENT
                                    </TableHeaderCell>
                                </TableHeader>
                                <tbody>
                                <TableRow>
                                    <TableCell>Data</TableCell>
                                    <TableCell>Alege status lucrare</TableCell>
                                    <TableCell>
                                        Director departament semnatura
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        {this.dataAvizDirDep(e.Director_departament_data_aviz)}
                                    </TableCell>
                                    <TableCell  disabled = {this.state.disable}
                                                disabled = {this.state.disabled1}>
                                        <Form>

                                            <Form.Field >
                                                <Radio
                                                    label='ADMIS'
                                                    name='radioGroup2'
                                                    value={1}
                                                    checked={this.state.val2 === 1}
                                                    onChange={this.handleChange2}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio
                                                    label='RESPINS'
                                                    name='radioGroup'
                                                    value={2}
                                                    checked={this.state.val2 === 2}
                                                    onChange={this.handleChange2}
                                                />
                                            </Form.Field>
                                        </Form>

                                    </TableCell>
                                    <TableCell disabled = {this.state.disable}
                                               disabled = {this.state.disabled1}>
                                        {e.Director_departament_semnatura_aviz == null ?
                                            <input type="file" onChange={this.onFileChange}/> : <object
                                                style={{width: '30%', height: '85pt'}}
                                                data={'data:application/pdf;base64,' + e.Director_departament_semnatura_aviz}></object>

                                        }

                                    </TableCell>

                                </TableRow>

                                </tbody>
                            </Table>
                            <Button
                                disabled = {this.state.disabled}
                                onClick={() => {
                                this.save(e.ID_fisa_lucrare_absolvire)
                            }}>Salveaza</Button>


                        </div>
                    )
                })}
            </div>


        )
        }
}

export default FisaLucrarii;
