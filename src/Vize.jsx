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
        semnaturaProfesorFile:null,
        Problema:null,




    }
    alegeProblema=(Problema)=>{

        this.setState({Problema:Problema})
        this.props.actualizareOptiuniDinState(this.props.index,"Problema",Problema)

    }
    alegeData=(Data)=>{
        this.setState({Data_viza:new moment(Data).format('MM/DD/yyyy')})
        var data=new moment(Data).format('MM/DD/yyyy')
        this.props.actualizareOptiuniDinState(this.props.index,"Data_viza",data)
    }
    componentDidMount() {
        console.log(this.props.ID_fisa_lucrare_absolvire)
        axios
            .get('Optiune/VizeList?ID_fisa_lucrare_absolvire='+this.props.ID_fisa_lucrare_absolvire)
            .then(r=> {

                for (let item of r.data) {

                    this.props.actualizareOptiuniDinState(r.data.indexOf(item), "Problema", item.Problema)
                    this.props.actualizareOptiuniDinState(r.data.indexOf(item), "Data_viza", item.Data_viza)
                    this.props.actualizareOptiuniDinState(r.data.indexOf(item), "Indrumator_semnat", item.Indrumator_semnat)
                }
                const ID_fisa_lucrare_absolvire = this.props.ID_fisa_lucrare_absolvire
                this.props.actualizareOptiuniDinState(this.props.index, "ID_fisa_lucrare_absolvire", ID_fisa_lucrare_absolvire)



            }) }

    onFileChange = event => {
        // Update the state
        this.setState({semnaturaProfesorFile: event.target.files[0]});
        console.log(event.target.files[0])
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })

    };

    saveViza=(ID_fisa_lucrare_absolvire)=>{
        const formData = new FormData();

        // Update the formData object
        console.log(this.state.semnaturaProfesorFile)
        formData.append(
            "myFile",
            this.state.semnaturaProfesorFile,
            this.state.semnaturaProfesorFile.name
        );

        // Details of the uploaded file
        console.log(this.state.semnaturaProfesorFile);

        // Request made to the backend api
        // Send formData object
        console.log(formData)
        axios
                .post('Optiune/PostViza?Problema='+this.state.Problema+'&Data_viza='+this.state.Data_viza+'&ID_fisa_lucrare_absolvire='+this.props.ID_fisa_lucrare_absolvire,formData)
                .then(re => {

                    console.log('Vizele au fost adaugate');
                })
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
                   <TableCell disabled = {(this.props.disabled)? "disabled" : ""} >
                       <SingleDatePicker

                           date={moment(this.props.vizaCopy.Data_viza)}
                           onDateChange={(e)=>this.alegeData(e)}
                           displayFormat="MM/DD/YYYY"
                           placeholder="Data"
                           focused={this.state.focused4}
                           onFocusChange={({focused:focused4})=>this.setState({focused4})}
                           numberOfMonths={1}
                           isOutsideRange={() => false}
                       />
                   </TableCell>
                   <TableCell  disabled = {(this.props.disabled)? "disabled" : ""} >

                       <Input className={"teme-textArea"}
                              onChange={((e, data) => this.alegeProblema(data.value))}

                              value={this.props.vizaCopy.Problema}
                             placeholder={"Problema propusa"}
                       />
                   </TableCell>
                   <TableCell  disabled = {(this.props.disabled)? "disabled" : ""}>
                       {this.props.vizaCopy.Indrumator_semnat==null? <input type="file" onChange={this.onFileChange}/>: <object
                           style={{width: '80pt', height: '60pt'}}
                           data={'data:application/pdf;base64,' + this.props.vizaCopy.Indrumator_semnat}></object>

                       }

                   </TableCell>
                   <TableCell disabled = {(this.props.disabled)? "disabled" : ""}>
                       <Button onClick={()=>{this.saveViza(this.props.ID_fisa_lucrare_absolvire)}}>Salveaza Vize</Button>

                   </TableCell>
               </TableRow>
           </Table>


            </div>


                )
    }}

export default Vize;
