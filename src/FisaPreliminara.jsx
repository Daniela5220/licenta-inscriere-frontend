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
    TableBody, GridRow, GridColumn, TableHeaderCell, Loader, Dimmer, Image, Segment, Modal, Checkbox

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
        focused5:false,
        disabled:false,
        disabled2:false,
        disabled1:false,
        selectedFile:null,
        log:0,
        modalSucces:false,
        modalEroare:false,
        confirmare:null


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
            .get('Optiune/GetStudentByUsernameAnUniv?username=' +this.props.username)
            .then(re => {
                console.log(re.data)
                this.setState({
                    ID_facultate: re.data[0].ID_Facultate

                })

                axios
            .get('Optiune/GetFisaPreliminara?StudentUsername='+this.props.username+'&ID_Facultate='+this.state.ID_facultate)
            .then(rez => {
                this.setState({
                    Fisa: rez.data
                })
                this.setState({log:1})
                console.log(rez.data)
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
                if(rez.data[0].Termen_predare==null){
                    this.setState({t5:moment()})
                }else{
                    this.setState({t5:rez.data[0].Termen_predare})
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
                        <object data={this.state.file} type="application/pdf" width="30%" height="25%"/>
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
    salveazaSemnaturiDirDep=()=>{



        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        this.setState({confirmare:"A aparut o problema, semnatura NU a fost adăugată!"});
        axios
            .post('Optiune/PutFisaPreliminaraSemnaturaDirDepAddByIDDirDep',formData)
            .then(re=> {
                console.log(re)
                console.log("Semnatrile au fost inserate cu succes au fost efectuate")
                this.setState({confirmare:"Semnatrile au fost inserate cu succes au fost efectuat"})
            })




}
    save=(fisa, Probleme_principale)=>{

        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );


    if(this.props.rol==0){
            try{
                axios
                    .post('Optiune/PutFisaPreliminara?ID_fisa_preliminara='+fisa+'&probleme_principale='+this.state.problemePrincipale+'&loc_durata='+this.state.locdurata+'&bibliografie='+this.state.bibliografie+'&Termen1='+this.state.t1.format('DD/MM/yyyy')+'&Termen2='+this.state.t2.format('DD/MM/yyyy')+'&Termen3='+this.state.t3.format('DD/MM/yyyy')+'&Termen4='+this.state.t4.format('DD/MM/yyyy')+'&Termen_predare='+this.state.t5.format('DD/MM/yyyy'),formData)
                    .then(re=> {
                        console.log(re)
                        console.log("Updatarile au fost efectuate")
                    })
            }catch (Exception ){
            console.log("Nu ai completat toate câmpurile")
            this.setState({modalEroare:true});
        }

    }
    if(this.props.rol==2){
        try {


            if (this.state.aspecteParticulare != null) {
                console.log(this.state.aspecteParticulare)
                axios
                    .put('Optiune/PutFisaPreliminaraStudent?ID_fisa_preliminara=' + fisa + '&Aspecte_particulare=' + this.state.aspecteParticulare)
                    .then(re => {
                        console.log("Updatarile au fost efectuate")
                    })

            }
            axios
                .post('Optiune/PutSemnaturaStudent?ID_fisa_preliminara=' + fisa, formData)
                .then(re => {
                    console.log(re)

                })
        }catch (Exception ){
            console.log("Nu ai completat toate câmpurile")
            this.setState({modalEroare:true});

    }}
    if(this.props.rol==1){
        try{
        axios
            .post('Optiune/PutFisaPreliminaraSemnaturaDirDepAdd?ID_fisa_preliminara='+fisa,formData)
            .then(re => {
                console.log(re)
            })

         }catch (Exception ){
            console.log("Nu ai completat toate câmpurile")
            this.setState({modalEroare:true});
}}}
componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.username !== this.props.username &&
            prevProps.username !== null
        ) {

            this.componentDidMount()
        }

    }
    render(){
        {this.state.log===0&&
        <div>
            <Loader active inline='centered'>Loading</Loader>
        </div>
        }
        return(
            <div className={'body'} >
                <Checkbox label={<label>Semnează toate fișele</label>}  onClick={()=>this.setState({openModal:true})}  />

                    {this.state.Fisa.map((e, index) => {
                        return (
                            <div key={e.ID_fisa_preliminara}>

                                <Table >

                                <TableHeader >
                                    <TableHeaderCell colSpan={2}>UNIVERSITATEA TRANSILVANIA DIN BRASOV</TableHeaderCell>
                                    </TableHeader>



                                <tbody>

                    <TableRow>
                        <Table.Cell>Facultatea : {e.DenumireFacultate}</Table.Cell>
                        <Table.Cell>Deparamentul: {e.Departament}</Table.Cell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Programul de studiu: {e.DenumireSpecializare}</TableCell>
                        <TableCell>Anul universitar: {e.DenumireAnUniv}</TableCell>
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
                        <TableCell colSpan={3}>
                            <TextArea className={'TextArea'} defaultValue={e.Tema_lucrare}
                                      disabled = {this.state.disabled}
                            ></TextArea>
                        </TableCell>
                        </TableRow>
                           <TableRow>
                        <TableCell> Problemele principale care vor fi tratate:</TableCell>
                               <TableCell colSpan={3}>
                                   <TextArea className={'TextArea'} defaultValue={e.Probleme_principale}
                                             disabled = {this.state.disabled}
                                             onChange={((e, data) => this.changeProblemePrincipale(data.value))}
                                   ></TextArea>
                               </TableCell>
                           </TableRow>
                    <TableRow>
                        <TableCell>Locul si durata practicii:</TableCell>
                        <TableCell colSpan={3}>
                            <TextArea className={'TextArea'}
                                      disabled = {this.state.disabled}
                                      defaultValue={e.Loc_durata}
                                      onChange={((e, data) => this.locdurata(data.value))}
                            ></TextArea>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Bibliografia recomandata:</TableCell>
                        <TableCell colSpan={3}>
                            <TextArea
                                disabled = {this.state.disabled}
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
                                disabled = {this.state.disabled2}
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
                        <TableCell>


                            <SingleDatePicker
                                disabled = {this.state.disabled}
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

                        >
                            <SingleDatePicker
                                disabled = {this.state.disabled}
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

                        >
                            <SingleDatePicker
                                disabled = {this.state.disabled}
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

                        >
                            <SingleDatePicker
                                disabled = {this.state.disabled}
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
                <div>Termenul de predare a lucrarii <SingleDatePicker
                    disabled = {this.state.disabled}
                    date={moment(this.state.t5)}
                    onDateChange={t5=>this.setState({t5})}
                    displayFormat="DD/MM/YYYY"
                    placeholder="Data"
                    focused={this.state.focused5}
                    onFocusChange={({focused:focused5})=>this.setState({focused5})}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                /></div>
                                <div>Sematuri:</div>
                    <Table>
                        <TableHeader>
                            <TableHeaderCell>Student</TableHeaderCell>
                            <TableHeaderCell>Profesor coordonator</TableHeaderCell>
                            <TableHeaderCell>Director departament</TableHeaderCell>
                        </TableHeader>
                        <tbody>
                        <TableRow>
                            <TableCell>{e.NumeStudent} {e.PrenumeStudent}</TableCell>
                            <TableCell>{e.NumeCoordonator} {e.PrenumeCoordonator}</TableCell>
                            <TableCell>{e.NumeDirecorDepartament}</TableCell>
                        </TableRow>
                        <TableRow>

                            <TableCell
                                 disabled = {this.state.disabled2}
                            >
                                {e.Student_img_sem==null? <input type="file" onChange={this.onFileChange}/>: <object
                                    style={{width: '80pt', height: '60pt'}}
                                    data={'data:application/pdf;base64,' + e.Student_img_sem}></object>

                                }

                            </TableCell>
                            <TableCell
                                disabled = {this.state.disabled}

                            >
                                {e.Indrumator_img_sem==null? <input type="file" onChange={this.onFileChange}/>: <object
                                    style={{width: '80pt', height: '60pt'}}
                                    data={'data:application/pdf;base64,' + e.Indrumator_img_sem}></object>

                                }

                            </TableCell>
                            <TableCell
                                disabled = {this.state.disabled2}

                            >
                                {e.Director_departament_img_sem==null? <input type="file" onChange={this.onFileChange}/>: <object
                                    style={{width: '80pt', height: '60pt'}}
                                    data={'data:application/pdf;base64,' + e.Director_departament_img_sem}></object>

                                }

                            </TableCell>
                        </TableRow>
                        </tbody>
                    </Table>
                                {/*<div>Data: {this.state.date}</div>*/}

                                <Button className={"savebutton"} color='green' onClick={() => {this.save(e.ID_fisa_preliminara,e.Probleme_principale)}}>Save</Button>



                            </div>

                        )})}
                <Modal
                    closeIcon
                    onClose={()=>this.setState({modalSucces:false})}
                    size={'small'}
                    open={this.state.modal}

                >
                    <Modal.Content>
                        <p >Fisa preliminară a fost completată cu succes!</p>
                    </Modal.Content>

                </Modal>
                <Modal
                    closeIcon
                    onClose={()=>this.setState({modalEroare:false})}
                    size={'small'}
                    open={this.state.modalEroare}

                >
                    <Modal.Content>
                        <p >Nu ai completat toate câmpurile!</p>
                    </Modal.Content>

                </Modal>
                <Modal
                    closeIcon
                    onClose={()=>this.setState({openModal:false})}
                    size={'small'}
                    open={this.state.openModal}

                >
                    <Modal.Content>
                        <div >
                            <p >Inserează semnătura pentru toate fisele preliminarii!</p>
                            <input type="file" onChange={this.onFileChange} disabled = {this.state.disabled1}/>
                            {this.fileData()}

                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        {this.state.confirmare}
                        <Button className={"savebutton"} color='green' onClick={() => {this.salveazaSemnaturiDirDep()}}>Adaugă semnatură</Button>

                    </Modal.Actions>

                </Modal>

            </div>
        )
    }
}
export default FisaPreliminara;