import React, {Component} from 'react'

import Style from './Style.css';
import {
    Dropdown,
    Input,
    Tab,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
    TabPane
} from "semantic-ui-react";
import {Table, Select, Button} from "semantic-ui-react";
import axios from "./axios-API"
import moment from "moment";
import {SingleDatePicker} from "react-dates";
class SetariDate extends Component {
    state={
        termen1:null,
        termen2:null,
        termen3:null,
        termen4:null,
        focused1:false,
        focused2:false,
        focused3:false,
        focused4:false,

    }



    componentDidMount() {
        axios
            .get('Optiune/GetTermene')
            .then(rez=>{
                if(rez.data[0].Termen1==null){
                    this.setState({termen1:moment()})
                }else{
                    this.setState({termen1:rez.data[0].Termen1})
                }
                if(rez.data[0].Termen2==null){
                    this.setState({termen2:moment()})
                }else{
                    this.setState({termen2:rez.data[0].Termen2})
                }
                if(rez.data[0].Termen3==null){
                    this.setState({termen3:moment()})
                }else{
                    this.setState({termen3:rez.data[0].Termen3})
                }
                if(rez.data[0].Termen4==null){
                    this.setState({termen4:moment()})
                }else{
                    this.setState({termen4:rez.data[0].Termen4})
                }
            })

    }
    saveTermene=()=>{
        console.log("Cei asta")
        console.log(this.state.termen1)
        console.log(this.state.termen3)
        axios
            .get('Optiune/GetTermene')
            .then(rez=>{
                if(rez.data[0].Termen1==null||rez.data[0].Termen2==null||rez.data[0].Termen3==null||rez.data[0].Termen4==null){
                    const request = {
                        termen1:this.state.termen1,
                        termen2:this.state.termen2,
                        termen3:this.state.termen3,
                        termen4:this.state.termen4

                    };
                    const post = JSON.stringify(request);
                    axios
                        .post('Optiune/PostTermene',request)
                        .then(re => {
                            console.log(re)
                            console.log("Termenele au fost adaugate")

                        })

                }else{
                    const request2 = {
                        termen1:this.state.termen1,
                        termen2:this.state.termen2,
                        termen3:this.state.termen3,
                        termen4:this.state.termen4

                    };
                    const post = JSON.stringify(request2);
                    axios
                        .post('Optiune/PutTermene',request2)
                        .then(re => {
                            console.log(re)
                            console.log("Termenele au fost updatate")

                        })

                }
            })


    }
    render() {
        return(
            <div className={'body'}>
                <h1>Pagina setare termene</h1>
                <Table>

                    <TableHeader>
                        <TableHeaderCell>Termene</TableHeaderCell>

                    <TableHeaderCell>Alege data</TableHeaderCell>
                    </TableHeader>

                    <tbody>
                    <TableRow>
                        <TableCell>De la aceasta data primul profesor poate sa aleaga studentii</TableCell>
                        <TableCell>
                            <SingleDatePicker

                                date={moment(this.state.termen1)}
                                onDateChange={termen1=>this.setState({termen1})}
                                displayFormat="DD/MM/YYYY"
                                placeholder="Data"
                                focused={this.state.focused1}
                                onFocusChange={({focused:focused1})=>this.setState({focused1})}
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                            />

                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>De la aceasta data al 2-lea profesor poate sa aleaga studentii</TableCell>
                        <TableCell>
                            <SingleDatePicker

                                date={moment(this.state.termen2)}
                                onDateChange={termen2=>this.setState({termen2})}
                                displayFormat="DD/MM/YYYY"
                                placeholder="Data"
                                focused={this.state.focused2}
                                onFocusChange={({focused:focused2})=>this.setState({focused2})}
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>De la aceasta data al 3-lea profesor poate sa aleaga studentii</TableCell>
                        <TableCell>
                            <SingleDatePicker

                                date={moment(this.state.termen3)}
                                onDateChange={termen3=>this.setState({termen3})}
                                displayFormat="DD/MM/YYYY"
                                placeholder="Data"
                                focused={this.state.focused3}
                                onFocusChange={({focused:focused3})=>this.setState({focused3})}
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Ultima data la care se mai pot alege studentii</TableCell>
                        <TableCell>
                            <SingleDatePicker

                                date={moment(this.state.termen4)}
                                onDateChange={termen4=>this.setState({termen4})}
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
                <Button className={"savebutton"} color='green' onClick={() => {this.saveTermene()}}>Save</Button>
            </div>
        )
    }

}
export default SetariDate;