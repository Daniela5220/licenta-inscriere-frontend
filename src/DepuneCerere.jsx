import React, {Component} from 'react'
import {
    Button,
    Dimmer,
    Dropdown,
    Header,
    Icon,
    Image,
    Input,
    Loader,
    Modal,
    Segment,
    TextArea
} from "semantic-ui-react";
import Style from './Style.css';
import axios from "./axios-API"
import Optiune from "./Optiune"

const optiune = {}

class DepuneCerere extends Component {


    state = {
        Student: [],
        Sesiune: [],

        sesiuneAleasa: null,
        listaProfesori: [],
        selectedOption: null,
        semnaturaStudentFile: null,
        ID_student: null,
        AnUniv: [],
        ID_AnUnivInscriere: null,
        ID_facultate: null,
        listat: [],
        modal: false,
        modalEroare: false,
        modalSesiune: false,
        modalPermiteInscriere: false,
        disableDropdown: false,
        permiteInscriere: false,
        loading:true,

        optiuni: [
            {
                Tema_lucrare: null,
                Nr_optiune: null,
                ID_profesor: null,
                ID_status_optiune: null,
                ID_student: null,
                ID_AnUnivInscriere: null,
                ID_CerereInscriere: null
            },
            {
                Tema_lucrare: null,
                Nr_optiune: null,
                ID_profesor: null,
                ID_status_optiune: null,
                ID_student: null,
                ID_AnUnivInscriere: null,
                ID_CerereInscriere: null
            },
            {
                Tema_lucrare: null,
                Nr_optiune: null,
                ID_profesor: null,
                ID_status_optiune: null,
                ID_student: null,
                ID_AnUnivInscriere: null,
                ID_CerereInscriere: null
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
                        <object data={this.state.file} type="application/pdf" width="24%" height="40%"/>
                    </p>
                </div>
            );
        }
    };
    changeAnInscriere = (An) => {
        this.setState({ID_AnUnivInscriere: An})
    }


    savefunction = () => {

        if (this.state.permiteInscriere.data == false) {
            this.setState({modalPermiteInscriere: true})
            console.log("Vedem daca ajunge aici")
        } else {


            // Adaugam in baza de date o cerere
            try {
                const formData = new FormData();
                formData.append(
                    "myFile",
                    this.state.semnaturaStudentFile,
                    this.state.semnaturaStudentFile.name
                );
                console.log(this.state.semnaturaStudentFile);
                console.log(formData)
                //Adaugam optiuni
                console.log(this.state.sesiuneAleasa)
                if(this.state.sesiuneAleasa!=null){}
                axios
                    .post('Optiune/PostCerere?Sesiune=' + this.state.sesiuneAleasa + '&ID_AnUnivCerereInscriere=' + this.state.ID_AnUnivInscriere, formData)
                    .then(rez => {
                        console.log('Cererea a fost creeata , sa vedem daca merge')

                        let optiuniCopy = []
                        for (let elem of this.state.optiuni) {
                            if (elem.ID_profesor != null && elem.Tema_lucrare != null) {
                                optiuniCopy.push({
                                    Tema_lucrare: elem.Tema_lucrare,
                                    Nr_optiune: elem.Nr_optiune,
                                    ID_profesor: elem.ID_profesor,
                                    ID_status_optiune: elem.ID_status_optiune,
                                    ID_student: elem.ID_student,
                                    ID_AnUnivInscriere: elem.ID_AnUnivInscriere,
                                    ID_CerereInscriere: elem.ID_CerereInscriere
                                })
                            }

                            console.log(optiuniCopy)
                        }
                        axios
                            .post('Optiune/Post?lista_optiuni', optiuniCopy)
                            .then(re => {

                                console.log('Optiunile  au fost adaugate');
                                // eslint-disable-next-line no-undef
                                this.setState({modal: true});
                            })
                    })
            } catch (Exception) {
                console.log("Nu ai completat toate câmpurile")
                this.setState({modalEroare: true});
            }
        }
    }

    alegeSesiune = (sesiune) => {
        this.setState({modalSesiune: true})
        this.setState({sesiune: sesiune})
    }

    salveazaSesiune = (sesiune) => {
        this.setState({sesiuneAleasa: sesiune})
        this.setState({disableDropdown: true})
        this.setState({modalSesiune: false})
    }

    componentDidMount() {
        axios
            .get('Optiune/GetCerereInscriereValidare')
            .then(r => {
                this.setState({permiteInscriere: r})

                if (this.state.permiteInscriere.data == false) {
                    axios
                        .get('Optiune/GetCerereInscriere')
                        .then(rez => {
                            this.setState({
                                sesiuneAleasa: rez.data.Sesiune

                            })
                            this.setState({
                                ID_AnUnivCerereInscriere: rez.data.ID_AnUnivCerereInscriere

                            })
                            this.setState({
                                semnaturaStudentFile: rez.data.Student_img_sem

                            })

                            axios
                                .get('Optiune/GetOptiuniStudent')
                                .then(rez=>{
                                    this.setState({
                                        optiuni: rez.data

                                    })

                                }

                                )


                        })

                }
            })
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
                this.setState({ID_AnUnivInscriere: r.data[0].ID_AnUniv})

                axios
                    .get('Optiune/GetStudentByUsernameAnUniv')
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
                        this.setState({
                            ID_Specializare: re.data[0].ID_Specializare

                        })

                        axios
                            .get('Optiune/GetSesiuneActiva?ID_AnUniv=' + this.state.ID_AnUnivInscriere + '&ID_specializare=' + this.state.ID_Specializare)
                            .then(r => {
                                let Sesiune = [];

                                for (let sesiune of r.data) {
                                    Sesiune.push({
                                        key: sesiune.DenumireSesiuneAbsolvire,
                                        value: sesiune.DenumireSesiuneAbsolvire,
                                        text: sesiune.DenumireSesiuneAbsolvire


                                    })
                                }

                                this.setState({Sesiune: Sesiune})
                            });


                        axios
                            .get('Optiune/GetProfesoriList?ID_facultate=' + this.state.ID_facultate)

                            .then(r => {
                                let listaProfesori = [];
                                for (let Profesor of r.data) {
                                    listaProfesori.push({
                                        key: Profesor.ID_Profesor,
                                        value: Profesor.ID_Profesor,
                                        text: Profesor.NumeIntreg + "-" + Profesor.DenumireFacultate,


                                    })
                                }
                                this.setState({listaProfesori: listaProfesori})
                                this.setState({loading:false})
                            });
                    })


            });


    }

    /**
     *
     * @param index Nr_optiune
     * @param key   Tema/Profesor
     * @param value
     */
    actualizareOptiuniState = (index, key, value) => {

        let optiuniCopy = [...this.state.optiuni]
        optiuniCopy[index][key] = value;
        this.setState({optiuni: optiuniCopy})
    }

    render() {
        //todo: Mutumesc

        return (
            <div className={"body"}>
                {this.state.loading == true ? <Segment>
                        <Dimmer active inverted>
                            <Loader/>
                        </Dimmer>

                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png'/>
                    </Segment> :
                    <div>
                        <div>UNIVERSITATEA TRANSILVANIA DIN BRASOV</div>
                        {this.state.Student.map((e, index) => {
                            return (
                                <div key={e.ID_Student}>
                                    <div>FACULTATEA {e.DenumireFacultate} </div>

                                    <div>ABSOLVIRE/LICENTA, anul
                                        <Dropdown

                                            searchInput={{type: 'string'}}
                                            placeholder='Alege an licenta'
                                            search selection options={this.state.AnUniv}
                                            defaultValue={this.state.AnUniv[0].value}

                                            onChange={((e, data) => this.changeAnInscriere(data.value))}
                                        />

                                    </div>
                                    <div>SESIUNEA:



                                        <Modal
                                            // onClose={() => setOpen(false)}
                                            //onOpen={() => setOpen(true)}
                                            open={this.state.modalSesiune}
                                            trigger={

                                                <Dropdown

                                                searchInput={{type: 'string'}}
                                                placeholder='Alege sesiune '
                                                search selection options={this.state.Sesiune}

                                                value={this.state.sesiuneAleasa}
                                                onChange={((e, data) => this.alegeSesiune(data.value))}
                                                disabled={this.state.disableDropdown}

                                            />
                                            }
                                        >
                                            <Modal.Header>Ai ales sesiunea {this.state.sesiune}</Modal.Header>
                                            <Modal.Content image>

                                                <Modal.Description>
                                                    <Header>Alegerea este definitivă și nu se mai poate modifica.Ești
                                                        sigur că
                                                        ai ales sesiunea potrivită?</Header>
                                                </Modal.Description>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button color='red'
                                                        onClick={() => this.setState({modalSesiune: false})}>
                                                    Nu
                                                </Button>
                                                <Button
                                                    content="Da,salvează"
                                                    labelPosition='right'
                                                    icon='checkmark'
                                                    onClick={(() => this.salveazaSesiune(this.state.sesiune))}
                                                    positive
                                                />
                                            </Modal.Actions>
                                        </Modal>
                                    </div>


                                    <h1>CERERE DE ALEGERE A TEMEI DE LICENTA SI A CADRULUI DIDACTIC INDRUMATOR</h1>
                                    <div
                                        className={"cr-text"}>Subsemnatul(a) {e.Nume} {e.Prenume} student(a)/absolvent(a)
                                        al(a)
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
                                    {this.state.semnaturaStudentFile == null ?
                                        <div><input type="file" onChange={this.onFileChange}/> {this.fileData()}
                                        </div> : <object
                                            style={{width: '80pt', height: '60pt'}}
                                            data={'data:application/pdf;base64,' + this.state.semnaturaStudentFile}></object>
                                    }
                                   <div  style={{width: '75%', height: '23%'}}>
                                    {this.fileData()}
                                   </div>
                                    <div>
                                        <Button className={"savebutton"} color='green' onClick={() => {

                                            this.savefunction()
                                        }}>Salveaza</Button>
                                    </div>

                                    <Modal
                                        closeIcon
                                        onClose={() => this.setState({modal: false})}
                                        size={'small'}
                                        open={this.state.modal}

                                    >
                                        <Modal.Content>
                                            <p>Cererea a fost inregistrata cu succes!</p>
                                        </Modal.Content>

                                    </Modal>
                                    <Modal
                                        closeIcon
                                        onClose={() => this.setState({modalEroare: false})}
                                        size={'small'}
                                        open={this.state.modalEroare}

                                    >
                                        <Modal.Content>
                                            <p>Nu ai completat toate câmpurile!</p>
                                        </Modal.Content>

                                    </Modal>
                                    <Modal
                                        closeIcon
                                        onClose={() => this.setState({modalPermiteInscriere: false})}
                                        size={'small'}
                                        open={this.state.modalPermiteInscriere}

                                    >
                                        <Modal.Content>
                                            <p>Ai depus deja o cerere! Nu este permisă depunerea mai multor cereri!</p>
                                        </Modal.Content>

                                    </Modal>


                                </div>
                            )

                        })}
                    </div>
                }
            </div>


        )
    }
}

export default DepuneCerere;