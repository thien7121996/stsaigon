
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
class LichHenDieuTri extends Component {
  constructor (props) {
    super(props)
    this.state = {
      events: [],
      khachhanglist: [],
      doctorlist: [],
      dichvulist: [],
      benhlylist: [],
      idlichlamviec:'',
      idkhachhang: '2',
      lichkhachhang: [],
      dichvu: '',
      trangthai: '1',
      loai: '1',
      dieutri: this.props.match.params.iddt,
      benhly: '', 
      ghichu: 'chưa có ghi chú',
      start: '',
      end: '',
      idbacsi: '',
      idkhachhangs:this.props.match.params.id,
      idkhammoi: this.props.match.params.idkm,
      idupdatellv: ''
    }
  
    this.onEventDrop=this.onEventDrop.bind(this)
    this.handleSelect=this.handleSelect.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewLichLamViec  = this.handleCreateNewLichLamViec.bind(this)
    this.handleUpdateLichLamViec  = this.handleUpdateLichLamViec.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
   
  }
  componentWillMount(){
    const scripts = [
      '/public/app_assets/js/jasny-bootstrap.js',
      '/public/app_assets/js/mask.js',
      '/public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
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
    '/public/app_assets/js/jasny-bootstrap.js',
      '/public/app_assets/js/mask.js',
      '/public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
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
console.log("ma khach hang "+this.props.match.params.id);

  axios.get('/index.php/api/customers').then(response => {
    this.setState({
      khachhanglist: response.data
    })
  })
  axios.get('/index.php/api/doctor').then(response => {
    this.setState({
      doctorlist: response.data
    })
  })  
  axios.get('/index.php/api/dichvu').then(response => {
    this.setState({
      dichvulist: response.data
    })
  }) 
  

  axios.get('/index.php/api/lichhendieutri/'+this.state.dieutri).then(response => {
    this.setState({
      lichkhachhang: response.data
    })
    console.log(this.state.lichkhachhang)
  })
  
  axios.get('/index.php/api/chandoan').then(response => {
        
    this.setState({
        benhlylist: response.data
      })
  })

}

  onEventDrop(data){
  
    const { start, end , event } = data
    
 
    const { history } = this.props
    const { events } = this.state

    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents
    })
      const sukiens = {
      idkhachhang: event["idkhachhang"],
      dichvu: event["dichvu"],
      trangthai: event["trangthai"],
      ghichu: event["ghichu"],
      start: start,
      end : end,
      idbacsi: event["idbacsi"]
    }
    console.log(events);
    axios.post('/index.php/api/lichlamviecupdate/'+event["idlichlamviec"],sukiens)
     .then(response => {
       // redirect to the homepage
     
         var arr=[]

         axios.get('/index.php/api/lichlamviec').then(response => {
           response.data.map(ev => {
             arr.push({
               idlichlamviec: ev.id,
               title: ev.ghichu,
               ghichu: ev.ghichu,
               dichvu: ev.dichvu,
               idkhachhang: ev.idkhachhang,
               idbacsi: ev.idbacsi,
               trangthai: ev.trangthai,
               start: moment(ev.start).toDate(),
               end: moment(ev.end).toDate()
             })
             this.setState({
              events: arr
            })
              })
           })
          
        
       
    
       var button = document.getElementById('btn-end')
       button.click()
      
     })
     .catch(error => {
       this.setState({
         errors: error.response.data.errors
         
       })
       var button = document.getElementById('btn-end')
       button.click()
     })
    
  }
  handleSelect({ start, end }){
    
    console.log(start)
    this.setState({

          start: start,
          end:  end,
    })
    document.getElementById("btnthemlich").click()
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
     else if(event.target.type == 'idkhachhang')
     {
     console.log("dang chon khach hang")
       this.setState({
         idkhachhang: event.target.value
       })
     }
     else
     {
       this.setState({
         [event.target.name]: event.target.value
       })
       
     }
    
   }
   
   handleCreateNewLichLamViec (event) {
     event.preventDefault()
 
     const { history } = this.props
 
     const lichlamviec = {
        idkhachhang : this.state.idkhachhangs,
        dichvu : this.state.dichvu,
        trangthai: this.state.trangthai,
        ghichu : this.state.ghichu,
        loai: this.state.loai,
        dieutri: this.state.dieutri,
        benhly: this.state.benhly,
        idkhammoi: this.state.idkhammoi,
        start :  new Date(document.getElementById("start").value),
        end :  new Date(document.getElementById("start").value),
        idbacsi : this.state.idbacsi
 
     }
     console.log(lichlamviec)
     axios.post('/index.php/api/lichlamviec', lichlamviec)
      .then(response => {
    
          

          axios.get('/index.php/api/lichhendieutri/'+this.state.dieutri).then(response => {
                this.setState({
                  lichkhachhang: response.data
                })
            })
           
         
       
          
        var button = document.getElementById('btn-end')
       
        button.click()
  
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
            
        var button = document.getElementById('btn-end')
     
        button.click()
      
        
      })
   }
   handlexemchitiet(event){
     event.preventDefault()
     let idpc=event.target.attributes.getNamedItem('data-idlichlamviec').value
     axios.get('/index.php/api/lichlamviecchitiet/'+idpc)
      .then(response => {
        document.getElementById("updateidbacsi").value=response.data["idbacsi"]
        document.getElementById("updatedichvu").value=response.data["dichvu"]
        document.getElementById("updateghichu").value=response.data["ghichu"]
        document.getElementById("updatetrangthai").value=response.data["trangthai"]
        document.getElementById("updateloai").value=response.data["loai"]
        
        document.getElementById("updatebenhly").value=response.data["benhly"]
      
        document.getElementById("idupdatellv").value=response.data["id"]
        document.getElementById("updatestart").value=new Date(response.data["start"])
        
        this.setState({
          idkhachhang:response.data["idbacsi"],
          dichvu: response.data["dichvu"],
          trangthai: response.data["trangthai"],
          ghichu:response.data["ghichu"],
          loai:response.data["loai"],
          dieutri:response.data["dieutri"],
          benhly:response.data["benhly"],
          start: response.data["start"],
          end : response.data["end"],
          idbacsi: response.data["idbacsi"],
          idlichlamviec: response.data["idlichlamviec"],
          idupdatellv: response.data["id"]
        })
        var selectidbacsi=document.getElementById("updateidbacsi").childNodes;
  
    for(var i = 0; i < selectidbacsi.length; i++) {
     var datagt=selectidbacsi[i].value;
     if(datagt==response.data["idbacsi"])
     {
      selectidbacsi[i].setAttribute('selected', true);
     }
    }
    var selectiddv=document.getElementById("updatedichvu").childNodes;
    
    for(var j = 0; j < selectiddv.length; j++) {
     var datadv=selectiddv[j].value;
     if(datadv==response.data["dichvu"])
     {
      selectiddv[j].setAttribute('selected', true);
     }
    }
    var selectbenhly=document.getElementById("updatebenhly").childNodes;
  
    for(var m = 0; m < selectbenhly.length; m++) {
     var datatt=selectbenhly[m].value;
     if(datatt==response.data["benhly"])
     {
        selectbenhly[m].setAttribute('selected', true);
     }
    }
    var selectidtt=document.getElementById("updatetrangthai").childNodes;
  
    for(var z = 0; z < selectidtt.length; z++) {
     var datatt=selectidtt[z].value;
     if(datatt==response.data["trangthai"])
     {
      selectidtt[z].setAttribute('selected', true);
     }
    }
    var selectloai=document.getElementById("updateloai").childNodes;
  
    for(var z = 0; z < selectloai.length; z++) {
     var datatt=selectloai[z].value;
     if(datatt==response.data["loai"])
     {
        selectloai[z].setAttribute('selected', true);
     }
    }
   
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
     
   
    
    
    document.getElementById("btnthemlichs").click()
  }
  handleUpdateLichLamViec(event){

    event.preventDefault()
    const lichlamviecupdate = {
      idkhachhang: this.state.idkhachhangs,
      dichvu: document.getElementById("updatedichvu").value,
      trangthai: document.getElementById("updatetrangthai").value,
      ghichu: document.getElementById("updateghichu").value,
      loai: this.state.loai,
      dieutri: this.state.dieutri,
      benhly: document.getElementById("updatebenhly").value,
      idkhammoi: this.state.idkhammoi,
      ghichu: document.getElementById("updateghichu").value,
      start :  new Date(document.getElementById("updatestart").value),
      end :  new Date(document.getElementById("updatestart").value),
      idbacsi: document.getElementById("updateidbacsi").value

     }
     console.log(lichlamviecupdate);
     axios.post('/index.php/api/lichlamviecupdate/'+document.getElementById("idupdatellv").value,lichlamviecupdate)
     .then(response => {
       

        axios.get('/index.php/api/lichhendieutri/'+this.state.dieutri).then(response => {
          this.setState({
            lichkhachhang: response.data
          })
          })
         
       
     
        
         var button = document.getElementById('btn-ends')
         button.click()
     })
     .catch(error => {
     
       var button = document.getElementById('btn-ends')
       button.click()
     })
  }
  handleDelete(event){
    event.preventDefault()
     let idpc=event.target.attributes.getNamedItem('data-idlichlamviec').value

    axios.get('/index.php/api/deletelichlamviec/'+idpc)
    .then(response => {
      // redirect to the homepage
    
          // redirect to the homepage
       
       

        axios.get('/index.php/api/lichhendieutri/'+this.state.dieutri).then(response => {
         this.setState({
           lichkhachhang: response.data
         })
          })
         
       
   
        
         var button = document.getElementById('btn-ends')
         button.click()
         
        
     
    })
    .catch(error => {
   
      
    })
  }
  renderBacSi(idbacsi,idcol) {
    axios.get('/index.php/api/bacsitheoid/'+idbacsi).then(response => {
      document.getElementById("tenbacsi"+idcol).innerText=response.data.ten
    })
    
}
renderDichVuDieuTri(iddichvu,idcol) {
  axios.get('/index.php/api/dichvudetail/'+iddichvu).then(response => {
    document.getElementById("tendichvu"+idcol).innerText=response.data.ten
  })
  
}
  render() {
    const { events,doctorlist,dichvulist,khachhanglist,idkhachhangs,lichkhachhang,benhlylist  } = this.state
    return (
      <div className="row App" id="lichbooking">
           <div className="col-md-12 col-xs-12 m-b-20">

<section>
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
   <li className="tab-current"><Link to={'/ho-so-khach-hang/'+idkhachhangs} className="sticon"><span>Thông tin cá nhân</span></Link></li>
  
   <li className="tab-current"><Link to={'/kham-moi/'+idkhachhangs} className="sticon"><span>Khám mới</span></Link></li>
 

 </ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
</div>
      <div className="col-sm-12">
        <div className="white-box">
        <table className="table color-table primary-table" >
            <thead>
              <tr>
                <th>Ngày hẹn</th>
                <th>Loại</th>
                <th>Mã khách hàng</th>
                <th>Tên</th>
                <th>Bệnh lý</th>
                
                <th>Dịch vụ</th>
                <th>Điều Trị</th>
                <th>Bác sĩ</th>
                <th>Trạng thái</th>
                <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
              <th>Ngày hẹn</th>
                <th>Loại</th>
                <th>Mã khách hàng</th>
                <th>Tên</th>
                <th>Bệnh lý</th>
                
                <th>Dịch vụ</th>
                <th>Điều Trị</th>
                <th>Bác sĩ</th>
                <th>Trạng thái</th>
                <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </tfoot>
            <tbody>
            {lichkhachhang.map(cd => ( 
              <tr key={cd.id} id={"lichkhachhangitem"+cd.id} data-itemcd={cd.id}>
                
                <td data-icd={cd.id}>{new Date(cd.start).getDate()+"/"+(new Date(cd.start).getMonth()+1)+"/"+new Date(cd.start).getFullYear()}
                <button  className="btn btn-block  btn-primary"><Link to={"/anh-lich-hen-khach-hang/"+cd.id}>Ảnh lịch hẹn</Link></button>
                </td>
                <td data-icd={cd.id} id={"tendichvu"+cd.id}>
                {(() => {
  if (cd.loai==="1") {
    return (
    <button className="btn btn-block btn-default">Khám mới</button>
    )
  } else {
    return (
     <button className="btn btn-block btn-primary">Tái khám</button>
    )
  }
})()}
                    </td>
                    <td data-icd={cd.id} id={"tenbacsi"+cd.id}>{cd.idkhachhang}</td>
                <td data-icd={cd.id} id={"tenbacsi"+cd.id}>{cd.tenkhachhang}</td>
    
                <td data-icd={cd.id}>{cd.tenbenhly}</td>
                <td data-icd={cd.id}>{cd.tendichvu}</td>
                <td data-icd={cd.id}>{cd.tendieutri}</td>
                <td data-icd={cd.id}>{cd.tenbacsi}</td>
                  
                     {(() => {
        if (cd.trangthai==="1") {
          return (
            <td id={"coltrangthai"+cd.id}><button className="btn btn-block btn-default">Đặt hẹn</button></td>
          )
        } else if (cd.trangthai==="2") {
          return (
            <td id={"coltrangthai"+cd.id}><button className="btn btn-block btn-warning">Không đến</button></td>
          )
        } else if (cd.trangthai==="3") {
          return (
            <td id={"coltrangthai"+cd.id}><button className="btn btn-block btn-info">Đã đến</button></td>
          )
        } else if (cd.trangthai==="4") {
          return (
            <td id={"coltrangthai"+cd.id}><button className="btn btn-block btn-success">Đồng ý</button></td>
          )
        } else {
          return (
            <td id={"coltrangthai"+cd.id}><button className="btn btn-block btn-danger">Không dồng ý</button></td>
          )
        }
      })()}
                <td className="btnaction">
                  <button data-idlichlamviec={cd.id} onClick={this.handleDelete} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}>
                    <i className="fa fa-trash-o" data-idlichlamviec={cd.id}></i>
                  </button>
                  <button onClick={this.handlexemchitiet} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idlichlamviec={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo">
                    <i className="fa fa-pencil" data-idlichlamviec={cd.id}></i>
                  </button>
                 

                  </td>
               
              </tr>
            ))}
              
            </tbody>
          </table>
        
          <button id="btnthemlich" type="button" className="btn btn-block  btn-primary hidden" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button>
          <button id="btnthemlichs" type="button" className="btn btn-block  btn-primary hidden" data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-plus"></i></button>
         
          </div>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Tạo Lịch Hẹn</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewLichLamViec}>

            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Bác sĩ phụ trách</label>
              <select className="form-control" name="idbacsi" id="idbacsi" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn bác sĩ</option>
              {doctorlist.map(bs => (
                <option key={bs.id} value={bs.id} data-dv={bs.id}>{bs.ten}</option>
              ))}
    
    
    </select>
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Dịch Vụ</label>
              <select className="form-control" name="dichvu" id="dichvu" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn dịch vụ</option>
              {dichvulist.map(dv => (
                <option key={dv.id} value={dv.id} data-dv={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Bệnh lý</label>
              <select className="form-control" name="benhly" id="benhly" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn bệnh lý</option>
              {benhlylist.map(dv => (
                <option key={dv.id} value={dv.id} data-dv={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              </div>
              <div className="form-group">
            <label htmlFor="recipient-name" className="control-label">Ngày hẹn</label>
                          <input type="text" className="form-control mydatepicker" name="start" id="start" onChange={this.handleFieldChange}  /> 
            </div>
          
            <div className="form-group hidden">
              <label htmlFor="message-text"  className="control-label">Khách hàng</label>
              <select className="form-control" name="idkhachhang" id="idkhachhang" value={idkhachhangs} onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn khách hàng</option>
              {khachhanglist.map(kh => (
                <option key={kh.ID} value={kh.ID} data-kh={kh.ID}>{kh.hoten}</option>
              ))}
    </select>
              
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Ghi chú</label>
              <textarea className="form-control" id="ghichu" name="ghichu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Trạng thái</label>
              <select className="form-control" name="trangthai" id="trangthai" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn trạng thái</option>
              <option value={1}>Đặt hẹn</option>
              <option value={2} >Không đến</option>
              <option value={3} >Đã đến</option>
              <option value={4} >Đồng ý</option>
              <option value={5} >Không dồng ý</option>
    </select>
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Loại</label>
              <select className="form-control" name="loai" id="loai" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn loại</option>
              <option value={1} checked>Khám mới</option>
              <option value={2} checked>Tái khám</option>
    </select>
            </div>
            <div className="modal-footer">
          <button type="button" id="btn-end" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
          <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
  <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel2">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel2">Cập nhật Lịch Hẹn</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateLichLamViec}>

            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Bác sĩ phụ trách</label>
              <select className="form-control" name="idbacsi" id="updateidbacsi" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn bác sĩ</option>
              {doctorlist.map(bs => (
                <option key={bs.id} value={bs.id} data-dv={bs.id}>{bs.ten}</option>
              ))}
    
    
    </select>
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Điều trị/dịch vụ</label>
              <select className="form-control" name="dichvu" id="updatedichvu" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn dịch vụ</option>
              {dichvulist.map(dv => (
                <option key={dv.id} value={dv.id} data-dv={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Bệnh lý</label>
              <select className="form-control" name="benhly" id="updatebenhly" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn bệnh lý</option>
              {benhlylist.map(dv => (
                <option key={dv.id} value={dv.id} data-dv={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              </div>
              <div className="form-group">
            <label htmlFor="recipient-name" className="control-label">Ngày hẹn</label>
                          <input type="text" className="form-control mydatepicker" name="start" id="updatestart" onChange={this.handleFieldChange}  /> 
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Ghi chú</label>
              <textarea className="form-control" id="updateghichu" name="ghichu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
                <div className="row">
                <div className="col-md-6">
              <label htmlFor="message-text"  className="control-label">Trạng thái</label>
              <select className="form-control" name="trangthai" id="updatetrangthai" onChange={this.handleFieldChange}>
              <option value={0}>Chọn trạng thái</option>
              <option value={1}>Đặt hẹn</option>
              <option value={2} >Không đến</option>
              <option value={3} >Đã đến</option>
              <option value={4} >Đồng ý</option>
              <option value={5} >Không dồng ý</option>
    </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="message-text"  className="control-label">Trạng thái khám</label>
              <select className="form-control" name="loai" id="updateloai" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn loại</option>
              <option value={1} >Khám mới</option>
              <option value={2} >Tái Khám</option>
        
    </select>
            </div>
                </div>
         
            </div>
          
           
            <div className="form-group hidden">
              <label htmlFor="message-text"  className="control-label">ID Lịch Làm Việc</label>
              <input type="text" className="form-control" id="idupdatellv" name="idupdatellv" onChange={this.handleFieldChange} />
            </div>
            <div className="modal-footer">
          <button type="button" id="btn-ends" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
         
          <button type="submit" className="btn btn-primary" >Cập nhật</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
          </div>
  
    );
  }
}

export default LichHenDieuTri;