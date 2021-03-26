import React, {Component} from 'react'
import {Button, Dropdown,  TextArea} from "semantic-ui-react";
import Style from'./Style.css';
import axios from "./axios-API"

class DepuneCerere extends Component {


    state = {
        Student: [],
        listaProfesori: [],
        selectedOption: null,
        titlulucrare1: null,
        titlulucrare2: null,
        titlulucrare3: null,
        ID_profesor_ales1: null,
        ID_profesor_ales2: null,
        ID_profesor_ales3: null,
        ID_student: null,
        studusername: 'elena.dumitrascu@student.unitbv.ro',
        ID_AnUniv: 39,
        ID_facultate: null,
        listat: [],
        optiuni: {
            optiune1: {
              /*  Tema_lucrare:null,
                Nr_optiune: null,
                ID_profesor: null,
                ID_status_optiune: null,
                ID_student: null,
                ID_AnUnivInscriere: null*/
            },
            optiune2: {
               /* Tema_lucrare: null,
                Nr_optiune: null,
                ID_profesor: null,
                ID_status_optiune: null,
                ID_student: null,
                ID_AnUnivInscriere: null*/
            },
            optiune3: {
             /* Tema_lucrare: null,
                Nr_optiune: null,
                ID_profesor: null,
                ID_status_optiune: null,
                ID_student: null,
                ID_AnUnivInscriere: null */
            },
        }


    }

    alegeProfesor = (selectedOption,id) => {
        let optiuniCopy = {... this.state.optiuni}

        if(id==1){
          /*  this.setState({
                ID_profesor_ales1:selectedOption
            })*/
            optiuniCopy.optiune1.ID_profesor =selectedOption

            console.log(this.state.optiuni)

        }
        else{
            if(id==2){
               /* this.setState({
                    ID_profesor_ales2:selectedOption
                })*/
                optiuniCopy.optiune2.ID_profesor =selectedOption

                console.log(this.state.optiuni)
            }
            else{
                if(id==3){
                   /* this.setState({
                        ID_profesor_ales3:selectedOption
                    })*/
                }

                optiuniCopy.optiune3.ID_profesor =selectedOption

                console.log(this.state.optiuni)}
        }



    }

    alegetema = (prop,id) => {
        let optiuniCopy = {... this.state.optiuni}

        if(id==1){
       /* this.setState({
            titlulucrare1:prop
        })*/
            optiuniCopy.optiune1.Tema_lucrare =prop

        }
        else{
            if(id==2){
               /* this.setState({
                    titlulucrare2:prop
                })*/
                optiuniCopy.optiune2.Tema_lucrare =prop
                }
             else{
                if(id==3){
                   /* this.setState({
                        titlulucrare3:prop
                    })*/
                }
                optiuniCopy.optiune3.Tema_lucrare =prop
               }
        }
    };

    savefunction = () => {
       /* this.state.listat.push({
            Tema_lucrare: this.state.titlulucrare1,
            Nr_optiune: 1,
            ID_profesor: this.state.ID_profesor_ales1,
            ID_status_optiune: 3,
            ID_student: this.state.ID_student,
            ID_AnUnivInscriere: this.state.ID_AnUniv
        })
        this.state.listat.push({
            Tema_lucrare: this.state.titlulucrare2,
            Nr_optiune: 2,
            ID_profesor: this.state.ID_profesor_ales2,
            ID_status_optiune: 3,
            ID_student: this.state.ID_student,
            ID_AnUnivInscriere: this.state.ID_AnUniv
        })
        this.state.listat.push({

            Tema_lucrare: this.state.titlulucrare3,
            Nr_optiune: 3,
            ID_profesor: this.state.ID_profesor_ales3,
            ID_status_optiune: 3,
            ID_student: this.state.ID_student,
            ID_AnUnivInscriere: this.state.ID_AnUniv
        })*/
        console.log(this.state.listat)
        let optiuniCopy = {... this.state.optiuni}
        optiuniCopy.optiune1.Nr_optiune=1
        optiuniCopy.optiune1.ID_status_optiune=3
        optiuniCopy.optiune1.ID_student=this.state.ID_student
        optiuniCopy.optiune1.ID_AnUnivInscriere=this.state.ID_AnUniv

        optiuniCopy.optiune2.Nr_optiune=2
        optiuniCopy.optiune2.ID_status_optiune=3
        optiuniCopy.optiune2.ID_student=this.state.ID_student
        optiuniCopy.optiune2.ID_AnUnivInscriere=this.state.ID_AnUniv

        optiuniCopy.optiune3.Nr_optiune=3
        optiuniCopy.optiune3.ID_status_optiune=3
        optiuniCopy.optiune3.ID_student=this.state.ID_student
        optiuniCopy.optiune3.ID_AnUnivInscriere=this.state.ID_AnUniv
        this.setState({
            optiuni: optiuniCopy
        })




        axios
            .post('Optiune/Post?lista_optiuni',this.state.optiuni)
            .then(re => {

                console.log('Optiunile  au fost adaugate');
            })

    }







    componentDidMount() {
        axios
            .get('Optiune/GetStudentByUsernameAnUniv?StudentUsername='+this.state.studusername+'&ID_AnUniv='+this.state.ID_AnUniv)
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

    render() {

        return (
           <div className={"body"}>
                <div>UNIVERSITATEA TRANSILVANIA DIN BRASOV</div>
               {this.state.Student.map((e, index) => {
               return(
                   <div key={e.ID_Student}>
                   <div>FACULTATEA {e.DenumireFacultate} </div>

                   <div>ABSOLVIRE/LICENTA, anul</div>
                   <h1>CERERE DE ALEGERE A TEMEI DE LICENTA SI A CADRULUI DIDACTIC INDRUMATOR</h1>

                   <div className={"cr-text"} >Subsemnatul(a) {e.Nume} {e.Prenume}  student(a)/absolvent(a) al(a) programului de studii {e.DenumireSpecializare}, grupa {e.DenumireGrupa} forma de invatamant {e.DenumireFormaInv}, doresc sa realizez LUCRAREA DE LICENTA cu</div>
                       <div>Tema 1</div>
                       <TextArea  className={"teme-textArea"} onChange={((e, data) => this.alegetema(data.value,1))} />

                       <div>Cadrul didactic indrumator</div>
                       <Dropdown
                           search
                           searchInput={{ type: 'string' }}
                           placeholder='Alege profesor coordonator'

                           search selection   options={this.state.listaProfesori}
                         onChange={((e, data) => this.alegeProfesor(data.value,1))}/>


                       <div>Tema 2</div>
                       <TextArea className={"teme-textArea"} onChange={((e, data) => this.alegetema(data.value,2))} />

                       <div>Cadrul didactic indrumator</div>
                       <Dropdown
                           search
                           searchInput={{ type: 'string' }}
                           placeholder='Alege profesor coordonator'

                           search selection   options={this.state.listaProfesori}
                           onChange={((e, data) => this.alegeProfesor(data.value,2))}/>


                       <div>Tema 3</div>
                       <TextArea className={"teme-textArea"}  onChange={((e, data) => this.alegetema(data.value,3))} />

                       <div>Cadrul didactic indrumator</div>
                       <Dropdown
                           search
                           searchInput={{ type: 'string' }}
                           placeholder='Alege profesor coordonator'

                           search selection   options={this.state.listaProfesori}
                           onChange={((e, data) => this.alegeProfesor(data.value,3))}/>



                   <div>
                       <Button className={"savebutton"} color='green' onClick={() => {

                           this.savefunction()
                       }} >Salveaza</Button>
                   </div>

                   </div>
               )

               })}


              </div>



                   )}
}

export   default DepuneCerere;