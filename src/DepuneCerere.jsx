import React, {Component} from 'react'
import {Button, Dropdown, TextArea} from "semantic-ui-react";
import Style from './Style.css';
import axios from "./axios-API"
import Optiune from "./Optiune"

const optiune = {}

class DepuneCerere extends Component {


    state = {
        Student: [],
        Sesiune:[],
        sesiuneAleasa:null,
        listaProfesori: [],
        selectedOption: null,
       semnaturaStudentFile:null,
        ID_student: null,

        AnUniv:[],
        ID_AnUnivInscriere:null,
        ID_facultate: null,
        listat: [],
        optiuni: [
            {
                Tema_lucrare: null,
                Nr_optiune: null,
                ID_profesor: null,
                ID_status_optiune: null,
                ID_student: null,
                ID_AnUnivInscriere: null,
                ID_CerereInscriere:null
            },
            {
                Tema_lucrare: null,
                Nr_optiune: null,
                ID_profesor: null,
                ID_status_optiune: null,
                ID_student: null,
                ID_AnUnivInscriere: null,
                ID_CerereInscriere:null
            },
            {
                Tema_lucrare: null,
                Nr_optiune: null,
                ID_profesor: null,
                ID_status_optiune: null,
                ID_student: null,
                ID_AnUnivInscriere: null,
                ID_CerereInscriere:null
            }
        ],


    }
    onFileChange = event => {
        // Update the state
        this.setState({semnaturaStudentFile: event.target.files[0]});
        console.log(event.target.files[0])
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })

    };
    fileData = () => {
        if (this.state.semnaturaStudentFile) {
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
        changeAnInscriere=(An)=>{
            this.setState({ID_AnUnivInscriere:An})
        }
    savefunction = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.semnaturaStudentFile,
            this.state.semnaturaStudentFile.name
        );

        // Details of the uploaded file
        console.log(this.state.semnaturaStudentFile);

        // Request made to the backend api
        // Send formData object
        console.log(formData)

        //Adaugam in baza de date o cerere
        axios
            .post('Optiune/PostCerere?Sesiune='+this.state.sesiuneAleasa+'&ID_AnUnivCerereInscriere='+this.state.ID_AnUnivInscriere,formData)
            .then(rez=>{
                console.log('Cererea a fost creeata , sa vedem daca merge')
            })
        //Adaugam optiuni
        let optiuniCopy = [...this.state.optiuni]

        axios
            .post('Optiune/Post?lista_optiuni',optiuniCopy)
            .then(re => {

                console.log('Optiunile  au fost adaugate');
            })

    }

   alegeSesiune=(sesiune)=>{
        this.setState({sesiuneAleasa:sesiune})
   }

    componentDidMount() {
        axios
            .get('Optiune/AnUnivLista')

            .then(r => {
                let AnUniv = [];
                for (let an of r.data) {
                    AnUniv.push({
                        key: an.ID_AnUniv,
                        value: an.ID_AnUniv,
                        text: an.Denumire


                    })
                }
                this.setState({AnUniv: AnUniv})
                this.setState({ID_AnUnivInscriere:r.data[0].ID_AnUniv})

        axios
            .get('Optiune/GetStudentByUsernameAnUniv?ID_AnUniv=' + this.state.ID_AnUnivInscriere)
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
                    .get('Optiune/GetProfesoriList?ID_AnUniv=' + this.state.ID_AnUnivInscriere + '&ID_facultate=' + this.state.ID_facultate)

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



        axios
            .get('Optiune/SesiuneList')

            .then(r => {
                let Sesiune = [];
                for (let sesiune of r.data) {
                    Sesiune.push({
                        key: sesiune,
                        value: sesiune,
                        text: sesiune


                    })
                }
                this.setState({Sesiune: Sesiune})
            });

            });


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

                            <div>ABSOLVIRE/LICENTA, anul
                                <Dropdown

                                    searchInput={{ type: 'string' }}
                                    placeholder='Alege an licenta'
                                    search selection   options={this.state.AnUniv}
                                    defaultValue={this.state.AnUniv[0].value}

                                    onChange={((e, data) => this.changeAnInscriere(data.value))}
                                />

                            </div>
                            <div>SESIUNEA:
                                <Dropdown

                                    searchInput={{ type: 'string' }}
                                    placeholder='Alege sesiune '
                                    search selection   options={this.state.Sesiune}

                                    onChange={((e, data) => this.alegeSesiune(data.value))}
                                /></div>


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
                                Semnatura student
                            </div>
                            <div>{e.Nume} {e.Prenume}</div>
                            <input type="file" onChange={this.onFileChange}/>
                            {this.fileData()}
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