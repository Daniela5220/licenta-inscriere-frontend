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
    state={
        t4: moment(),
    }
    alegeProblema=(Problema)=>{
        this.props.actualizareOptiuniDinState(this.props.index,"Tema_lucrare",Problema)

    }
    alegeData=(Data)=>{
        this.props.actualizareOptiuniDinState(this.props.index,"Data_vizei",Data)

    }
    onFileChange = event => {
        // Update the state
        this.setState({semnaturaStudentFile: event.target.files[0]});
        console.log(event.target.files[0])
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })

    };

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
                       <SingleDatePicker

                           date={moment(this.state.t4)}
                           onDateChange={t4=>this.setState({t4})}
                           displayFormat="DD/MM/YYYY"
                           placeholder="Data"
                           focused={this.state.focused4}
                           onFocusChange={({focused:focused4})=>this.setState({focused4})}
                           numberOfMonths={1}
                           isOutsideRange={() => false}
                       />
                   </TableCell>
                   <TableCell >
                       <Input className={"teme-textArea"}
                              onChange={((e, data) => this.alegeProblema(data.value))}
                              defaultValue={this.props.vizaCopy.Problema}
                              placeholder={"Problema propusa"}/>
                   </TableCell>
                   <TableCell >
                       <input type="file" onChange={this.onFileChange}/>
                   </TableCell>
               </TableRow>
           </Table>


            </div>


                )}
}
export default Vize;
