import React, {Component} from 'react'
import {Button, Dropdown, TextArea} from "semantic-ui-react";
import Style from './Style.css';
import axios from "./axios-API"
import Optiune from "./Optiune"

const optiune = {}

class DepuneCerere extends Component {


    state = {
        Student: [],
        listaProfesori: [],
        selectedOption: null,
        // titlulucrare1: null,
        // titlulucrare2: null,
        // titlulucrare3: null,
        // ID_profesor_ales1: null,
        // ID_profesor_ales2: null,
        // ID_profesor_ales3: null,
        ID_student: null,
        studusername: 'elena.dumitrascu@student.unitbv.ro',
        ID_AnUniv: 39,
        ID_facultate: null,
        listat: [],
        optiuni: [
            {
                Tema_lucrare: null,
                Nr_optiune: null,
                ID_profesor: null,
                ID_status_optiune: null,
                ID_student: null,
                ID_AnUnivInscriere: null
            },
            {
                Tema_lucrare: null,
                Nr_optiune: null,
                ID_profesor: null,
                ID_status_optiune: null,
                ID_student: null,
                ID_AnUnivInscriere: null
            },
            {
                Tema_lucrare: null,
                Nr_optiune: null,
                ID_profesor: null,
                ID_status_optiune: null,
                ID_student: null,
                ID_AnUnivInscriere: null
            }
        ],


    }


    savefunction = () => {
        let optiuniCopy = [...this.state.optiuni]

        axios
            .post('Optiune/Post?lista_optiuni',optiuniCopy)
            .then(re => {

                console.log('Optiunile  au fost adaugate');
            })

    }


    componentDidMount() {
        axios
            .get('Optiune/GetStudentByUsernameAnUniv?StudentUsername=' + this.state.studusername + '&ID_AnUniv=' + this.state.ID_AnUniv)
            .then(re => {
                this.setState({
                    Student: re.data

                })
                this.setState({
                    ID_facultate: re.data[0].ID_Facultate

                })
                this.setState({
                    ID_student: re.data[0].ID_Student

                })


                axios
                    .get('Optiune/GetProfesoriList?ID_AnUniv=' + this.state.ID_AnUniv + '&ID_facultate=' + this.state.ID_facultate)

                    .then(r => {
                        let listaProfesori = [];
                        for (let Profesor of r.data) {
                            listaProfesori.push({
                                key: Profesor.ID_Profesor,
                                value: Profesor.ID_Profesor,
                                text: Profesor.NumeIntreg


                            })
                        }
                        this.setState({listaProfesori: listaProfesori})
                    });
            })


    }

    /**
     *
     * @param index Nr_optiune
     * @param key   Tema/Profesor
     * @param value
     */
    actualizareOptiuniState=(index,key,value)=>{

        let optiuniCopy=[...this.state.optiuni]
        optiuniCopy[index][key]=value;
        this.setState({optiuni:optiuniCopy})
    }

    render() {
    //todo: Mutumesc

        return (
            <div className={"body"}>
                <div>UNIVERSITATEA TRANSILVANIA DIN BRASOV</div>
                {this.state.Student.map((e, index) => {
                    return (
                        <div key={e.ID_Student}>
                            <div>FACULTATEA {e.DenumireFacultate} </div>

                            <div>ABSOLVIRE/LICENTA, anul</div>
                            <div>SESIUNEA:</div>
                            <h1>CERERE DE ALEGERE A TEMEI DE LICENTA SI A CADRULUI DIDACTIC INDRUMATOR</h1>

                            <div className={"cr-text"}>Subsemnatul(a) {e.Nume} {e.Prenume} student(a)/absolvent(a) al(a)
                                programului de studii {e.DenumireSpecializare}, grupa {e.DenumireGrupa} forma de
                                invatamant {e.DenumireFormaInv}, doresc sa realizez LUCRAREA DE LICENTA cu
                            </div>

                            {this.state.optiuni.map((item, index) => {
                                return (
                                    <Optiune ID_AnUniv={this.state.ID_AnUniv}
                                             listaProfesori={this.state.listaProfesori}
                                             ID_student={this.state.ID_student}
                                             optiuneCopy={item}
                                             index={index}
                                             actualizareOptiuniState={this.actualizareOptiuniState.bind(this)}
                                             key={index}


                                    />
                                )
                            })}


                            <div>
                                <Button className={"savebutton"} color='green' onClick={() => {

                                    this.savefunction()
                                }}>Salveaza</Button>
                            </div>

                        </div>
                    )

                })}


            </div>


        )
    }
}

export default DepuneCerere;