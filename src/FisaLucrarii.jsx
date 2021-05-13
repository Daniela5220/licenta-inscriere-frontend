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
    Button,
    Tab,
    Table,
    TableCell,
    TableFooter,
    TableHeader,
    TableHeaderCell,
    TableRow,
    TextArea
} from "semantic-ui-react";
import Vize from "./Vize";
import { Form, Radio } from 'semantic-ui-react'
import RezultatSustinereLicenta from "./RezultatSustinereLicenta";
import Optiune from "./Optiune";

class FisaLucrarii extends Component {
    state={
        Username:"diana.garbacea@student.unitbv.ro",
        lucrare:[],
        val1:null,
        val2:null,
        viza:[
            {
                ID_viza:null,
                Problema:null,
                Data_vizei:null,
                ID_fisa_lucrare_absolvire:null,
                Indrumator_semnat:null,
                Indrumator_semnat_data:null
            },
            {
                ID_viza:null,
                Problema:null,
                Data_vizei:null,
                ID_fisa_lucrare_absolvire:null,
                Indrumator_semnat:null,
                Indrumator_semnat_data:null
            },
            {
                ID_viza:null,
                Problema:null,
                Data_vizei:null,
                ID_fisa_lucrare_absolvire:null,
                Indrumator_semnat:null,
                Indrumator_semnat_data:null
            },
            {
                ID_viza:null,
                Problema:null,
                Data_vizei:null,
                ID_fisa_lucrare_absolvire:null,
                Indrumator_semnat:null,
                Indrumator_semnat_data:null
            },
            {
                ID_viza:null,
                Problema:null,
                Data_vizei:null,
                ID_fisa_lucrare_absolvire:null,
                Indrumator_semnat:null,
                Indrumator_semnat_data:null
            }

        ],
        selectedFile:null
    }
    actualizareOptiuniDinState=(index,key,value)=>{

        let vizaCopy=[...this.state.viza]
        vizaCopy[index][key]=value;
        this.setState({vize:vizaCopy})
    }
    saveVize=()=>{
        let optiuniCopy = [...this.state.viza]

        // axios
        //     .post('Optiune/Post?lista_optiuni',optiuniCopy)
        //     .then(re => {
        //
        //         console.log('Optiunile  au fost adaugate');
        //     })

    }
    handleChange=(e, { value }) =>{
        this.setState({ val1:value })
        console.log("Statusul ales este"+this.state.val1)
    }
    handleChange2 = (e, { value }) => this.setState({ val2:value })


    adaugaVizeinState=()=>{
        console.log('test')
        this.state.viza.push(
            {
                ID_viza: null,
                Problema: null,
                Data_vizei: null,
                ID_fisa_lucrare_absolvire: null,
                Indrumator_semnat: null,
                Indrumator_semnat_data: null
            }
        )
        this.setState({viza:this.state.viza})
        console.log(this.state.viza)
        console.log("Vedem daca merge")
    }
    componentDidMount() {
        axios
            .get('Optiune/GetFisaLucrareAbsolvireStudent?UsernameStudent=octavian.dorvos@student.unitbv.ro&ID_AnUniv=39')
            .then(response => {
                this.setState({
                    lucrare: response.data

                })

            });
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.viza !== this.state.viza

        ) {

            this.componentDidMount()
        }

    }

    render(){
        return(
            <div>
            {this.state.lucrare.map((e, index) => {
                    return (
                    <div className={'body'}>
                        <h1>FIŞA LUCRĂRII DE ABSOLVIRE/ LUCRĂRII DE LICENŢĂ/ PROIECTULUI DE DIPLOMĂ/ DISERTAŢIE</h1>
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
                                <TableCell>Viza facultăţii</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Programul de studii: {e.DenumireSpecializare}</TableCell>
                                <TableCell>Anul universitar</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Candidat: {e.NumeStudent} {e.PrenumeStudent}</TableCell>
                                <TableCell>Promoţia</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Cadrul didactic îndrumător :  {e.NumeCoordonamtor}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </Table>
                        <h1>LUCRARE DE ABSOLVIRE/ LUCRARE DE LICENŢĂ/ PROIECT DE DIPLOMĂ/
                            DISERTAŢIE
                        </h1>
                        <Table>
                            <TableRow>
                                <TableCell>
                                    <div>Tema lucrarii</div>
                                    <TextArea className={'TextArea'} defaultValue={e.Tema_lucrare}></TextArea>
                                    </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div>Probleme principale</div>
                                    <TextArea className={'TextArea'} defaultValue={e.Probleme_principale}></TextArea>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div>Locul si durata</div>
                                    <TextArea className={'TextArea'} defaultValue= {e.Loc_durata_practica}></TextArea>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div>Bibliografie</div>
                                    <TextArea className={'TextArea'} defaultValue= {e.Bibliografie}></TextArea>
                                    </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div>Aspecte particulare</div>
                                    <TextArea className={'TextArea'} defaultValue= {e.Aspecte_particulare}></TextArea>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Primit tema la data de:</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Data predării lucrării:</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Director departament: {e.NumeDirectorDepartamnet}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Cadru didactic îndrumător: {e.NumeCoordonamtor} </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Candidat: {e.NumeStudent} {e.PrenumeStudent} </TableCell>
                            </TableRow>
                        </Table>
                        <Table>
                            <TableHeader>
                                <TableHeaderCell colSpan={3}>
                                LUCRARE DE ABSOLVIRE/ LUCRARE DE LICENŢĂ/ PROIECT DE DIPLOMĂ/
                                DISERTAŢIE – VIZE
                                </TableHeaderCell>
                                <TableHeaderCell colSpan={3}>
                                    <Button className={"savebutton"}  onClick={() => {

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
                                <Vize colSpan={3}
                                    actualizareOptiuniDinState={this.actualizareOptiuniDinState.bind(this)}
                                    vizaCopy={item}
                                    index={index}
                                    key={index}

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
                                <TableCell colSpan={3}>
                                    <TextArea></TextArea>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Data

                                </TableCell>
                                <TableCell>
                                    <Form>
                                        <Form.Field>
                                           <b> Alege status lucrare</b>
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label='ADMIS'
                                                name='radioGroup1'
                                                value={1}
                                               // checked={this.state.value === 1}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label='RESPINS'
                                                name='radioGroup1'
                                                value={2}
                                                //checked={this.state.value === 2}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                    </Form>
                                </TableCell>
                                <TableCell>
                                    Profesor coordonator
                                </TableCell>

                            </TableRow>

                            </tbody>
                        </Table>

                        <Table>
                            <TableHeader>
                                <TableHeaderCell colSpan={3}>
                                    AVIZUL DIRECTORULUI DE DEPARTAMENT
                                </TableHeaderCell>
                            </TableHeader>
                            <tbody>
                            <TableRow>
                                <TableCell>Data

                                </TableCell>
                                <TableCell>
                                    <Form>
                                        <Form.Field>
                                            <b> Alege status lucrare</b>
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label='ADMIS'
                                                name='radioGroup2'
                                                value={1}
                                                checked={this.state.value === 1}
                                                onChange={this.handleChange2}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label='RESPINS'
                                                name='radioGroup'
                                                value={2}
                                                checked={this.state.value === 2}
                                                onChange={this.handleChange2}
                                            />
                                        </Form.Field>
                                    </Form>

                                </TableCell>
                                <TableCell>
                                    Director departament
                                </TableCell>

                            </TableRow>

                            </tbody>
                        </Table>
                        <RezultatSustinereLicenta/>

                    </div>
                     )})}
            </div>


        )}
}
export default FisaLucrarii;
