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
import {Table, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow, TextArea} from "semantic-ui-react";
import Vize from "./Vize";
import RezultatSustinereLicenta from "./RezultatSustinereLicenta";

class FisaLucrarii extends Component {
    state={
        Username:"diana.garbacea@student.unitbv.ro",
        lucrare:[]
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
                                <TableCell>Titlul lucrării: {e.Tema_lucrare}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Problemele principale tratate:{e.ProblemePrincipale}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Locul şi durata practicii: {e.Loc_durata_practica}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bibliografie:{e.Bibliografie}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Aspecte particulare: {e.Aspecte_particulare}</TableCell>
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
                        <Vize/>
                        <RezultatSustinereLicenta/>

                    </div>
                    )})}
            </div>


        )}
}
export default FisaLucrarii;
