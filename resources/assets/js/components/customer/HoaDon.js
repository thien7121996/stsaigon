
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import InHoaDon from "./InHoaDon";

class HoaDon extends Component {
    constructor (props) {
    super(props)
    this.state = {
            khachhang: [],
            chiphieu: [],
            thanhtoan: [],
            tongphaitra: '',
            tongdatra: '',
            tongconlai: '',
            idkhachhang: this.props.match.params.id,
            idkhammoi: this.props.match.params.idkm,
            idthanhtoan : this.props.match.params.idtt,
         
    }
}
    componentDidMount(){
        axios.get('/index.php/api/chitietkhachhang/'+this.state.idkhachhang).then(response => {
    
            this.setState({
              khachhang: response.data
            })
          
        })
        axios.get('/index.php/api/chitietthanhtoan/'+this.state.idthanhtoan)
     .then(response => {
   
      
        this.setState({
            thanhtoan: response.data
          })
      
     })
     axios.get('/index.php/api/thanhtoanthongke/'+this.state.idkhammoi).then(response => {
    
        var tcl=Number(response.data[0]["phaithanhtoan"])-Number(response.data[1]["dathanhtoan"])
        console.log(tcl)
            this.setState({
              tongphaitra: response.data[0]["phaithanhtoan"],
              tongdatra: response.data[1]["dathanhtoan"],
              tongconlai:tcl
            })
            
           
          
          })
       
   
    
    }


  render() {
   const { khachhang,thanhtoan,idkhammoi,idkhachhang,idthanhtoan,tongphaitra,tongdatra,tongconlai } = this.state
 
    return (
    <InHoaDon idkhachhang={idkhachhang} chitietthanhtoan={thanhtoan} tongphaitra={tongphaitra} tongdatra={tongdatra} tongconlai={tongconlai} idthanhtoan={idthanhtoan} idkhammoi={idkhammoi} khachhang={khachhang} />
  
    );
  }
}

export default HoaDon;