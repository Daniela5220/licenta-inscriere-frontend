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

class Vize extends Component {

    render(){
        return(
            <div >
           <Table>
               <TableHeader>
                   <TableHeaderCell colSpan={3}>
                   LUCRARE DE ABSOLVIRE/ LUCRARE DE LICENŢĂ/ PROIECT DE DIPLOMĂ/
                   DISERTAŢIE – VIZE
                   </TableHeaderCell>
               </TableHeader>
               <tbody>
               <TableRow>
                   <TableCell>Data vizei</TableCell>
                   <TableCell className={"sizetablecell"}>Capitole/probleme analizate</TableCell>
                   <TableCell>Semnatura cadrului didactic indrumator</TableCell>
               </TableRow>
               <TableRow>
                   <TableCell>
                   </TableCell>
                   <TableCell >
                       <TextArea ></TextArea>
                   </TableCell>
                   <TableCell>
                   </TableCell>
               </TableRow>
               <TableRow>
                   <TableCell>

                   </TableCell>
                   <TableCell>
                       <TextArea></TextArea>
                   </TableCell>
                   <TableCell>

                   </TableCell>
               </TableRow>
               <TableRow>
                   <TableCell>

                   </TableCell>
                   <TableCell>
                       <TextArea></TextArea>
                   </TableCell>
                   <TableCell>

                   </TableCell>
               </TableRow>
               <TableRow>
                   <TableCell>

                   </TableCell>
                   <TableCell>
                       <TextArea></TextArea>
                   </TableCell>
                   <TableCell>

                   </TableCell>
               </TableRow>
               </tbody>
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
                                    ADMIS SAU RESPINS
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
                            ADMIS SAU RESPINS
                        </TableCell>
                        <TableCell>
                            Director departament
                        </TableCell>

                    </TableRow>

                    </tbody>
                </Table>
            </div>


                )}
}
export default Vize;
