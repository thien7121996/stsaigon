import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class SideBarMain extends Component {
  constructor () {
    super()
    this.state = {
      iduser: localStorage.getItem('userid'),
      usercurrent: []
    
  }
  this.handleOpenmenu = this.handleOpenmenu.bind(this)
}
  componentWillMount(){
    
    axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
      console.log(response.data)
      this.setState({
        usercurrent: response.data
      })
    })
    const scripts = [
      './public/app_assets/js/datatable/menu.js',
    
  ];
  const scripttag = document.getElementById("tagscripts");
  scripttag.innerHTML = '';
  scripts.forEach(s => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = s;
    script.async = false
    scripttag.appendChild(script);
  })
  }
 
  componentDidMount() {
    const scripts = [
      './public/app_assets/js/datatable/menu.js',
    
  ];
  const scripttag = document.getElementById("tagscripts");
  scripttag.innerHTML = '';
  scripts.forEach(s => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = s;
    script.async = false
    scripttag.appendChild(script);
  })

 
  }
  handleOpenmenu(e)
  {
    e.preventDefault()
    var element = document.getElementsByClassName("nav-second-level")
    for(var erm=0;erm<element.length;erm++)
    {
      element[erm].classList.remove("openmenu")
    }
   
    e.target.parentNode.querySelector('.nav-second-level').classList.add("openmenu")

  }
render(){
  const { iduser,usercurrent } = this.state
  return(
    <div className="navbar-default sidebar" role="navigation">
    <div className="sidebar-nav navbar-collapse slimscrollsidebar">
    {(() => {
            if (usercurrent.role==="1") {
              return (
                <ul className="nav" id="side-menu">
                <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                  {/* input-group */}
                  <div className="input-group custom-search-form">
                    <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                      <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                    </span> </div>
                  {/* /input-group */}
                </li>
                <li className="user-pro">
                <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                  </a>
                
                </li>
                <li className="nav-small-cap m-t-10">--- Menu Ch??nh</li>
              
                <li> <Link to='/tat-ca-khach-hang' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Kh??ch h??ng </span></Link>
             
                </li>
              
                <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> L???ch h???n</span></Link>
                 
                 </li>
                 <li> <Link to='/hoa-hong-bac-si' className="waves-effect"><i className="ti-money p-r-10" /> <span className="hide-menu"> Hoa h???ng b??c s??</span></Link>
                 
                 </li>
                 <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Doanh thu<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                 <li> <Link to='/tong-quan-theo-thang'>Doanh thu theo th??ng</Link> </li>
                        <li> <Link to='/tong-quan'>Doanh thu t???ng quan</Link></li>
                        <li> <Link to='/doanh-thu-bac-si'>Doanh thu b??c s??</Link></li>   
                          
                          </ul>
                 </li>
                      
                        
                        
                        <li> <a href="#" onClick={this.handleOpenmenu}  className="waves-effect"><i className="ti-rss-alt p-r-10" /> <span className="hide-menu">Qu???ng c??o<span className="fa arrow" /></span></a> 
                        <ul className="nav nav-second-level">
                            
                            <li> <Link to='/quang-cao'>Qu???ng c??o</Link> </li>
                            <li> <Link to='/bieu-do-quang-cao'>Bi???u ????? t???ng quan</Link> </li>
                          </ul>
                        </li>
                        <li> <a href="#" onClick={this.handleOpenmenu}  className="waves-effect" aria-expanded="false"><i className="ti-dashboard p-r-10" /> <span className="hide-menu">Thi???t l???p h??? th???ng<span className="fa arrow" /></span></a> 
                        <ul className="nav nav-second-level collapse in" aria-expanded="false">
                       
                        
                        <li> <Link to='/thiet-lap-chan-doan'>Thi???t l???p b???nh l??</Link></li>
                            <li> <Link to='/thiet-lap-dich-vu'>Thi???t l???p d???ch v???</Link> </li>
                            <li> <Link to='/thiet-lap-dieu-tri'>Thi???t l???p ??i???u tr???</Link> </li>
                          
                           
                            <li> <Link to='/thiet-lap-nguon-gioi-thieu'>Thi???t l???p gi???i thi???u</Link></li>
                            <li> <Link to='/thiet-lap-tien-su-benh'>Thi???t l???p ti???n s??? b???nh</Link></li>
                            <li> <Link to='/loai-quang-cao'>Lo???i qu???ng c??o</Link></li>
                            <li> <Link to='/san-pham-quang-cao'>S???n ph???m qu???ng c??o</Link> </li>
                            <li> <Link to='/cap-do'>Thi???t l???p c???p ?????</Link></li>
                            <li> <Link to='/tat-ca-bac-si'>B??c s??</Link> </li>
                            <li> <Link to='/lich-su-chinh-sua'>L???ch s??? ch???nh s???a</Link></li>
                            <li> <Link to='/tai-khoan'>T??i kho???n</Link> </li>
                            <li> <Link to='/role'>Role</Link> </li>
                          </ul>
                        </li>
                
              
              </ul>
              )
              }
              else if (usercurrent.role==="3") {
                return (
                  <ul className="nav" id="side-menu">
                  <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                    {/* input-group */}
                    <div className="input-group custom-search-form">
                      <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                        <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                      </span> </div>
                    {/* /input-group */}
                  </li>
                  <li className="user-pro">
                  <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                    </a>
                  
                  </li>
                  <li className="nav-small-cap m-t-10">--- Menu Ch??nh</li>
                
             
                  <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> L???ch h???n</span></Link>
                   
                   </li>
                   <li> <Link to='/doanh-thu-bac-si' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu">Doanh thu b??c s??</span></Link>
                   
                   </li>
                  
                   <li> <Link to='/hoa-hong-theo-bac-si' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> B??o c??o hoa h???ng</span></Link>
                   
                   </li>
                      
                      
                    
                  
                
                </ul>
                )
                }
                else if (usercurrent.role==="2") {
                  return (
                    <ul className="nav" id="side-menu">
                    <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                      {/* input-group */}
                      <div className="input-group custom-search-form">
                        <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                          <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                        </span> </div>
                      {/* /input-group */}
                    </li>
                    <li className="user-pro">
                    <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                      </a>
                    
                    </li>
                    <li className="nav-small-cap m-t-10">--- Menu Ch??nh</li>
                  
                    <li> <Link to='/tat-ca-khach-hang' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Kh??ch h??ng </span></Link></li>
                    <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> L???ch h???n</span></Link>
                     
                     </li>
                    
                     <li> <Link to='/hoa-hong-bac-si' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> Hoa h???ng b??c s??</span></Link>
                     
                     </li>
                        
                     <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Doanh thu<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                 <li> <Link to='/tong-quan-theo-thang'>Doanh thu theo th??ng</Link> </li>
                        <li> <Link to='/tong-quan'>Doanh thu t???ng quan</Link></li>
                        <li> <Link to='/doanh-thu-bac-si'>Doanh thu b??c s??</Link></li>   
                          
                          </ul>
                 </li>
                     <li> <a href="#" onClick={this.handleOpenmenu}  className="waves-effect"><i className="ti-rss-alt p-r-10" /> <span className="hide-menu">Qu???ng c??o<span className="fa arrow" /></span></a> 
                        <ul className="nav nav-second-level">
                            
                            <li> <Link to='/quang-cao'>Qu???ng c??o</Link> </li>
                            <li> <Link to='/bieu-do-quang-cao'>Bi???u ????? t???ng quan</Link> </li>
                          </ul>
                        </li>
                    
                  
                  </ul>
                  )
                  }
                  else if (usercurrent.role==="4") {
                    return (
                      <ul className="nav" id="side-menu">
                      <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                        {/* input-group */}
                        <div className="input-group custom-search-form">
                          <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                            <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                          </span> </div>
                        {/* /input-group */}
                      </li>
                      <li className="user-pro">
                      <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                        </a>
                      
                      </li>
                      <li className="nav-small-cap m-t-10">--- Menu Ch??nh</li>
                      <li> <Link to='/tat-ca-khach-hang' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Kh??ch h??ng </span></Link>
             
             </li>
                 
                      <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> L???ch h???n</span></Link>
                       
                       </li>
                      
                     
                          
                          
                        
                      
                    
                    </ul>
                    )
                    }
              else
              {
                return(
                  <ul className="nav" id="side-menu">
                  <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                    {/* input-group */}
                    <div className="input-group custom-search-form">
                      <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                        <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                      </span> </div>
                    {/* /input-group */}
                  </li>
                  <li className="user-pro">
                  <a href='#' className="waves-effect"><img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" className="img-circle" /> <span className="hide-menu">{usercurrent.name}<span className="" /></span>
                    </a>
                  
                  </li>
                  <li className="nav-small-cap m-t-10">--- Menu Ch??nh</li>
                  <li> <Link to='/tat-ca-khach-hang' className="waves-effect"><i className="icon-people p-r-10" /> <span className="hide-menu"> Kh??ch h??ng </span></Link>
             
             </li>
             <li> <Link to='/lich-hen-tong' className="waves-effect"><i className="fa fa-user-md p-r-10" /> <span className="hide-menu"> L???ch h???n</span></Link>
                   
                   </li>
                  <li> <a href="#" onClick={this.handleOpenmenu} className="" aria-expanded="false"><i className="ti-server p-r-10" /> <span className="hide-menu">Doanh thu<span className="fa arrow" /></span></a> 
                 <ul className="nav nav-second-level">
                 <li> <Link to='/tong-quan-theo-thang'>Doanh thu theo th??ng</Link> </li>
                        <li> <Link to='/tong-quan'>Doanh thu t???ng quan</Link></li>
                        <li> <Link to='/doanh-thu-bac-si'>Doanh thu b??c s??</Link></li>   
                          
                          </ul>
                 </li>
                 <li> <a href="#" onClick={this.handleOpenmenu}  className="waves-effect"><i className="ti-rss-alt p-r-10" /> <span className="hide-menu">Qu???ng c??o<span className="fa arrow" /></span></a> 
                        <ul className="nav nav-second-level">
                            
                            <li> <Link to='/quang-cao'>Qu???ng c??o</Link> </li>
                            <li> <Link to='/bieu-do-quang-cao'>Bi???u ????? t???ng quan</Link> </li>
                          </ul>
                        </li>
                        <li> <a href="#" onClick={this.handleOpenmenu}  className="waves-effect" aria-expanded="false"><i className="ti-dashboard p-r-10" /> <span className="hide-menu">Thi???t l???p h??? th???ng<span className="fa arrow" /></span></a> 
                        <ul className="nav nav-second-level collapse in" aria-expanded="false">
                       
                        
                        <li> <Link to='/thiet-lap-chan-doan'>Thi???t l???p b???nh l??</Link></li>
                            <li> <Link to='/thiet-lap-dich-vu'>Thi???t l???p d???ch v???</Link> </li>
                            <li> <Link to='/thiet-lap-dieu-tri'>Thi???t l???p ??i???u tr???</Link> </li>
                          
                           
                            <li> <Link to='/thiet-lap-nguon-gioi-thieu'>Thi???t l???p gi???i thi???u</Link></li>
                            <li> <Link to='/thiet-lap-tien-su-benh'>Thi???t l???p ti???n s??? b???nh</Link></li>
                            <li> <Link to='/loai-quang-cao'>Lo???i qu???ng c??o</Link></li>
                            <li> <Link to='/san-pham-quang-cao'>S???n ph???m qu???ng c??o</Link> </li>
                          
                            <li> <Link to='/tat-ca-bac-si'>B??c s??</Link> </li>
                        
                          
                          </ul>
                        </li>
                        
                   
                      
                    
                  
                
                </ul>
                )
              }
          })()}
 
    </div>
  </div>
  )
}
}
       
      
    

    export default SideBarMain