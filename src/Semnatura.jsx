import axios from "./axios-API";
import React,{Component} from 'react';
// import Document from 'react-pdf';


class Semnatura extends Component {
    constructor(props) {
        super(props)

    }
    state = {

        // Initially, no file is selected
        selectedFile: null,
        fill: null,
        fisa: 16
    };

    // On file select (from the pop up)
    onFileChange = event => {
        // Update the state
        this.setState({selectedFile: event.target.files[0]});
        console.log(event.target.files[0])
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    };

    // On file upload (click the upload button)
    onFileUpload = () => {
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
        axios
            .post('Optiune/PutSemnaturaStudent?ID_fisa_preliminara='+this.props.ID_fisa_preliminara,formData)
            .then(re => {
                console.log(re)

            })
        // axios.post("api/uploadfile", formData);
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {
        if (this.state.selectedFile) {

            return (
                <div>


                    <p>
                        {/*Last Modified:{" "}*/}
                        {/*{this.state.selectedFile.lastModifiedDate.toDateString()}*/}
                        <object data={this.state.file} type="application/pdf" width="50%" height="50%"/>
                    </p>
                </div>
            );
        }
    };
    afisare=()=>{
        return(
<div> O semnatura a fost deja incarcata</div>
)
}
    render() {
        return (
            <div>
                <div>
                    {this.afisare()}
                    <input type="file" onChange={this.onFileChange}/>
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>
                {this.fileData()}
            </div>
        );
    }


}
export default Semnatura;