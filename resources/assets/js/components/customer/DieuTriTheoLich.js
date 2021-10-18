
import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import Select from "react-select";
import moment from "moment";
import KhachHangInfo from './KhachHangInfo';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
const ngayhientai=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
class DieuTriTheoLich extends Component {
    constructor (props) {
    super(props)
    this.state = {
        khammoi: [],
        nguonlist: [],
        benhlylist: [],
        dichvulist: [],
        doctorlist: [],
        dieutritheolich: [],
        dieutridichvulist: [],
        start: '',
        idkhachhang:this.props.match.params.idkh,
        idkhammoi:this.props.match.params.idkm,
        ngay: new Date(),
        idlich: '1',
        dieutri: '',
        giohen:'',
        luuy: 'Không có ghi chú',
        bacsi: '4',
        trangthai: '',
        iddieutriupdate: '',
        benhly:'',
        dichvu: ''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateDieuTri  = this.handleCreateDieuTri.bind(this)
    this.handleDeleteDieuTri  = this.handleDeleteDieuTri.bind(this)
    this.handleChiTietDieuTri  = this.handleChiTietDieuTri.bind(this)
    this.handleUpdateDieuTri = this.handleUpdateDieuTri.bind(this)
    this.handleDateSelect = this.handleDateSelect.bind(this)
    this.formatTime = this.formatTime.bind(this)
   
  }
  componentWillMount(){
    const scripts = [
      '/public/app_assets/js/datatable/custom.js',
      '/public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw.js',
      '/public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw-init.js',
      '/public/app_assets/js/jasny-bootstrap.js',
      '/public/app_assets/js/mask.js',
      '/public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      '/public/app_assets/plugins/bower_components/clockpicker/dist/jquery-clockpicker.min.js',
      '/public/app_assets/plugins/bower_components/timepicker/bootstrap-timepicker.min.js',
      '/public/app_assets/js/custome-app.js',
      '/public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      '/public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      '/public/app_assets/js/datatable/custom.js'
  ];
  const scripttag = document.getElementById("tagscripts");
  scripttag.innerHTML = '';
  scripts.forEach(s => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = s;
    script.async = true
    scripttag.appendChild(script);
  })

  }
componentDidMount(){
  const scripts = [
    '/public/app_assets/js/datatable/custom.js',
    '/public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw.js',
    '/public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw-init.js',
    '/public/app_assets/js/jasny-bootstrap.js',
    '/public/app_assets/js/mask.js',
    '/public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
    '/public/app_assets/plugins/bower_components/clockpicker/dist/jquery-clockpicker.min.js',
    '/public/app_assets/plugins/bower_components/timepicker/bootstrap-timepicker.min.js',
    '/public/app_assets/js/custome-app.js',
    '/public/app_assets/plugins/bower_components/icheck/icheck.min.js',
    '/public/app_assets/plugins/bower_components/icheck/icheck.init.js',
    '/public/app_assets/js/datatable/custom.js'
];
const scripttag = document.getElementById("tagscripts");
scripttag.innerHTML = '';
scripts.forEach(s => {
  const script = document.createElement("script");
  script.type = 'text/javascript';
  script.src = s;
  script.async = true
  scripttag.appendChild(script);
})
    axios.get('/index.php/api/khammoi/'+this.state.idkhachhang).then(response => {
        this.setState({
          khammoi: response.data
        })
      })
      axios.get('/index.php/api/chitietkhammoi/'+this.state.idkhammoi).then(response => {
      
        this.setState({
          benhly: response.data.benhly,
          dichvu: response.data.dichvu
        })
      })
      axios.get('/index.php/api/dieutritheolich/'+this.state.idkhammoi).then(response => {
        this.setState({
          dieutritheolich: response.data
        })
      })
      axios.get('/index.php/api/dichvu').then(response => {
        this.setState({
          dichvulist: response.data
        })
      }) 
      axios.get('/index.php/api/doctor').then(response => {
        this.setState({
          doctorlist: response.data
        })
      })
      axios.get('/index.php/api/dichvusanpham').then(response => {
        this.setState({
          dieutridichvulist: response.data
        })
      })
     
}
handleFieldChange (event) {
   

  var checkedArr = [];
  var value;
   if(event.target.type == 'checkbox')
   {
     
       const checkeds = document.getElementsByTagName('input');
       for (var i = 0; i < checkeds.length; i++) {
         if (checkeds[i].checked) {
           checkedArr.push(checkeds[i].value);
         }
       }
       value = checkedArr;
     this.setState({ [event.target.name]: value });
   }
   else if(event.target.type == 'file')
   {
   
     this.setState({
       [event.target.name]:event.target.files[0]
     })
   }
   else
   {
    
     console.log(event.target.value)
     this.setState({
       [event.target.name]: event.target.value
     })
     
   }
  
 }
 
 handleCreateDieuTri(event) {
   event.preventDefault()
console.log(this.state.ngay)
   const { history } = this.props

 
     const lichlamviec = {
      idkhachhang : this.state.idkhachhang,
      dichvu : this.state.dichvu,
      trangthai: this.state.trangthai,
      ghichu : this.state.luuy,
      giohen: document.getElementById("giohen").value,
      loai: "1",
      dieutri: this.state.dieutri,
      benhly: this.state.benhly,
      idkhammoi: this.state.idkhammoi,
      start : this.state.ngay,
      end :  this.state.ngay,
      idbacsi : this.state.bacsi

   }
   if(this.state.trangthai=='')
   {
      alert("Chưa chọn trạng thái");
   }
   else
   {
    console.log(lichlamviec)
    axios.post('/index.php/api/lichlamviec', lichlamviec)
    .then(response => {
     var date_ob = new Date();
     var date = ("0" + date_ob.getDate()).slice(-2);
     var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
     var year = date_ob.getFullYear();
     var hours = date_ob.getHours();
     var minutes = date_ob.getMinutes();
     var seconds = date_ob.getSeconds();
     var ngayhientai=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
     const dieutri = {
       ngay: ngayhientai,
       idlich: response.data,
       dieutri: this.state.dieutri,
       bacsi: this.state.bacsi,
       luuy: this.state.luuy,
       trangthai: this.state.trangthai,
       idkhachhang: this.state.idkhachhang,
       idkhammoi: this.state.idkhammoi
      }
      console.log(dieutri);
      axios.post('/index.php/api/dieutritheolich', dieutri)
        .then(response => {
          // redirect to the homepage
          axios.get('/index.php/api/dieutritheolich/'+this.state.idkhammoi).then(response => {
              this.setState({
               dieutritheolich: response.data
              })
            })
          var button = document.getElementById('btn-endss')
          button.click()
          
        })
        .catch(error => {
         alert("Điền đầy đủ thông tin")
        })
    })
   }
  
  
  
 }
 handleDeleteDieuTri(event)
 {
     event.preventDefault()
     let iddieutri=event.target.attributes.getNamedItem('data-iddieutri').value

     axios.get('/index.php/api/dieutritheolichdelete/'+iddieutri)
     .then(response => {
       // redirect to the homepage
       axios.get('/index.php/api/dieutritheolich/'+this.state.idkhammoi).then(response => {
           this.setState({
                dieutritheolich: response.data
           })
         })
         var button = document.getElementById('btndongdulieu')
       
          button.click()
     })
     .catch(error => {
       this.setState({
       
         
       })
       
     })
 }
 handleChiTietDieuTri(event)
 {
   event.preventDefault()
   let idpc=event.target.attributes.getNamedItem('data-iddieutri').value
   axios.get('/index.php/api/chitietdieutritheolich/'+idpc)
     .then(response => {
       console.log(response.data)
      
       document.getElementById('updatengay').value=response.data["ngay"]
       document.getElementById('updategiohen').value=response.data["giohen"]
       document.getElementById('updatetrangthai').value=response.data["trangthai"]
       var selectbl=document.getElementById("updatetrangthai").childNodes;
       for(var i = 0; i < selectbl.length; i++) {
         var datadv=selectbl[i].value;
         if(datadv==response.data["trangthai"])
         {
            selectbl[i].setAttribute('selected', true);
         }
        }
        document.getElementById('updatedieutri').value=response.data["dieutri"]
       var selectdv=document.getElementById("updatedieutri").childNodes;
       for(var p = 0; p < selectdv.length; p++) {
         var datadv=selectdv[p].value;
         if(datadv==response.data["dieutri"])
         {
            selectdv[p].setAttribute('selected', true);
         }
        }
      
        document.getElementById('updateluuy').value=response.data["luuy"]
        document.getElementById('updatebacsi').value=response.data["bacsi"]
        var selectbs=document.getElementById("updatebacsi").childNodes;
        for(var i = 0; i < selectbs.length; i++) {
             var datadv=selectbs[i].value;
             if(datadv==response.data["bacsi"])
             {
                selectbs[i].setAttribute('selected', true);
             }
         }
        
        this.setState({
           ngay: new Date(response.data["ngayhen"]),
           idlich: response.data["idlich"],
           dieutri: response.data["dieutri"],
           bacsi: response.data["bacsi"],
           trangthai: response.data["trangthai"],
           luuy: response.data["luuy"],
           iddieutriupdate: response.data["id"]
       })
     })
     .catch(error => {
       this.setState({
       
         
       })
       
     })
 }


 handleUpdateDieuTri(event)
 {
  event.preventDefault()
  const dieutriupdate = {
    ngay: this.state.ngay,
    idlich: this.state.idlich,
    dieutri: this.state.dieutri,
    bacsi: this.state.bacsi,
    trangthai: this.state.trangthai,
    luuy: this.state.luuy,
    idkhachhang: this.state.idkhachhang,
    idkhammoi: this.state.idkhammoi
   }

   axios.post('/index.php/api/dieutritheolichupdate/'+this.state.iddieutriupdate,dieutriupdate)
   .then(response => {
     // redirect to the homepage
     axios.get('/index.php/api/dieutritheolich/'+this.state.idkhammoi).then(response => {
      this.setState({
       dieutritheolich: response.data
      })
    })
      
   })
   .catch(error => {
    
    
   })
   const lichlamviecupdate = {
    idkhachhang : this.state.idkhachhang,
    dichvu : this.state.dichvu,
    trangthai: this.state.trangthai,
    ghichu : this.state.luuy,
    loai: "1",
    dieutri: this.state.dieutri,
    benhly: this.state.benhly,
    idkhammoi: this.state.idkhammoi,
    start : this.state.ngay,
    end :  this.state.ngay,
    giohen: document.getElementById("updategiohen").value,
    idbacsi : this.state.bacsi

   }
   console.log(lichlamviecupdate);
   axios.post('/index.php/api/lichlamviecupdate/'+this.state.idlich,lichlamviecupdate)
   .then(response => {
    var button = document.getElementById('btn-endsss')
    button.click()
   })
   .catch(error => {
   
     
   })
   
 }
 getdulieuxoa(event)
  {
    event.preventDefault()
    let idkh=event.target.attributes.getNamedItem('data-iddieutri').value
    document.getElementById("btnxoadulieu").setAttribute("data-iddieutri", idkh);
  }
  handleDateSelect(event){
    console.log(event)
  }
  formatTime(date) {
    var res = date.split(" ");
    var ress = res[0].split(":");
  
      return ress[0]+":"+ress[1];
  }
  render() {
 const { doctorlist,dieutritheolich,dieutridichvulist,idkhachhang,idkhammoi } = this.state
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12 m-b-20">
        <div className="col-md-12 col-xs-12 m-b-20">

<section className="tabchuyen">
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
   <li className=""><Link to={'/ho-so-khach-hang/'+idkhachhang} className="sticon"><span>Thông tin cá nhân</span></Link></li>
  
   <li className=""><Link to={'/kham-moi/'+idkhachhang} className="sticon"><span>Bệnh lý</span></Link></li>
 

 </ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
<KhachHangInfo idkhachhang={idkhachhang}/>
</div>

</div>
         <div className="col-md-12 col-xs-12 m-b-20">

<section>
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
  

 </ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
</div>

      <div className="col-sm-12">
        <div className="white-box">
          <h3 className="box-title">ĐIỀU TRỊ THEO LỊCH
  </h3>
  
    <div className="row">
    
      
      <div className="col-sm-12">
     
   
        <div className="table-responsive">
          <table className="table-bordered table-hover table color-table primary-table" >
            <thead>
              <tr>
              <th>STT</th>
              <th>Ngày</th>
              <th>Giờ hẹn</th>
                <th>Điều trị</th>
                <th>Bác sĩ</th>
                <th>Trạng thái</th>
                <th>Ghi chú</th>
                <th>Xem ảnh sau điều trị</th>
                <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalKeHoach" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </thead>
         
            <tbody>
            {dieutritheolich.map((cd, index) => ( 
              <tr key={cd.id} id={"ketquadieutriitem"+cd.id} data-itemcd={cd.id}>
                
                <td data-icd={cd.id}><p>{index+1}</p>
                <button onClick={this.handleChiTietDieuTri} className="icon-smallx icon-list-demo btn btn-info btn-circle btn-xl" data-iddieutri={cd.id} data-toggle="modal" data-target="#exampleModalKeHoachCapNhat" data-whatever="@mdo"><i className="fa fa-pencil" data-iddieutri={cd.id}></i></button>
                </td>
                <td data-icd={cd.id} id={"cotdichvu"+cd.id}>{moment(cd.start).format('DD-MM-YYYY')}</td>
                <td data-icd={cd.id} >{this.formatTime(cd.giohen)}</td>
                <td data-icd={cd.id}>{cd.tendieutri}</td>
                <td data-icd={cd.id}>{cd.tenbacsi}</td>
                {(() => {
        if (cd.trangthai==="1") {
          return (
            <td><button className="btn btn-block btn-warning"> Đặt hẹn</button></td>
          )
        }
        else if (cd.trangthai==="2") {
            return (
              <td><button className="btn btn-block btn-danger">Không đến</button></td>
            )
        }
        else if (cd.trangthai==="3") {
            return (
              <td><button className="btn btn-block btn-primary">Đã đến</button></td>
            )
        }
        else {
          return (
            <td><button className="btn btn-block btn-success">Đã làm</button></td>
          )
        }
      })()}
                <td data-icd={cd.id} id={"cotbacsi"+cd.id}>{cd.ghichutext.map(paragraph =>
            <p>
                {paragraph}
            </p>
        )}</td>
              
                <td data-icd={cd.id}><Link className="btn btn-block btn-success" to={"/anh-dieu-tri-khach-hang/"+idkhachhang+"/"+idkhammoi+"/"+cd.id}>Xem ảnh <span className="sodemanh" id={"atdt"+cd.id}></span></Link></td>
                {(() => {
                             axios.get('/index.php/api/laysoanhdieutri/'+cd.id).then(response => {
                                 var soanh = response.data[0].soanh
                                 console.log(typeof soanh)
                                 document.getElementById("atdt"+cd.id).innerText=soanh
                            
                              })
                    })()}
              
                <td className="btnaction">
                {localStorage.getItem('userrole')==="1" ?          <button data-iddieutri={cd.id} onClick={this.getdulieuxoa} data-toggle="modal" data-target="#xoakhachhang" className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}>
                    <i className="fa fa-trash-o" data-iddieutri={cd.id}></i>
                  </button> :  <p></p>}
           
                  
                

                  </td>
               
              </tr>
            ))}
              
            </tbody>
          </table>
        </div>
      
    </div>
  </div>
        </div>
     
        <div className="row text-center m-t-10">
      
        </div>
      </div>
      <div className="modal fade" id="exampleModalKeHoach" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalLabel1">Tạo điều trị</h4> </div>
          <div className="modal-body">
            <form onSubmit={this.handleCreateDieuTri}>
              
         
            <div className="form-group">
            <div class="row ">
         <div className="col-md-8">
         <label htmlFor="recipient-name" className="control-label">Ngày hẹn</label>
         <br />
         <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={this.state.ngay}
      onChange={(newDate) => this.setState({ngay:newDate})}//when day is clicked
      className="form-control"
    />
                         
         </div>
         <div className="col-md-4">
         <label htmlFor="recipient-name" className="control-label">Giờ hẹn</label>
         <input type="time" id="giohen" className="form-control" name="giohen" min="06:00" max="24:00" required />
         </div>
           </div>
            </div>
              <div className="form-group hidden">
                  
                <label htmlFor="recipient-name" className="control-label">Ngày tạo điều trị</label>
                <input type="text" autocomplete="off"  className="form-control mydatepicker" name="ngay" id="ngay" disabled defaultValue={ngayhientai}  onChange={this.handleFieldChange} />
                 </div>
                <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                    <label htmlFor="recipient-name" className="control-label">Tên dịch vụ điều trị</label>
                        <select className="form-control" name="dieutri" id="dieutri" onChange={this.handleFieldChange}>
                            <option value="chưa chọn">Chọn dịch vụ điều trị</option>
                            {dieutridichvulist.map(cd => ( 
                            <option id={"itemdieutridichvu"+cd.id} key={cd.id}  value={cd.id} >{cd.ten}</option>
                        ))}
                    </select>
                        </div>
                    
                    </div>
              </div>
           
             
            
              
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Bác sĩ</label>
                        <select className="form-control" name="bacsi" id="bacsi" onChange={this.handleFieldChange}>
                        <option value="0">Chọn bác sĩ</option>
                        {doctorlist.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.ten}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
     
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Trạng thái điều trị</label>
                        <select className="form-control" name="trangthai" id="trangthai" onChange={this.handleFieldChange}>
                        <option value="0">Chọn trạng thái</option>
                        <option value="1">Đặt hẹn</option>
                        <option value="2">Không đến</option>
                        <option value="3">Đã đến</option>
                        <option value="4">Đã làm</option>
                         
                    </select>
                        </div>
                  </div>
         
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú </label>
                <textarea className="form-control" name="luuy" id="luuy" onChange={this.handleFieldChange} /> 
              </div>
     
              <div className="modal-footer">
            <button type="button" id="btn-endss" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
            <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
          </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
    <div className="modal fade" id="exampleModalKeHoachCapNhat" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalLabel1CapNhat">Cập nhật điều trị</h4> </div>
          <div className="modal-body">
          <form onSubmit={this.handleUpdateDieuTri}>
          <div className="form-group">
            <div class="row ">
         <div className="col-md-8">
         <label htmlFor="recipient-name" className="control-label">Ngày hẹn</label>
         <br />
         <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={this.state.ngay}
      onChange={(newDate) => this.setState({ngay:newDate})}//when day is clicked
      className="form-control"
    />
         </div>
         <div className="col-md-4">
         <label htmlFor="recipient-name" className="control-label">Giờ hẹn</label>
         <input type="time" id="updategiohen" className="form-control" name="giohen" min="06:00" max="24:00" required />
         </div>
           </div>
            </div>
        
              <div className="form-group hidden">
                <label htmlFor="recipient-name" className="control-label">Ngày tạo điều trị</label>
                <input type="text" autocomplete="off"  className="form-control mydatepicker" name="ngay" id="updatengay"  onChange={this.handleFieldChange} />
                 </div>
                <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                    <label htmlFor="recipient-name" className="control-label">Tên dịch vụ điều trị</label>
                        <select className="form-control" name="dieutri" id="updatedieutri" onChange={this.handleFieldChange}>
                            <option value="chưa chọn">Chọn dịch vụ điều trị</option>
                            {dieutridichvulist.map(cd => ( 
                            <option id={"itemdieutridichvu"+cd.id} key={cd.id}  value={cd.id} >{cd.ten}</option>
                        ))}
                    </select>
                        </div>
                    
                    </div>
              </div>

         
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú </label>
                <textarea className="form-control" name="luuy" id="updateluuy" onChange={this.handleFieldChange} /> 
              </div>
              
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Bác sĩ</label>
                        <select className="form-control" name="bacsi" id="updatebacsi" onChange={this.handleFieldChange}>
                        <option value="0">Chọn bác sĩ</option>
                        {doctorlist.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.ten}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
     
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Trạng thái điều trị</label>
                        <select className="form-control" name="trangthai" id="updatetrangthai" onChange={this.handleFieldChange}>
                        <option value="0">Chọn trạng thái</option>
                        <option value="1">Đặt hẹn</option>
                        <option value="2">Không đến</option>
                        <option value="3">Đã đến</option>
                        <option value="4">Đã làm</option>
                         
                    </select>
                        </div>
                  </div>
         
              </div>
              <div className="modal-footer">
            <button type="button" id="btn-endsss" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
            <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
          </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
    <div className="modal fade" id="xoakhachhang" tabIndex={-1} role="dialog" aria-labelledby="xoakhachhang">
<div className="modal-dialog" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
      <h4 className="modal-title" id="exampleModalLabel1">BẠN CÓ CHẮC CHẮN MUỐN XÓA</h4> </div>
    <div className="modal-body">
    <button type="button" className="btn btn-default" data-dismiss="modal" id="btndongdulieu">Đóng</button>
                                            <button id="btnxoadulieu" onClick={this.handleDeleteDieuTri} type="button" className="btn btn-primary">Xóa</button>
    </div>
 
  </div>
</div>
</div>
    </div>
  
    );
  }
}

export default DieuTriTheoLich;