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
    Table,
    TableCell,
    TableFooter,
    TableHeader,
    TableHeaderCell,
    TableRow,
    TextArea,
    Form,
    Radio,
    Input, Dropdown, Button
} from "semantic-ui-react";


class RezultatSustinereLicenta extends Component {
    constructor(props) {
        super(props)

    }
    state={
        rezultat:null,
        media:null,
        disabled:false,
        listaSefComisie:[],
        SefComisie:null,
        semnaturaPresedinteComisie:null,
        sesiune:null,
        rezultatelicenta:[]
    }
    handleChange=(e, { value }) =>{
        this.setState({ rezultat:value })
        console.log("Statusul ales este"+this.state.rezultat)


    }
    onFileChange = event => {
        // Update the state
        this.setState({semnaturaPresedinteComisie: event.target.files[0]});
        console.log(event.target.files[0])
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    };
    componentDidMount() {
        axios
            .get('Optiune/GetProfesoriListPresedinteComisie?ID_AnUniv=' + this.props.ID_AnUniv + '&ID_Student=' + this.props.ID_Student)

            .then(r => {
                let listaSefComisie = [];
                for (let Profesor of r.data) {
                    listaSefComisie.push({
                        key: Profesor.ID_Profesor,
                        value: Profesor.ID_Profesor,
                        text: Profesor.NumeIntreg


                    })
                }
                this.setState({listaSefComisie: listaSefComisie})
                console.log(listaSefComisie)
            });
        axios
            .get('Optiune/GetSesiune?ID_student=' + this.props.ID_Student + '&ID_AnUniv=' + this.props.ID_AnUniv)

            .then(r => {
                this.setState({sesiune: r.data})

            })
        axios
            .get('Optiune/GetRezultatSustinereLicenta?ID_fisa_lucrare_absolvire=' + this.props.ID_fisa_lucrare_absolvire)
            .then(rez => {
                this.setState({rezultatelicenta: rez.data})
                console.log(rez.data);
                if(rez.data.length!=0) {
                    console.log(rez.data)
                    this.setState({media:rez.data[0].Media})
                    this.setState({SefComisie:{key:rez.data[0].ID_presedinte_comisie,value:rez.data[0].ID_presedinte_comisie, text:rez.data[0].NumePresedinteComisie+' '+rez.data[0].PrenumePresedinteComisie}});
                        console.log(rez.data[0].ID_presedinte_comisie)
                        console.log(rez.data[0].NumePresedinteComisie+' '+rez.data[0].PrenumePresedinteComisie)


                    if(rez.data[0].Status_rezultat=="ADMIS"){
                        this.setState({rezultat:1})
                    }
                    if(rez.data[0].Status_rezultat=="RESPINS"){
                        this.setState({rezultat:2})
                    }
                    if(rez.data[0].Status_rezultat=="RESPINS FARA REFACEREA LUCRARII"){
                        this.setState({rezultat:3})
                    }
                }


            })
    }



    save=()=>{
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.semnaturaPresedinteComisie,
            this.state.semnaturaPresedinteComisie.name
        );

        // Details of the uploaded file
        console.log(this.state.semnaturaPresedinteComisie);

        // Request made to the backend api
        // Send formData object
        console.log(formData)
        axios
            .post('Optiune/PostRezultatSustinereLicenta?Media='+this.state.media+'&Sesiune='+this.state.sesiune+'&ID_status_rezultat='+this.state.rezultat+'&ID_presedinte_comisie='+this.state.SefComisie+'&ID_fisa_lucrare_absolvire='+this.props.ID_fisa_lucrare_absolvire,formData)
            .then(rez=>{
                console.log("REZULTAT ADAUGAT")
            }

        )
    }
    alegeSefComisie=(sefcomisie)=>{
        this.setState({SefComisie: sefcomisie})
        console.log(this.state.SefComisie)
    }
    changeMedia=(media)=>{
        this.setState({
            media:media
        })
    }
    render(){

        return(
            <div >
                {this.state.rezultatelicenta.map((e, index) => {
                    return(

                <Table>
                    <TableHeader>
                        <TableHeaderCell colSpan={3}>
                            SUSŢINEREA LUCRĂRII DE ABSOLVIRE/ LUCRĂRII DE LICENŢĂ/
                            PROIECTULUI DE DIPLOMĂ/ DISERTAŢIEI

                        </TableHeaderCell>
                    </TableHeader>
                    <tbody>
                    <TableRow>
                        <TableCell >Sesiunea</TableCell>
                        <TableCell>{this.state.sesiune}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Rezultatul
                            susţinerii
                        </TableCell>
                        <TableCell>
                            <Form>

                                <Form.Field>
                                    <Radio
                                        label='ADMIS'
                                        name='radioGroup1'
                                        value={1}
                                        checked={this.state.rezultat === 1}
                                        onChange={this.handleChange}
                                    />

                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='RESPINS'
                                        name='radioGroup1'
                                        value={2}
                                        checked={this.state.rezultat === 2}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='RESPINS FARA REFACEREA LUCRARII'
                                        name='radioGroup1'
                                        value={3}
                                        checked={this.state.rezultat === 3}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Form>
                        </TableCell>
                        <TableCell>
                            <div>
                            <div>Media:</div>
                                <TextArea
                                    disabled = {(this.state.disabled)? "disabled" : ""}
                                    className={'TextArea'} defaultValue= {this.state.media}
                                    value={this.state.media}
                                          onChange={((e, data) => this.changeMedia(data.value))}
                                ></TextArea>

                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Presedinte comisie:
                        </TableCell>
                        <TableCell>

                            <Dropdown

                                searchInput={{ type: 'string' }}
                                placeholder='Alege SefComisie '
                                search selection   options={this.state.listaSefComisie}
                                    value={this.state.SefComisie&&this.state.SefComisie.value}
                                defaultValue={this.state.SefComisie&&this.state.SefComisie.value}
                                onChange={((e, data) => this.alegeSefComisie(data.value))}
                            />
                        </TableCell>
                        <TableCell>
                            {e.Semnatura_presedinte_comisie==null? <input type="file" onChange={this.onFileChange}/>: <object
                                style={{width: '100pt', height: '75pt'}}
                                data={'data:application/pdf;base64,' + e.Semnatura_presedinte_comisie}></object>
                            }
                        </TableCell>
                    </TableRow>
                    </tbody>
                    <Button className={"savebutton"}  onClick={() => {

                        this.save()
                    }}>Save</Button>
                </Table>
                        )})}
            </div>


        )}
}
export default RezultatSustinereLicenta;
