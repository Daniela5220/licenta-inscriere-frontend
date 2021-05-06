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

class RezultatSustinereLicenta extends Component {

    render(){
        return(
            <div >
                <Table>
                    <TableHeader>
                        <TableHeaderCell colSpan={3}>
                            SUSŢINEREA LUCRĂRII DE ABSOLVIRE/ LUCRĂRII DE LICENŢĂ/
                            PROIECTULUI DE DIPLOMĂ/ DISERTAŢIEI

                        </TableHeaderCell>
                    </TableHeader>
                    <tbody>
                    <TableRow>
                        <TableCell colSpan={3}>Sesiunea</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Rezultatul
                            susţinerii
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Presedinte comisie:
                        </TableCell>
                    </TableRow>
                    </tbody>
                </Table>

            </div>


        )}
}
export default RezultatSustinereLicenta;
