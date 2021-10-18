import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import moment from "moment";
import Select from "react-select";
const khuvucs = [{
  ID: 1,
  label: "Quận 1 (Hồ Chí Minh)",
  value: "Quận 1 (Hồ Chí Minh)"
},{
  ID: 2,
  label: "Quận 2 (Hồ Chí Minh)",
  value: "Quận 2 (Hồ Chí Minh)"
},{
  ID: 3,
  label: "Quận 3 (Hồ Chí Minh)",
  value: "Quận 3 (Hồ Chí Minh)"
},{
  ID: 4,
  label: "Quận 4 (Hồ Chí Minh)",
  value: "Quận 4 (Hồ Chí Minh)"
},{
  ID: 5,
  label: "Quận 5 (Hồ Chí Minh)",
  value: "Quận 5 (Hồ Chí Minh)"
},{
  ID: 6,
  label: "Quận 6 (Hồ Chí Minh)",
  value: "Quận 6 (Hồ Chí Minh)"
},{
  ID: 7,
  label: "Quận 7 (Hồ Chí Minh)",
  value: "Quận 7 (Hồ Chí Minh)"
},{
  ID: 8,
  label: "Quận 8 (Hồ Chí Minh)",
  value: "Quận 8 (Hồ Chí Minh)"
},{
  ID: 9,
  label: "Quận 9 (Hồ Chí Minh)",
  value: "Quận 9 (Hồ Chí Minh)"
},{
  ID: 10,
  label: "Quận 10 (Hồ Chí Minh)",
  value: "Quận 10 (Hồ Chí Minh)"
},{
  ID: 11,
  label: "Quận 11 (Hồ Chí Minh)",
  value: "Quận 11 (Hồ Chí Minh)"
},{
  ID: 12,
  label: "Quận 12 (Hồ Chí Minh)",
  value: "Quận 12 (Hồ Chí Minh)"
},
{
  ID: 13,
  label: "Quận Bình Thạnh (Hồ Chí Minh)",
  value: "Quận Bình Thạnh (Hồ Chí Minh)"
},
{
  ID: 14,
  label: "Quận Tân Bình (Hồ Chí Minh)",
  value: "Quận Tân Bình (Hồ Chí Minh)"
},
{
  ID: 15,
  label: "Quận Tân Phú (Hồ Chí Minh)",
  value: "Quận Tân Phú (Hồ Chí Minh)"
},
{
  ID: 16,
  label: "Quận Bình Tân (Hồ Chí Minh)",
  value: "Quận Bình Tân (Hồ Chí Minh)"
},
{
  ID: 17,
  label: "Quận Gò Vấp (Hồ Chí Minh)",
  value: "Quận Gò Vấp (Hồ Chí Minh)"
},
{
  ID: 18,
  label: "Quận Phú Nhuận (Hồ Chí Minh)",
  value: "Quận Phú Nhuận (Hồ Chí Minh)"
},
{
  ID: 19,
  label: "Quận Thủ Đức (Hồ Chí Minh)",
  value: "Quận Thủ Đức (Hồ Chí Minh)"
},
{
  ID: 20,
  label: "Huyện Bình Chánh (Hồ Chí Minh)",
  value: "Huyện Bình Chánh (Hồ Chí Minh)"
},
{
  ID: 21,
  label: "Huyện Cần Giờ (Hồ Chí Minh)",
  value: "Huyện Cần Giờ (Hồ Chí Minh)"
},
{
  ID: 22,
  label: "Huyện Củ Chi (Hồ Chí Minh)",
  value: "Huyện Củ Chi (Hồ Chí Minh)"
},
{
  ID: 23,
  label: "Huyện Hóc Môn (Hồ Chí Minh)",
  value: "Huyện Hóc Môn (Hồ Chí Minh)"
},
{
  ID: 24,
  label: "Huyện Nhà Bè (Hồ Chí Minh)",
  value: "Huyện Nhà Bè (Hồ Chí Minh)"
},
{
  ID: 25,
  label: "Đồng Nai",
  value: "Đồng Nai"
},
{
  ID: 26,
  label: "Bình Dương",
  value: "Bình Dương"
},
{
  ID: 27,
  label: "Tỉnh khác",
  value: "Tỉnh khác"
}];
class AllCustomer extends Component {
  constructor () {
    super()

    this.state = {
      khachhanglist: [],
      nguongioithieu: '',
      tiensubenhlist: [],
      dichvulist: [],
      nguongioithieulist:[],
      bacsilist: [],
      khachhang: [],
      hoten: '',
      gioitinh: '1',
      ngaysinh: '1/1/1989',
      diachi: 'Chưa có địa chỉ',
      dienthoai: 'Chưa có điện thoại',
      tiensubenh: [],
      gioithieu: 'chưa có ghi chú',
      khuvuc: '',
      dichvudieutri: [],
      nguongioithieu: '3',
      danhgia: 'Chưa có đánh giá',
      sosao: '0',
      bacsidieutri: '1',
      trangthai: '1',
      anhdaidien: '',
      truocmatbefore: '',
      hamtrenbefore: '',
      hamduoibefore: '',
      truocmatafter: '',
      hamtrenafter: '',
      hamduoiafter: '',
      idupdate: '',
      ngaytao: '',
      khoangngaytao: '',
      thoigianhen: '',
      khoangngayhen: '',
      chuoicantim: '',
      trangthaidathen: '',
      dichvucuakhach: '',
      trangthaikhachden: '',
      khuvucselect: { label: "Chọn khu vực cần tìm", value: "" },
    }
 
    this.handleDeleteCustomer  = this.handleDeleteCustomer.bind(this)
    this.getDetailNguonGioiThieu = this.getDetailNguonGioiThieu.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateThongTin = this.handleCreateThongTin.bind(this)
    this.handleUpdateThongTin = this.handleUpdateThongTin.bind(this)
    this.getchitietkhachhang = this.getchitietkhachhang.bind(this)
    this.handleBoLocKhachHang = this.handleBoLocKhachHang.bind(this)
    this.handleFieldChangeKhuVuc = this.handleFieldChangeKhuVuc.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }
  componentWillMount(){
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
      './public/app_assets/js/datatable/menu.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw-init.js',
      './public/app_assets/js/jasny-bootstrap.js',
      './public/app_assets/js/mask.js',
      './public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      './public/app_assets/js/custome-app.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      './public/app_assets/js/datatable/custom.js',
      './public/app_assets/bootstrap/dist/js/bootstrap.min.js',
      './public/app_assets/js/bootstrap-select.min.js'
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
  axios.get('/index.php/api/customers').then(response => {
    this.setState({
      khachhanglist: response.data
    })
  })
  axios.get('/index.php/api/nguongioithieu').then(response => {
    this.setState({
      nguongioithieulist: response.data
    })
  })
  axios.get('/index.php/api/tiensubenh').then(response => {
    this.setState({
      tiensubenhlist: response.data
    })
  })  
  axios.get('/index.php/api/dichvu').then(response => {
    this.setState({
      dichvulist: response.data
    })
  }) 
  axios.get('/index.php/api/doctor').then(response => {
    this.setState({
      bacsilist: response.data
    })
  })
  }
  componentDidMount() {
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
      './public/app_assets/js/datatable/menu.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw-init.js',
      './public/app_assets/js/jasny-bootstrap.js',
      './public/app_assets/js/mask.js',
      './public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      './public/app_assets/js/custome-app.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      './public/app_assets/bootstrap/dist/js/bootstrap.min.js',
      './public/app_assets/js/bootstrap-select.min.js',
      './public/app_assets/js/datatable/custom.js'
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
  handleReset(event)
  {
    document.querySelector("input[name='chuoicantim']").value=""
    document.getElementById("bolocthongtinkh").reset()
    axios.get('/index.php/api/customers').then(response => {
        this.setState({
          khachhanglist: response.data
        })
       
        
      })
      document.getElementById("khoanngaydatao").className="hidden"
      document.getElementById("inputngaytao").classList.remove("hidden")
  }
  handleDeleteCustomer(event)
  {
      event.preventDefault()
      let idkh=event.target.attributes.getNamedItem('data-idkhachhang').value

      axios.get('/index.php/api/customersdelete/'+idkh)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/customers').then(response => {
            this.setState({
              khachhanglist: response.data
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
  getDetailNguonGioiThieu(idnguon,iduser){
    var idnguons=Math.floor(idnguon)
     axios.get('/index.php/api/nguongioithieudetail/'+idnguons).then(response => {
     

       document.getElementById("nguonuser"+iduser).innerHTML = response.data.nguon;
     })
     
   }
   getdanhsachtiensubenh(nhomtiensubenh,iduser){
  
    
    var nhom = {
      nhomtiensubenh: nhomtiensubenh
    }
  
  
    
  
   }
   handleFieldChangeKhuVuc (value) {
   

    console.log(value.value)
        this.setState({ khuvucselect: value,
        khuvuc: value.value
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
          let files = event.target.files || event.dataTransfer.files;
         if(!files.length)
             return;
           if(event.target.name == "anhdaidien")
           {
             this.createImageAnhDaiDien(event.target.files[0])
           }
           else if(event.target.name == "truocmatbefore")
           {
             this.createImageTruocMatBefore(event.target.files[0])
           }
           else if(event.target.name == "hamtrenbefore")
           {
             this.createImageHamTrenBefore(event.target.files[0])
           }
           else if(event.target.name == "hamduoibefore")
           {
             this.createImageHamDuoiBefore(event.target.files[0])
           }
           else if(event.target.name == "truocmatafter")
           {
             this.createImageTruocMatAfter(event.target.files[0])
           }
           else if(event.target.name == "hamtrenafter")
           {
             this.createImageHamTrenAfter(event.target.files[0])
           }
           else
           {
             this.createImageHamDuoiAfter(event.target.files[0])
           }
      
         
     }
     else
     {
       this.setState({
         ngaysinh: document.getElementById("date-range").value
       })
       this.setState({
         [event.target.name]: event.target.value
       })
     }
    
   }
   createImageHamDuoiBefore(file){
   
    var reader = new FileReader();

    reader.onload = (e) => {
        this.setState({
          hamduoibefore: e.target.result
        })
   }
   reader.readAsDataURL(file);
   
    
}
  createImageHamTrenBefore(file){
   
    var reader = new FileReader();

    reader.onload = (e) => {
        this.setState({
          hamtrenbefore: e.target.result
        })
   }
   reader.readAsDataURL(file);
   
    
}
createImageTruocMatBefore(file){
   
  var reader = new FileReader();

  reader.onload = (e) => {
      this.setState({
        truocmatbefore: e.target.result
      })
 }
 reader.readAsDataURL(file);
 
  
}
createImageHamDuoiAfter(file){
   
  var reader = new FileReader();

  reader.onload = (e) => {
      this.setState({
        hamduoiafter: e.target.result
      })
 }
 reader.readAsDataURL(file);
 
  
}
createImageHamTrenAfter(file){
 
  var reader = new FileReader();

  reader.onload = (e) => {
      this.setState({
        hamtrenafter: e.target.result
      })
 }
 reader.readAsDataURL(file);
 
  
}
createImageTruocMatAfter(file){
 
var reader = new FileReader();

reader.onload = (e) => {
    this.setState({
      truocmatafter: e.target.result
    })
}
reader.readAsDataURL(file);


}
createImageAnhDaiDien(file){
  var reader = new FileReader();

  reader.onload = (e) => {
      this.setState({
        anhdaidien: e.target.result
      })
 }
 reader.readAsDataURL(file);
}
   handleCreateThongTin (event)
   {
    event.preventDefault()

    const { history } = this.props
    var ns=document.getElementById("date-range").value
    if(ns==" ")
    {
        ns="1/1/1996"
    }
    const customers = {
      hoten: this.state.hoten,
      gioitinh: this.state.gioitinh,
      ngaysinh: ns,
      diachi: this.state.diachi,
      dienthoai: this.state.dienthoai,
      tiensubenh: this.state.tiensubenh,
      gioithieu: this.state.gioithieu,
      khuvuc: this.state.khuvuc,
      dichvudieutri: this.state.dichvudieutri,
      nguongioithieu: this.state.nguongioithieu,
      anhdaidien: this.state.anhdaidien,
      truocmatbefore: this.state.truocmatbefore,
      hamtrenbefore: this.state.hamtrenbefore,
      hamduoibefore: this.state.hamduoibefore,
      truocmatafter: this.state.truocmatafter,
      hamtrenafter: this.state.hamtrenafter,
      hamduoiafter: this.state.hamduoiafter,
      danhgia: this.state.danhgia,
      sosao: this.state.sosao,
      bacsidieutri: this.state.bacsidieutri,
      trangthai: this.state.trangthai
    }
    const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
    console.log(customers);
    
    axios.post('/index.php/api/customers', customers, headers)
      .then(response => {
        axios.get('/index.php/api/customers').then(response => {
          this.setState({
            khachhanglist: response.data
          })
          document.getElementById("taokhachhang").reset()
        })
        var button = document.getElementById('btn-end')
       
        button.click()
      }).catch(err => console.log(err));

   }
   handleUpdateThongTin (event) {
    event.preventDefault()

    const { history } = this.props

    const customers = {
        hoten: this.state.hoten,
        gioitinh: this.state.gioitinh,
        ngaysinh: this.state.ngaysinh,
        diachi: this.state.hoten,
        dienthoai: this.state.hoten,
        tiensubenh:this.state.hoten,
        gioithieu: this.state.hoten,
        dichvudieutri: this.state.hoten,
        nguongioithieu: this.state.hoten,
        danhgia: this.state.hoten,
        sosao: this.state.hoten,
        bacsidieutri: this.state.hoten,
        trangthai: this.state.trangthai,
        anhdaidien: this.state.anhdaidien,
        truocmatbefore: this.state.truocmatbefore,
        hamtrenbefore: this.state.hamtrenbefore,
        hamduoibefore: this.state.hamduoibefore,
        truocmatafter: this.state.truocmatafter,
        hamtrenafter: this.state.hamtrenafter,
        hamduoiafter: this.state.hamduoiafter
    }
    const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
    console.log(customers);

      
  }
  getchitietkhachhang(idkhachhang)
  {

   
    axios.get('/index.php/api/chitietkhachhang/'+idkhachhang).then(response => {
    
        console.log(response.data)
        document.getElementById("updatehoten").value=response.data.hoten
        document.getElementById("updatebacsidieutri").value=response.data.bacsidieutri
        var selectdv=document.getElementById("updatebacsidieutri").childNodes;
        for(var i = 0; i < selectdv.length; i++) {
          var datadv=selectdv[i].value;
          if(datadv==response.data.bacsidieutri)
          {
            selectdv[i].setAttribute('selected', true);
          }
         }
        document.getElementById("updategioitinh").value=response.data.gioitinh
        var selectgt=document.getElementById("updategioitinh").childNodes;
        for(var i = 0; i < selectgt.length; i++) {
          var datadv=selectgt[i].value;
          if(datadv==response.data.bacsidieutri)
          {
            selectdv[i].setAttribute('selected', true);
          }
         }
        document.getElementById("updatengaysinh").value=response.data.ngaysinh
  
        document.getElementById("updatediachi").value=response.data.diachi
        document.getElementById("updatedienthoai").value=response.data.dienthoai
        document.getElementById("updatenhucauthamkham").value=response.data.gioithieu
        document.getElementById("updateanhdaidien").src = './public/uploads/customer/'+response.data.anhdaidien;
        document.getElementById("updatetruocmatbefore").src = './public/uploads/customer/'+response.data.truocmatbefore;
        document.getElementById("updatehamtraibefore").src = './public/uploads/customer/'+response.data.hamtrenbefore;
        document.getElementById("updatehamphaibefore").src = './public/uploads/customer/'+response.data.hamduoibefore;
        document.getElementById("updatetruocmatafter").src = './public/uploads/customer/'+response.data.truocmatafter;
        document.getElementById("updatehamtraiafter").src = './public/uploads/customer/'+response.data.hamtrenafter;
        document.getElementById("updatehamphaiafter").src = './public/uploads/customer/'+response.data.hamduoiafter;
        document.getElementById("updategioitinh").value=response.data.gioitinh
        var selectgtt=document.getElementsByClassName("itemtiensubenh")
         var tiensubenh = response.data.tiensubenh.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '')
         var arraytiensubenh = tiensubenh.split(',');
      
         for(var i = 0; i < selectgtt.length; i++) {
           var datagt=selectgtt[i].value;
           for( var j=0; j < arraytiensubenh.length; j++)
           {
            if(datagt==arraytiensubenh[j])
            {
              selectgtt[j].setAttribute('checked', true);
            }
           }
        
          }
          
         var dichvudieutri=response.data.dichvudieutri.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '')
         var arraydichvudieutri = dichvudieutri.split(',');
         var selectptp=document.getElementsByClassName("dichvuitem")
         
         for(var i = 0; i < selectptp.length; i++) {
          var datagt=selectptp[i].value;
          for( var j=0; j < arraydichvudieutri.length; j++)
          {
           if(datagt==arraydichvudieutri[j])
           {
                selectptp[j].setAttribute('checked', true);
           }
          }
       
         }
         var nguongioithieu=response.data.nguongioithieu.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '')
         var arraynguongioithieu= nguongioithieu.split(',');
         var selectngt=document.getElementsByClassName("nguongioithieuitem")
         
         for(var i = 0; i < selectngt.length; i++) {
          var datagt=selectngt[i].value;
          for( var j=0; j < arraynguongioithieu.length; j++)
          {
           if(datagt==arraynguongioithieu[j])
           {
            selectngt[j].setAttribute('checked', true);
           }
          }
       
         }
         this.setState({
            idupdate: response.data.ID,
            hoten: response.data.hoten,
            gioitinh: response.data.gioitinh,
            ngaysinh: response.data.ngaysinh,
            diachi: response.data.hoten,
            dienthoai: response.data.hoten,
            tiensubenh: response.data.hoten,
            gioithieu: response.data.hoten,
            dichvudieutri: response.data.hoten,
            nguongioithieu: response.data.hoten,
            danhgia: response.data.hoten,
            sosao: response.data.hoten,
            bacsidieutri: response.data.hoten,
            trangthai: response.data.trangthai,
            anhdaidien: response.data.anhdaidien,
            truocmatbefore: response.data.truocmatbefore,
            hamtrenbefore: response.data.hamtrenbefore,
            hamduoibefore: response.data.hamduoibefore,
            truocmatafter: response.data.truocmatafter,
            hamtrenafter: response.data.hamtrenafter,
            hamduoiafter: response.data.hamduoiafter
        })
    })
  
  }
  getTenBacSi(idbacsi,idcol)
  {
    axios.get('/index.php/api/bacsitheoid/'+idbacsi).then(response => {
      document.getElementById("coltenbacsi"+idcol).innerHTML=response.data.ten
    })
  }
  getTrangThai(idtrangthai,idcol)
  {
   
   
 
  }
  handleBoLocKhachHang(event)
  {
    event.preventDefault()
    const boloc = {
      ngaytao: document.querySelector("input[name='ngaytao']").value,
      khoangngaytao: document.querySelector("input[name='khoangngaytao']").value,
     
    
      chuoicantim: this.state.chuoicantim,
 
    }
    const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
    console.log(boloc);
    axios.post('/index.php/api/bolockhachhang', boloc, headers)
    .then(response => {
      
        this.setState({
          khachhanglist: response.data
        })
     
        document.querySelector("input[name='khoangngaytao']").value=boloc["khoangngaytao"]
        if(boloc["khoangngaytao"]!=="")
        {
          document.getElementById("chonkhoangngaytao").checked = true;
          document.getElementById("chonngaytao").checked = false;
        }
    }).catch(err => console.log(err));
  }
  getdulieuxoa(event)
  {
    event.preventDefault()
    let idkh=event.target.attributes.getNamedItem('data-idkhachhang').value
    document.getElementById("btnxoadulieu").setAttribute("data-idkhachhang", idkh);
  }
  render () {
    
const { khachhanglist,khuvucselect } = this.state
const { nguongioithieulist } = this.state;
const { tiensubenhlist } = this.state;
const { dichvulist } = this.state;
const { bacsilist } = this.state;
    return (
        <div>
        <div className="row el-element-overlay">
    
        <form onSubmit={this.handleBoLocKhachHang} id="bolocthongtinkh" className="row col-md-12 m-b-40">
  <div className="row col-md-12 m-b-40">
  <div className="col-lg-6">
              <div className="row">
            

              <div className="col-lg-3">
              <div className="groupcheck grcfilter">
              
                <div className="radio checktablist">
                  <input type="radio" name="ngaytaochon" id="chonngaytao" checked/>
                  <label htmlFor="radionguon5"> Ngày tạo</label>
                </div>
                <div className="radio checktablist">
                  <input type="radio" name="ngaytaochon" id="chonkhoangngaytao" />
                  <label htmlFor="radionguon5"> Khoảng ngày tạo</label>
                </div>
              
            
            </div>
              </div>
              <div className="col-lg-9 mgau mgf">
              <div className="input-group" id="inputngaytao">
              <input type="text" className="form-control "  id="mydatepicker" name="ngaytao" autoComplete="off" placeholder="dd/mm/yyyy" onChange={this.handleFieldChange} />
              <span className="input-group-addon iccale"><i className="icon-calender" /></span>
           
              </div>
              <div className="input-group hidden" id="khoanngaydatao">
              <input className="form-control input-daterange-datepicker" type="text" autoComplete="off" name="khoangngaytao" value="" placeholder="mm/dd/yyyy - mm/dd/yyyy" onChange={this.handleFieldChange} />
              <span className="input-group-addon iccale"><i className="icon-calender" /></span>
           
              </div>
              </div>
              </div>
              <div className="row">
              <div className="col-lg-3 hidden">
              <div className="groupcheck">
              
                <div className="radio checktablist">
                  <input type="radio" name="chonthoigianhen" id="chonthoigianhen" checked/>
                  <label htmlFor="radionguon6">Thời gian hẹn</label>
                </div>
                <div className="radio checktablist">
                  <input type="radio" name="chonthoigianhen" id="chonthoigianhenkhoang" />
                  <label htmlFor="radionguon5">Khoảng ngày</label>
                </div>
              
            
            </div>
              </div>
              <div className="col-lg-9 mgau hidden">
              <div className="input-group" id="inputhenngay">
              <input type="text" className="form-control mydatepicker ipfilter" name="thoigianhen" autoComplete="off" placeholder="dd/mm/yyyy" onChange={this.handleFieldChange} />
              <span className="input-group-addon iccale"><i className="icon-calender" /></span>
              </div>
              <div className="input-group hidden" id="inputkhoangngayhen">
              <input className="form-control input-daterange-datepicker ipfilter"  value="" autoComplete="off" type="text" name="khoangngayhen" placeholder="mm/dd/yyyy - mm/dd/yyyy" defaultValue="" onChange={this.handleFieldChange} />
              <span className="input-group-addon iccale"><i className="icon-calender" /></span>
           
              </div>
              </div>
              </div>
        </div>
        <div className="col-lg-6">
              <div className="row grcfilters">
            
              <div className="col-lg-12">
              <div className="input-group">
              <input type="text" className="form-control ipfilter" name="chuoicantim" autoComplete="off" placeholder="Họ tên, Số điện thoại hoặc Mã khách hàng" onChange={this.handleFieldChange} />
             
              </div>
              </div>
              </div>
              <div className="row hidden">
            
              <div className="col-lg-12">
              <div className="input-group">
              <select className="form-control" name="trangthaidathen" onChange={this.handleFieldChange}>
              <option value="">Chọn trạng thái đặt hẹn</option>
              <option value="0">Đặt hẹn</option>
              <option value="1">Đã đến</option>
              <option value="2">Không đến</option>
              </select>
              </div>
              </div>
              </div>
        </div>
       
  
  </div>
  <div className="row col-md-12">
<div className="col-md-6">
<input type="submit" id="buttimkiem" className="btn btn-primary" value="Tìm kiếm"/>
</div>
<div className="col-md-6">

</div>
  </div>

      </form>
      
         
        </div>
        <div className="row">
                    <div className="col-lg-12">
                        <div className="white-box">
                            <h3 className="box-title m-b-0">Danh sách khách hàng <button className="btn btn-primary" onClick={this.handleReset}><i className="fa fa-refresh"></i></button></h3>
                            
                            <p className="text-muted m-b-20"></p>
                            <table className="table-bordered table-hover table tabletextsmall color-table primary-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>MSKH</th>
                                        <th>Hình đại diện khách</th>
                                        <th>Họ và tên</th>
                                        <th>Ngày sinh</th>
                                        <th>Ngày tạo hồ sơ</th>
                                        <th>Số điện thoại</th>
                                     
                                       
                                        <th>Khu vực</th>
                                       
                                        <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {khachhanglist.map((dv, index) => (
                                    <tr key={dv.ID}>
                                        <td><p>{index+1}</p></td>
                                        <td className="title">{dv.ID}</td>
                                        <td> <img src={'./public/uploads/customer/'+dv.anhdaidien}  width='70px' height='70px'/></td>
                                        <td ><Link to={'/ho-so-khach-hang/'+dv.ID} key={dv.ID} className="danhturieng btn" >{dv.hoten}</Link>
                                       
      
                                      
                                        </td>
                                        <td>{dv.ngaysinh}</td>
                                <td id={'nguonuser'+dv.ID}>{moment(dv.created_at).format("DD-MM-YYYY HH:mm:ss")}</td>
                                <td className="textsdt">{dv.dienthoai}</td>
                                     
                                       
                                        <td id={"coltenbacsi"+dv.ID}>{dv.khuvuc}</td>
                                        
                                     
                                      

                                    
                                       
                                        <td className="btnaction">
                                        {localStorage.getItem('userrole')==="1" ? <button onClick={this.getdulieuxoa} data-idkhachhang={dv.ID} data-toggle="modal" data-target="#xoakhachhang" data-whatever="@mdo" className="icon-list-demo btn btn-danger btn-circle btn-xl" >
                    <i className="fa fa-trash-o" data-idkhachhang={dv.ID}></i>
                  </button> :  <p></p>}
                                       
                 
                         </td>
                                    </tr>
                                    ))}
                                  
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
             
  <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog popmodalwidth" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Thêm Thông Tin Cơ Bản</h4> </div>
        <div className="modal-body">
        <form encType="multipart/form-data" autoComplete="off" id="taokhachhang" onSubmit={this.handleCreateThongTin} >
                  <div className="form-body">
                  
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Họ và tên</label>
                          <input name="hoten" type="text" id="hoten" className="form-control" 
                          onChange={this.handleFieldChange} placeholder="Nguyễn Văn" /> <span className="help-block"> </span> 
                       
                          </div>
                         
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Giới tính</label>
                          <select name="gioitinh" 
                          onChange={this.handleFieldChange} className="form-control">
							<option value="99" >Chọn giới tính</option>
                            <option value="1" >Nam</option>
                            <option value="0" checked>Nữ</option>
                          </select> </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Ngày sinh</label>
                          <input name="ngaysinh" 
                          onChange={this.handleFieldChange} type="text" id="date-range" className="form-control" placeholder="dd/mm/yyyy" /> </div>
                      </div>
                    </div>
                    {/*/row*/}
           
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Địa chỉ</label>
                          <input name="diachi" 
                          onChange={this.handleFieldChange} type="text" id="diachi" className="form-control" placeholder="Địa chỉ nhà" /> <span className="help-block"></span> </div>
                      </div>
                      <div className="col-md-4">
                  
           
                    <div className="form-group">
                          <label className="control-label">Khu vực</label>
                       
              <Select
                        isClearable
                        name="khuvuc"
                        id="khuvuc"
                      
                        onChange={value => this.handleFieldChangeKhuVuc(value)}
                        defaultValue={khuvucselect}
                        value={khuvucselect}
                        options={khuvucs}
                        className="basic-multi-select"
                  classNamePrefix="select"
                
                      />
                          </div>
                 
                       
                      </div>
                      {/*/span*/}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Điện thoại</label>
                          <input name="dienthoai" 
                          onChange={this.handleFieldChange} type="text" id="phone" className="form-control" placeholder="0989228480" /> <span className="help-block"></span> </div>
                      </div>
                      {/*/span*/}
                    </div>
                    {/*/row*/}
                    <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                          <label htmlFor="gioi-thieu-ex">Ghi chú</label>
    <textarea className="form-control" 
                          onChange={this.handleFieldChange} id="gioi-thieu-ex" rows="4" name="gioithieu"></textarea>
                          </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="control-label">Mã giới thiệu</label>
                          <input id="sosao" name="sosao" 
                          onChange={this.handleFieldChange} type="text" 
                          className="form-control" placeholder="Mã giới thiệu" /> </div>
                      </div>
                      {/*/span*/}
                     
                      {/*/span*/}
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                      <div className="form-group">
                          
                        
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <p className="box-title m-b-0">Tiền sử bệnh</p>
                        <ul className="icheck-list popupchecklist">
                          {tiensubenhlist.map(ts => (
 <li key={ts.id}>
 <input type="checkbox" name="tiensubenh" id={'flat-checkbox-'+ts.id} 
                          data-checkbox="icheckbox_flat-red" value={ ts.id } onChange={this.handleFieldChange} />
 <label htmlFor={'flat-checkbox-'+ts.id}>{ts.ten}</label>
</li>
       
    ))}
      </ul>
                      </div>
                          
                        </div>
                      </div>
                      {/*/span*/}
                     
                    
                      
                    </div>
            
                    <div className="row">
                      <div className="col-md-12">
                        <div className="m-b-20 m-t-20">
                          <p className="m-b-0">Ảnh đại diện </p>
                          <div className="fallback">
                            <input className="form-control" name="anhdaidien" accept="image/*" type="file" onChange={this.handleFieldChange} /> </div>
                        </div>
                      </div>
                    </div>
                  
                 
                 
                    {/*/row*/}
                    <hr />
                  </div>
                <div className="form-actions">
                <button type="button" id="btn-end" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
                  <button type="submit" className="btn btn-success"> <i className="fa fa-check" /> Lưu</button>

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
                                            <button id="btnxoadulieu" onClick={this.handleDeleteCustomer} type="button" className="btn btn-primary">Xóa</button>
    </div>
 
  </div>
</div>
</div>
      </div>
    )
  }
}

export default AllCustomer