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
    Input,
    Table,
    TableCell,
    TableFooter,
    TableHeader,
    TableHeaderCell,
    TableRow,
    TextArea
} from "semantic-ui-react";

class Vize extends Component {
    constructor(props) {
        super(props)

    }
    alegeProblema=(Problema)=>{
        this.props.actualizareOptiuniDinState(this.props.index,"Tema_lucrare",Problema)

    }

    render(){
        return(
            <div >
           <Table>
               {/*<TableHeader>*/}
               {/*    <TableHeaderCell colSpan={3}>*/}
               {/*    LUCRARE DE ABSOLVIRE/ LUCRARE DE LICENŢĂ/ PROIECT DE DIPLOMĂ/*/}
               {/*    DISERTAŢIE – VIZE*/}
               {/*    </TableHeaderCell>*/}
               {/*</TableHeader>*/}

               {/*<TableRow>*/}
               {/*    <TableCell>Data vizei</TableCell>*/}
               {/*    <TableCell className={"sizetablecell"}>Capitole/probleme analizate</TableCell>*/}
               {/*    <TableCell>Semnatura cadrului didactic indrumator</TableCell>*/}
               {/*</TableRow>*/}
               <TableRow>
                   <TableCell >
                   </TableCell>
                   <TableCell >
                       <Input className={"teme-textArea"}
                              onChange={((e, data) => this.alegeProblema(data.value))}
                              defaultValue={this.props.vizaCopy.Problema}
                              placeholder={"Problema propusa"}/>
                   </TableCell>
                   <TableCell >
                   </TableCell>
               </TableRow>
           </Table>


            </div>


                )}
}
export default Vize;
