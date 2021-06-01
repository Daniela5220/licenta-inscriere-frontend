import React, {Component} from 'react';
import  { useState } from 'react';
import Semnatura from './Semnatura';
import {
    Button,
    Dropdown,
    TextArea,
    Menu,
    MenuItem,
    Input,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody, GridRow, GridColumn, TableHeaderCell

} from "semantic-ui-react";
import Style from'./Style.css';
import axios from "./axios-API";
import App from "./App";
import DataPicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/ro";
import DateTimePicker from 'react-datetime-picker';


// var today = new Date(),
//     date =today.getDate()+ '-' + (today.getMonth() + 1)+ '-' + today.getFullYear();



class FisaPreliminara extends Component {
    constructor(props) {
        super(props);

    }
    state ={
        // date: date,
       ID_facultate:null,
        ID_AnUniv:39,
        Fisa:[],
        problemePrincipale:null,
        locdurata:null,
        bibliografie:null,
        aspecteParticulare:null,
        startDate:new Date(),
        focused:false,
        focused2:false,
        focused3:false,
        focused4:false,
        disabled:false,
        disabled2:false,
        disabled1:false,
        selectedFile:null

    }


    componentDidMount() {
        console.log(this.props.rol)
        if(this.props.rol==2){
            this.setState({disabled:true})
        }
        if(this.props.rol==0){
            this.setState({disabled2:true})

        }
        if(this.props.rol==1){
            this.setState({disabled:true})
            this.setState({disabled2:true})
        }

        axios
            .get('Optiune/GetStudentByUsernameAnUniv?username=' +this.props.username + '&ID_AnUniv=' + this.props.ID_AnUniv)
            .then(re => {
                console.log(re.data)
                this.setState({
                    ID_facultate: re.data[0].ID_Facultate

                })

                axios
            .get('Optiune/GetFisaPreliminara?StudentUsername='+this.props.username+'&ID_Facultate='+this.state.ID_facultate+'&ID_An='+this.props.ID_AnUniv)
            .then(rez => {
                this.setState({
                    Fisa: rez.data

                })
                this.setState({problemePrincipale:rez.data[0].Probleme_principale})
                this.setState({locdurata:rez.data[0].Loc_durata})
                this.setState({bibliografie:rez.data[0].Bibliografie})
                this.setState({aspecteParticulare:rez.data[0].Aspecte_particulare})

                if(rez.data[0].Termen1==null){
                    this.setState({t1:moment()})
                }else{
                    this.setState({t1:rez.data[0].Termen1})
                }
                if(rez.data[0].Termen2==null){
                    this.setState({t2:moment()})
                }else{
                    this.setState({t2:rez.data[0].Termen2})
                }
                if(rez.data[0].Termen3==null){
                    this.setState({t3:moment()})
                }else{
                    this.setState({t3:rez.data[0].Termen3})
                }
                if(rez.data[0].Termen4==null){
                    this.setState({t4:moment()})
                }else{
                    this.setState({t4:rez.data[0].Termen4})
                }


            });

    })
}

    onFileChange = event => {
        // Update the state
        this.setState({selectedFile: event.target.files[0]});
        console.log(event.target.files[0])
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })

    };
    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <p>{/*Last Modified:{" "}*/}
                        {/*{this.state.selectedFile.lastModifiedDate.toDateString()}*/}
                        <object data={this.state.file} type="application/pdf" width="25%" height="25%"/>
                    </p>
                </div>
            );
        }
    };

changeProblemePrincipale=(p)=>{
    this.setState({problemePrincipale:p})


}
    locdurata=(p)=>{
        this.setState({locdurata:p})

    }
    bibliografie=(p)=>{
        this.setState({bibliografie:p})

    }
    aspecteparticulare=(p)=>{
        this.setState({aspecteParticulare:p})

    }








    update=(fisa, Probleme_principale)=>{
    console.log("Macar vedem daca merge")
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        console.log(formData)
    if(this.props.rol==0){

        axios
            .post('Optiune/PutFisaPreliminara?ID_fisa_preliminara='+fisa+'&probleme_principale='+this.state.problemePrincipale+'&loc_durata='+this.state.locdurata+'&bibliografie='+this.state.bibliografie+'&Termen1='+this.state.t1.format('DD/MM/yyyy')+'&Termen2='+this.state.t2.format('DD/MM/yyyy')+'&Termen3='+this.state.t3.format('DD/MM/yyyy')+'&Termen4='+this.state.t4.format('DD/MM/yyyy'),formData)
            .then(re=> {
                console.log(re)
                console.log("Updatarile au fost efectuate")



            })




    }
    if(this.props.rol==2){

        if(this.state.aspecteParticulare!=null) {
            console.log(this.state.aspecteParticulare)
            axios
                .put('Optiune/PutFisaPreliminaraStudent?ID_fisa_preliminara=' + fisa + '&Aspecte_particulare=' + this.state.aspecteParticulare)
                .then(re => {
                    console.log("Updatarile au fost efectuate")
                })

        }
        axios
            .post('Optiune/PutSemnaturaStudent?ID_fisa_preliminara='+fisa,formData)
            .then(re => {
                console.log(re)

            })

    }
    if(this.props.rol==1){
        axios
            .post('Optiune/PutFisaPreliminaraSemnaturaDirDepAdd?ID_fisa_preliminara='+fisa,formData)
            .then(re => {
                console.log(re)

            })

    }

    }




    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.username !== this.props.username &&
            prevProps.username !== null
        ) {

            this.componentDidMount()
        }

    }
    render(){
        return(
            <div className={'body'}>


                    {this.state.Fisa.map((e, index) => {
                        return (
                            <div key={e.ID_fisa_preliminara}>

                                <Table >
                                <TableHeader>UNIVERSITATEA TRANSILVANIA DIN BRASOV</TableHeader>
                                <tbody>

                    <TableRow>
                        <Table.Cell>Facultatea : {e.DenumireFacultate}</Table.Cell>
                        <Table.Cell>Deparamentul: {e.Departament}</Table.Cell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Programul de studiu: {e.DenumireSpecializare}</TableCell>
                        <TableCell>Anul universitar:</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Candidat:{e.NumeStudent} {e.PrenumeStudent}</TableCell>
                        <TableCell>Grupa:{e.DenumireGrupa}</TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell>Cadrul diadactic indrumator : {e.NumeCoordonator} {e.PrenumeCoordonator}</TableCell>
                        <TableCell>Deparamentul: {e.Departament}</TableCell>
                    </TableRow>
                                </tbody>

                </Table>
                <h1>FIŞA PRELIMINARĂ A LUCRĂRII DE ABSOLVIRE/ LUCRĂRII DE LICENTĂ/
                            PROIECTULUI DE DIPLOMĂ/ DISERTAŢTIE
                        </h1>
                <Table >
                    <tbody>
                    <TableRow>
                        <TableCell className={'fptrow'}>Tema lucrarii</TableCell>
                        <TableCell colSpan={3}
                                   disabled = {(this.state.disabled)? "disabled" : ""}
                        >
                            <TextArea className={'TextArea'} defaultValue={e.Tema_lucrare}></TextArea>
                        </TableCell>
                        </TableRow>
                           <TableRow>
                        <TableCell> Problemele principale care vor fi tratate:</TableCell>
                               <TableCell colSpan={3}
                                          disabled = {(this.state.disabled)? "disabled" : ""}
                               >
                                   <TextArea className={'TextArea'} defaultValue={e.Probleme_principale}
                                             onChange={((e, data) => this.changeProblemePrincipale(data.value))}
                                   ></TextArea>
                               </TableCell>
                           </TableRow>
                    <TableRow>
                        <TableCell>Locul si durata practicii:</TableCell>
                        <TableCell colSpan={3}
                                   disabled = {(this.state.disabled)? "disabled" : ""}
                        >
                            <TextArea className={'TextArea'}
                                      defaultValue={e.Loc_durata}
                                      onChange={((e, data) => this.locdurata(data.value))}
                            ></TextArea>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Bibliografia recomandata:</TableCell>
                        <TableCell colSpan={3}
                                   disabled = {(this.state.disabled)? "disabled" : ""}
                        >
                            <TextArea

                                className={'TextArea'}
                                      defaultValue={e.Bibliografie}
                                      onChange={((e, data) => this.bibliografie(data.value))}
                            ></TextArea>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Aspecte particulare privind lucrarea:</TableCell>
                        <TableCell colSpan={3}>
                            <TextArea
                                disabled = {(this.state.disabled2)? "disabled" : ""}
                                className={'TextArea'}
                                      defaultValue={e.Aspecte_particulare}
                                      onChange={((e, data) => this.aspecteparticulare(data.value))}
                            ></TextArea>
                        </TableCell>
                    </TableRow>
                <TableRow>
                    <TableCell>Termen 1</TableCell>
                    <TableCell>Termen 2</TableCell>
                    <TableCell>Termen 3</TableCell>
                    <TableCell>Termen 4</TableCell>
                </TableRow>
                    <TableRow>
                        <TableCell
                            disabled = {(this.state.disabled)? "disabled" : ""}
                        >


                            <SingleDatePicker

                               date={moment(this.state.t1)}
                                onDateChange={t1=>this.setState({t1})}
                                displayFormat="DD/MM/YYYY"
                                placeholder="Data"
                                focused={this.state.focused}
                                onFocusChange={({focused })=>this.setState({focused})}
                                numberOfMonths={1}
                                isOutsideRange={() => false}


                            />
                        </TableCell>

                        <TableCell
                            disabled = {(this.state.disabled)? "disabled" : ""}
                        >
                            <SingleDatePicker

                                date={moment(this.state.t2)}
                                onDateChange={t2=>this.setState({t2})}
                                displayFormat="DD/MM/YYYY"
                                placeholder="Data"
                                focused={this.state.focused2}
                                onFocusChange={({focused:focused2})=>this.setState({focused2})}
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                            />

                        </TableCell>
                        <TableCell
                            disabled = {(this.state.disabled)? "disabled" : ""}
                        >
                            <SingleDatePicker

                                date={moment(this.state.t3)}
                                onDateChange={t3=>this.setState({t3})}
                                displayFormat="DD/MM/YYYY"
                                placeholder="Data"
                                focused={this.state.focused3}
                                onFocusChange={({focused:focused3})=>this.setState({focused3})}
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                            />
                        </TableCell>
                        <TableCell
                            disabled = {(this.state.disabled)? "disabled" : ""}
                        >
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
                    </TableRow>
                    </tbody>

            </Table>
                <div>Termenul de predare a lucrarii</div>
                                <div>Sematuri:</div>
                    <Table>
                        <TableHeader>
                            <TableHeaderCell>Student</TableHeaderCell>
                            <TableHeaderCell>Profesor coordonator</TableHeaderCell>
                            <TableHeaderCell>Diretor departament</TableHeaderCell>
                        </TableHeader>
                        <tbody>
                        <TableRow>
                            <TableCell>{e.NumeStudent} {e.PrenumeStudent}</TableCell>
                            <TableCell>{e.NumeCoordonator} {e.PrenumeCoordonator}</TableCell>
                            <TableCell>{e.NumeDirecorDepartament}</TableCell>
                        </TableRow>
                        <TableRow>

                            <TableCell
                                 disabled = {(this.state.disabled2)? "disabled" : ""}
                            >
                                <input type="file" onChange={this.onFileChange}/>

                            </TableCell>
                            <TableCell
                                disabled = {(this.state.disabled)? "disabled" : ""}
                            >
                                <input type="file" onChange={this.onFileChange}/>

                            </TableCell>
                            <TableCell
                                disabled = {(this.state.disabled)? "disabled" : ""}

                            >
                                <input type="file" onChange={this.onFileChange}/>

                            </TableCell>
                        </TableRow>
                        </tbody>
                    </Table>
                {/*<div>Data: {this.state.date}</div>*/}

                                <Button className={"savebutton"} color='green' onClick={() => {this.update(e.ID_fisa_preliminara,e.Probleme_principale)}}>Save</Button>



                            </div>

                        )})}

            </div>
        )
    }
}
export default FisaPreliminara;