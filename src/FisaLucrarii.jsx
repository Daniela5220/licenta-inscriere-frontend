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
    TextArea
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
    state={
        usernameStudent:null,
        date:date,
        apreciere:null,
        semnaturaDirDep:null,
        semnaturaAvizIndrumător:null,
        fileSemn:null,
        lucrare:[],
        val1:null,
        val2:null,
        viza:[
            {

                Problema:null,
                Data_vizei:moment(),
                ID_fisa_lucrare_absolvire:null,
                Indrumator_semnat:null,
                Indrumator_semnat_data:null
            },
            {

                Problema:null,
                Data_vizei:moment(),
                ID_fisa_lucrare_absolvire:null,
                Indrumator_semnat:null,
                Indrumator_semnat_data:null
            },
            {

                Problema:null,
                Data_vizei:moment(),
                ID_fisa_lucrare_absolvire:null,
                Indrumator_semnat:null,
                Indrumator_semnat_data:null
            },
            {

                Problema:null,
                Data_vizei:moment(),
                ID_fisa_lucrare_absolvire:null,
                Indrumator_semnat:null,
                Indrumator_semnat_data:null
            },
            {

                Problema:null,
                Data_vizei:moment(),
                ID_fisa_lucrare_absolvire:null,
                Indrumator_semnat:null,
                Indrumator_semnat_data:null
            }

        ],
        selectedFile:null,
        dataprimire: moment(),
        datapredare: moment()

    }
    onFileChange = event => {
        // Update the state
        this.setState({semnaturaDirDep: event.target.files[0]});
        console.log(event.target.files[0])
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    };
    FileChange = event => {
        // Update the state
        this.setState({fileSemn: event.target.files[0]});
        console.log(event.target.files[0])
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    };

    onFileChange2 = event => {
        // Update the state
        this.setState({semnaturaAvizIndrumător: event.target.files[0]});
        console.log(event.target.files[0])
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    };
    actualizareOptiuniDinState=(index,key,value)=>{
        let vizaCopy=[...this.state.viza]
        vizaCopy[index][key]=value;
        this.setState({vize:vizaCopy})

    }

    handleChange=(e, { value }) =>{
        this.setState({ val1:value })
        console.log("Statusul ales este"+this.state.val1)
    }
    handleChange2=(e, { value }) =>{
        this.setState({ val2:value })
        console.log("Statusul ales este"+this.state.val1)
    }



    adaugaVizeinState=()=>{
        console.log('test')
        this.state.viza.push(
            {

                Problema: null,
                Data_vizei: moment().format('MM/DD/yyyy'),
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

        console.log(this.props.usernameStudent)
        axios
            .get('Optiune/GetFisaLucrareAbsolvireStudent?UsernameStudent='+this.props.usernameStudent+'&ID_AnUniv=39')
            .then(response => {

                this.setState({
                    lucrare: response.data

                })
                if (response.data[0].Indrumator_calificativ == 'ADMIS') {
                    this.setState({
                        val1:1})}
                if (response.data[0].Indrumator_calificativ == 'RESPINS') {
                    this.setState({
                        val1:2
                    })}
                if (response.data[0].Director_departament_calificativ == 'ADMIS') {
                    this.setState({
                        val2:1})}
                if (response.data[0].Director_departament_calificativ == 'RESPINS') {
                    this.setState({
                        val2:2})}
                if(response.data[0].Tema_lucrare!=null){
                    this.setState({
                        tema:response.data[0].Tema_lucrare})}
                if(response.data[0].Probleme_principale!=null){
                    this.setState({
                        problemePrincipale:response.data[0].Probleme_principale})}
                if(response.data[0].Bibliografie!=null){
                    this.setState({
                        bibliografie:response.data[0].Bibliografie})}
                if(response.data[0].Aspecte_particulare!=null){
                    this.setState({
                        aspecteParticulare:response.data[0].Aspecte_particulare})}
                if(response.data[0].Aspecte_particulare!=null){
                    this.setState({
                        aspecteParticulare:response.data[0].Aspecte_particulare})}
                if(response.data[0].Loc_durata_practica!=null){
                    this.setState({
                        locdurata:response.data[0].Loc_durata_practica})}
                if(response.data[0].Data_predare!=null){
                    this.setState({
                        data_predare:response.data[0].Data_predare})}
                if(response.data[0].Data_primire!=null){
                    this.setState({
                        data_pimire:response.data[0].Data_primire})}


            });
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.viza !== this.state.viza

        ) {

            this.componentDidMount()
        }
        if (
            prevProps.usernameStudent !== this.props.usernameStudent

        ) {

            this.componentDidMount()
        }


    }
    changeProblemePrincipale=(p)=>{
        this.setState({problemePrincipale:p})


    }
    locdurata=(p)=>{
        this.setState({locdurata:p})

    }
    temalucrare=(p)=>{
        this.setState({tema:p})

    }
    bibliografie=(p)=>{
        this.setState({bibliografie:p})

    }
    aspecteparticulare=(p)=>{
        this.setState({aspecteParticulare:p})

    }
    apreciereindrumator=(p)=>{
        this.setState({apreciere:p.toString()})

    }
        save=(ID_fisa_lucrare_absolvire)=>{
            const formData = new FormData();

            // Update the formData object
            console.log(this.state.semnaturaDirDep)
            formData.append(
                "myFile",
                this.state.semnaturaDirDep,
                this.state.semnaturaDirDep.name
            );

            // Details of the uploaded file
            console.log(this.state.semnaturaDirDep);

            // Request made to the backend api
            // Send formData object
            console.log(formData)

            axios
                .post('Optiune/PostAvizDirDep?ID_fisa_lucrare_absolvire='+ID_fisa_lucrare_absolvire+'&ID_calificativ='+this.state.val2,formData)
                .then(re => {

                    console.log('Viza DirDep  a fost salvata');
                })

        }

        saveChange=(idfisa)=>{
            const formData = new FormData();

            // Update the formData object
            console.log(this.state.file)
            formData.append(
                "myFile",
                this.state.fileSemn,
                this.state.fileSemn.name
            );
            // Details of the uploaded file
            console.log(this.state.file);
            // Request made to the backend api
            // Send formData object
            // console.log(formData)
            console.log(this.state.dataprimire)
            const request = {
                ID_fisa_lucrare_absolvire: idfisa,
                tema_lucrare: this.state.tema,
                probleme_principale: this.state.problemePrincipale,
                loc_durata_practica: this.state.locdurata,
                bibliografie: this.state.bibliografie,
                data_primire: this.state.dataprimire.format('DD/MM/yyyy'),
                data_predare: this.state.datapredare.format('DD/MM/yyyy'),
                Aspecte_particulare:this.state.aspecteParticulare
            };
            const post = JSON.stringify(request);
            axios
                .post('Optiune/PostFisaLucrareUpdate',post)
                .then(r=>{
                    console.log('Updateurile au fost efectuate')
                })
            axios
                .post('Optiune/PostFisaLucrareSemnaturi?ID_fisa_lucrare_absolvire='+idfisa,formData)
                .then(r=>{
                    console.log('Semnatura a fost adaugata')
                })
        }





        saveIndrumatorAviz=(ID_fisa_lucrare_absolvire)=>{
            const formData = new FormData();

            // Update the formData object
            formData.append(
                "myFile",
                this.state.semnaturaAvizIndrumător,
                this.state.semnaturaAvizIndrumător.name
            );

            // Details of the uploaded file
            console.log(this.state.semnaturaAvizIndrumător);

            // Request made to the backend api
            // Send formData object
            console.log(formData)
            axios
                .post('Optiune/PostAvizIndrumator?ID_fisa_lucrare_absolvire='+ID_fisa_lucrare_absolvire+'&Indrumator_calificativ='+this.state.val1+'&Indrumator_apreciere='+this.state.apreciere,formData)
                .then(re => {

                    console.log('Viza Indrumator  a fost salvata');
                }).catch(error => {
                console.log(error)
            })

        }
    dataAvizDirDep=(Data)=>{
        if(Data!=null) {
            var data = new Date(Data)
            date=data.getDate()+ '/' + (data.getMonth() + 1)+ '/' + data.getFullYear();
            return (date)
        }

        else{
            return(
                this.state.date
            )
        }
    }
    dataAvizIndrumator=(Data)=>{
        if(Data!=null) {
            var data = new Date(Data)
            date=data.getDate()+ '/' + (data.getMonth() + 1)+ '/' + data.getFullYear();
            return (date)
        }

        else{
            return(
                this.state.date
            )
        }
    }
    render(){
        return(
            <div>
            {this.state.lucrare.map((e, index) => {

                    return (
                    <div className={'body'} key={e.ID_fisa_lucrare_absolvire}>


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
                                <TableCell>Promoţia {e.Promotie}</TableCell>
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
                                    <TextArea className={'TextArea'} defaultValue={e.Tema_lucrare}
                                              onChange={((e, data) => this.temalucrare(data.value))}
                                    ></TextArea>
                                    </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div>Probleme principale</div>

                                    <TextArea className={'TextArea'} defaultValue={e.Probleme_principale}
                                              onChange={((e, data) => this.changeProblemePrincipale(data.value))}
                                    ></TextArea>
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

                                    <TextArea className={'TextArea'} defaultValue={e.Bibliografie}></TextArea>
                                    </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div>Aspecte particulare</div>

                                    <TextArea className={'TextArea'} defaultValue= {e.Aspecte_particulare}
                                              onChange={((e, data) => this.aspecteparticulare(data.value))}
                                    ></TextArea>

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Data predare lucrare:   <SingleDatePicker

                                    date={moment(this.state.datapredare)}
                                    onDateChange={datapredare=>this.setState({datapredare})}
                                    displayFormat="DD/MM/YYYY"
                                    placeholder="Data"
                                    focused={this.state.focused}
                                    onFocusChange={({focused:focused})=>this.setState({focused})}
                                    numberOfMonths={1}
                                    isOutsideRange={() => false}
                                /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Data primirii lucrării:     <SingleDatePicker

                                    date={moment(this.state.dataprimire)}
                                    onDateChange={dataprimire=>this.setState({dataprimire})}
                                    displayFormat="DD/MM/YYYY"
                                    placeholder="Data"
                                    focused={this.state.focused2}
                                    onFocusChange={({focused:focused2})=>this.setState({focused2})}
                                    numberOfMonths={1}
                                    isOutsideRange={() => false}
                                /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                   <div> Director departament: {e.NumeDirectorDepartamnet}</div>
                                    <input type="file" onChange={this.FileChange}/>

                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div>Cadru didactic îndrumător: {e.NumeCoordonamtor}</div>
                                    <input type="file" onChange={this.FileChange}/>

                                    </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div>Candidat: {e.NumeStudent} {e.PrenumeStudent} </div>
                                    <input type="file" onChange={this.FileChange}/>

                                    </TableCell>
                            </TableRow>
                        </Table>
                        <Button onClick={()=>{this.saveChange(e.ID_fisa_lucrare_absolvire)}}>Salveaza</Button>
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
                                      ID_fisa_lucrare_absolvire={e.ID_fisa_lucrare_absolvire}
                                    vizaCopy={item}
                                    index={index}
                                    key={index}

                                />
                            )
                        })}
                        {/*<Button onClick={()=>{this.saveVize(e.ID_fisa_lucrare_absolvire)}}>Salveaza Vize</Button>*/}
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
                                    <TextArea
                                        className={'TextArea'} defaultValue= {e.Indrumator_apreciere}
                                        onChange={((e, data) => this.apreciereindrumator(data.value))}
                                    ></TextArea>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Data
                                </TableCell>
                                <TableCell>Alege status lucrare</TableCell>
                                <TableCell>  Profesor coordonator</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div>  {this.dataAvizIndrumator(e.Indrumator_data_aviz)}</div>
                                </TableCell>
                                <TableCell>

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
                                <TableCell>
                                    <input type="file" onChange={this.onFileChange2}/>
                                </TableCell>

                            </TableRow>

                            </tbody>
                            <Button onClick={()=>{this.saveIndrumatorAviz(e.ID_fisa_lucrare_absolvire)}}>Salveaza</Button>
                        </Table>

                        <Table>
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
                                <TableCell>
                                    <Form>

                                        <Form.Field>
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
                                <TableCell>
                                    <input type="file" onChange={this.onFileChange}/>
                                </TableCell>

                            </TableRow>

                            </tbody>
                        </Table>
                        <Button onClick={()=>{this.save(e.ID_fisa_lucrare_absolvire)}}>Salveaza</Button>
                        <RezultatSustinereLicenta
                        ID_AnUniv={this.props.ID_AnUniv}
                        ID_Student={e.ID_student}
                        ID_fisa_lucrare_absolvire={e.ID_fisa_lucrare_absolvire}
                        />

                    </div>
                     )})}
            </div>


        )}}

export default FisaLucrarii;
