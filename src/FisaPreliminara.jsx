import React, {Component} from 'react'
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
    TableCell, TableBody
} from "semantic-ui-react";
import Style from'./Style.css';
import axios from "./axios-API"
import App from "./App";

var today = new Date(),
    date =today.getDate()+ '-' + (today.getMonth() + 1)+ '-' + today.getFullYear();
class FisaPreliminara extends Component {
    constructor(props) {
        super(props)

    }

    state ={
        date: date,
        username:'octavian.dorvos@student.unitbv.ro',
       ID_facultate:null,
        ID_AnUniv:39,
        Fisa:[],
        problemePrincipale:null,
        locdurata:null,
        bibliografie:null,
        aspecteparticulare:null
    }
    componentDidMount() {

        axios
            .get('Optiune/GetStudentByUsernameAnUniv?StudentUsername=' +this.props.username + '&ID_AnUniv=' + this.props.ID_AnUniv)
            .then(re => {
                this.setState({
                    ID_facultate: re.data[0].ID_Facultate

                })

                axios
            .get('Optiune/GetFisaPreliminara?StudentUsername='+this.props.username+'&ID_Facultate='+this.state.ID_facultate+'&ID_An='+this.props.ID_AnUniv)
            .then(rez => {
                this.setState({
                    Fisa: rez.data

                })

            });

    })
}

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
        this.setState({aspecteparticulare:p})

    }

    update=(fisa)=>{
        console.log("Crapa?")
        if(this.state.problemePrincipale==null||this.state.locdurata==null||this.state.bibliografie==null){

            console.log("Nu ai comletat toate campurile")

        }else{
            axios
                .put('Optiune/PutFisaPreliminara?ID_fisa_preliminara='+fisa+'&probleme_principale='+this.state.problemePrincipale+'&loc_durata='+this.state.locdurata+'&bibliografie='+this.state.bibliografie)
                .then(re=> {
                    console.log("Updatarile au fost efectuate")



                })
        }}


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
                <h1>FIŞA PRELIMINARĂ A LUCRĂRII DE ABSOLVIRE/ LUCRĂRII DE LICENŢĂ/
                            PROIECTULUI DE DIPLOMĂ/ DISERTAŢIEI
                        </h1>
                <Table >
                    <tbody>
                    <TableRow>
                        <TableCell className={'fptrow'}>Tema lucrarii</TableCell>
                        <TableCell colSpan={3}>
                            <TextArea className={'TextArea'} defaultValue={e.Tema_lucrare}></TextArea>
                        </TableCell>
                        </TableRow>
                           <TableRow>
                        <TableCell> Problemele principale care vor fi tratate:</TableCell>
                               <TableCell colSpan={3}>
                                   <TextArea className={'TextArea'} defaultValue={e.Probleme_principale}
                                             onChange={((e, data) => this.changeProblemePrincipale(data.value))}
                                   ></TextArea>
                               </TableCell>
                           </TableRow>
                    <TableRow>
                        <TableCell>Locul si durata practicii:</TableCell>
                        <TableCell colSpan={3}>
                            <TextArea className={'TextArea'}
                                      defaultValue={e.Loc_durata}
                                      onChange={((e, data) => this.locdurata(data.value))}
                            ></TextArea>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Bibliografia recomandata:</TableCell>
                        <TableCell colSpan={3}>
                            <TextArea className={'TextArea'}
                                      defaultValue={e.Bibliografie}
                                      onChange={((e, data) => this.bibliografie(data.value))}
                            ></TextArea>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Aspecte particulare privind lucrarea:</TableCell>
                        <TableCell colSpan={3}>
                            <TextArea className={'TextArea'}
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
                        <TableCell><Input defaultValue={e.Termen1}/></TableCell>
                        <TableCell><Input defaultValue={e.Termen2}/></TableCell>
                        <TableCell><Input defaultValue={e.Termen3}/></TableCell>
                        <TableCell><Input defaultValue={e.Termen4}/></TableCell>
                    </TableRow>
                    </tbody>

            </Table>
                <div>Termenul de predare a lucrarii</div>
                <div>Data: {this.state.date}</div>

                                <Button className={"savebutton"} color='green' onClick={() => {this.update(e.ID_fisa_preliminara)}}>Update</Button>

                            </div>

                        )})}

            </div>
        )
    }
}
export default FisaPreliminara;