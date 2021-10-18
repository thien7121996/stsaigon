import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class TaiKhoan extends Component {
  constructor () {
    super()

    this.state = {
        taikhoan: [],
        danhsachrole: [],
        name:'',
        email:'',
        password:'',
        role:'',
        idkh: 0,
        updateid:''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewTaiKhoan  = this.handleCreateNewTaiKhoan.bind(this)
    this.handleDeleteTaiKhoan  = this.handleDeleteTaiKhoan.bind(this)
    this.handleChiTietTaiKhoan  = this.handleChiTietTaiKhoan.bind(this)
    this.handleUpdateTaiKhoan = this.handleUpdateTaiKhoan.bind(this)


  }
  componentWillMount() {
    const scripts = [
      './app_assets/js/datatable/custom.js',
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
    axios.get('/index.php/api/danhsachtaikhoan').then(response => {
        this.setState({
          taikhoan: response.data
        })
      })
      axios.get('/index.php/api/danhsachrole').then(response => {
        this.setState({
          danhsachrole: response.data
        })
      }) 
  }
  componentDidMount() {
   
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
      this.setState({
        [event.target.name]: event.target.value
      })
      
    }
   
  }
  
  handleCreateNewTaiKhoan (event) {
    event.preventDefault()

    const { history } = this.props

    const taikhoan = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    }
    console.log(taikhoan);
    axios.post('/index.php/api/taotaikhoan', taikhoan)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/danhsachtaikhoan').then(response => {
            this.setState({
                taikhoan: response.data
            })
          })
        var button = document.getElementById('btn-end')
        button.click()
        document.getElementsByClassName("form-control").value = ""
        
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
  }
  handleDeleteTaiKhoan(event)
  {
      event.preventDefault()
      let idtaikhoan=event.target.attributes.getNamedItem('data-idtaikhoan').value

      axios.get('/index.php/api/taikhoandelete/'+idtaikhoan)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/danhsachtaikhoan').then(response => {
            this.setState({
                taikhoan: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietTaiKhoan(event)
  {
    event.preventDefault()
    
    let idpc=event.target.attributes.getNamedItem('data-idtaikhoan').value
    axios.get('/index.php/api/chitiettaikhoan/'+idpc).then(response => {
 
      document.getElementById("updatename").value = response.data["name"]
      document.getElementById("updateemail").value = response.data["email"]
      document.getElementById("updaterole").value = response.data["role"]
     
      var selectdv=document.getElementById("updaterole").childNodes;
      for(var i = 0; i < selectdv.length; i++) {
        var datadv=selectdv[i].value;
        if(datadv==response.data["role"])
        {
          selectdv[i].setAttribute('selected', true);
        }
       }
      document.getElementById("updateid").value = response.data["id"]

      this.setState({
        name: response.data["name"],
        email: response.data["email"],
        role: response.data["role"],
        updateid: response.data["id"]
      })
    })
  }
  handleUpdateTaiKhoan(event)
  {
    event.preventDefault()
     const taikhoanupdate = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
      }
      console.log(taikhoanupdate);
      axios.post('/index.php/api/updatetaikhoan/'+this.state.updateid,taikhoanupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/danhsachtaikhoan').then(response => {
            this.setState({
              taikhoan: response.data
            })
          })
          var button = document.getElementById('btn-ends')
          button.click()
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-ends')
        button.click()
      })
      
    
  }
  
render () {
const { taikhoan,danhsachrole } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách tài khoản
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã tài khoản</th>
              <th>Tài khoản</th>
              <th>Email</th>
             
              <th>Role</th>
             <th>Mã role</th>
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
        
          <tbody>
          {taikhoan.map((cd,index) => ( 
            <tr id={"taikhoanitem"+cd.id} data-itemcd={cd.id}>
              <td data-icd={cd.id}>{index+1}</td>
              <td data-icd={cd.id}>{cd.id}</td>
              <td data-icd={cd.id}>{cd.name}</td>
             
              <td data-icd={cd.id}>{cd.email}</td>
              <td data-icd={cd.id}>{cd.roles["role"]}</td>
              <td data-icd={cd.id}>{cd.roles["id"]}</td>
              <td className="btnaction"><button onClick={this.handleChiTietTaiKhoan} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idtaikhoan={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idtaikhoan={cd.id}></i></button></td>
             
            </tr>
          ))}
            
          </tbody>
        </table>
      </div>
    
  </div>
</div>
      </div>
    </div>
    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Tạo tài khoản</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewTaiKhoan}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên tài khoản</label>
              <input type="text" className="form-control" name="name" id="recipient-name1" onChange={this.handleFieldChange} /> 
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Email</label>
              <input type="text" className="form-control" name="email" id="recipient-name1" onChange={this.handleFieldChange} /> 
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Mật khẩu</label>
              <input type="text" className="form-control" name="password" id="recipient-name1" onChange={this.handleFieldChange} /> 
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Role</label>
              <select className="form-control" name="role" id="role" onChange={this.handleFieldChange}>
                        <option value="">Chọn quyền</option>
                        {danhsachrole.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.role}</option>
                        ))}
                          
                         
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
  <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Tài Khoản</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateTaiKhoan}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên tài khoản</label>
              <input type="text" className="form-control" name="name" id="updatename" onChange={this.handleFieldChange} /> 
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Email</label>
              <input type="text" className="form-control" name="email" id="updateemail" onChange={this.handleFieldChange} /> 
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Password</label>
              <input type="text" className="form-control" name="password" id="updatepassword" placeholder="Nếu không thay đổi thì bỏ trống" onChange={this.handleFieldChange} /> 
            </div>
            
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Role</label>
              <select className="form-control" name="role" id="updaterole" onChange={this.handleFieldChange}>
                        <option value="">Chọn quyền</option>
                        {danhsachrole.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.role}</option>
                        ))}
                          
                         
                    </select>
              
            </div>
            <div className="form-group hidden">
              <label htmlFor="message-text"  className="control-label">ID:</label>
              <input className="form-control" id="updateid" name="updateid" onChange={this.handleFieldChange} />
            </div>
            <div className="modal-footer">
          <button type="button" id="btn-ends" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
          <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
        </div>
          </form>
        </div>
       
      </div>
    </div>
  </div>
  </div>
  )
}
}

export default TaiKhoan