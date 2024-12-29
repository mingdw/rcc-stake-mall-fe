import React,{FC} from "react";


const Home: FC = () => {
    return <>
       <div className="container-fluid p-t-15">
        <div className="row">
          <div className="col-md-6 col-xl-3">
            <div className="card bg-primary text-white">
              <div className="card-body clearfix">
                <div className="flex-box">
                  <span className="img-avatar img-avatar-48 bg-translucent"><i className="mdi mdi-currency-cny fs-22"></i></span>
                  <span className="fs-22 lh-22">4</span>
                </div>
                <div className="text-right">质押池数量</div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="card bg-danger text-white">
              <div className="card-body clearfix">
                <div className="flex-box">
                  <span className="img-avatar img-avatar-48 bg-translucent"><i className="mdi mdi-account fs-22"></i></span>
                  <span className="fs-22 lh-22">156</span>
                </div>
                <div className="text-right">用户总数</div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="card bg-success text-white">
              <div className="card-body clearfix">
                <div className="flex-box">
                  <span className="img-avatar img-avatar-48 bg-translucent"><i className="mdi mdi-currency-cny fs-22"></i></span>
                  <span className="fs-22 lh-22">34,005,000</span>
                </div>
                <div className="text-right">质押总金额</div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="card bg-purple text-white">
              <div className="card-body clearfix">
                <div className="flex-box">
                  <span className="img-avatar img-avatar-48 bg-translucent"><i className="mdi mdi-comment-outline fs-22"></i></span>
                  <span className="fs-22 lh-22">153</span>
                </div>
                <div className="text-right">总收益</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-8">
            <div className="row">
              <div className="col-12">
                <div className="card-group">
                  <div className="card col-4">
                    <div className="card-body">
                      <h5 className="card-title">
                        <strong>合约状态</strong>
                      </h5>
          
                      <p>
                        <span style={{fontSize:'12px',color:'gray'}}>
                          合约地址
                        </span>
                        <br/>
                        <span style={{fontSize:'14px',color:'black'}}>
                          <a href="#!">husw79Qzi81Hgsnu12jzq0MLaa75j4X</a>
                        </span>
                      </p>
                      <p>
                        <span style={{fontSize:'12px',color:'gray'}}>
                          版本
                        </span>
                        <br/>
                        <span style={{fontSize:'14px',color:'black'}} className="text-info">
                          V 1.0.0.1
                        </span>
                      </p>
          
                      <p>
                        <span style={{fontSize:'12px',color:'gray'}}>
                          ChanID
                        </span>
                        <br/>
                        <span style={{fontSize:'14px',color:'black'}} className="text-info">
                          1165511
                        </span>
                      </p>
                      <p>
                        <span style={{fontSize:'12px',color:'gray'}}>
                          部署时间
                        </span>
                        <br/>
                        <span style={{fontSize:'14px',color:'black'}} className="text-info">
                          2024-06-13
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="card col-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <strong>最近收益</strong>
                      </h5>
                      <div className="row">
                        <table className="table table-borderless table-hover">
                          <tbody>
                            <tr>
                              <td>
                                <span className="text-gray">Price</span>
                                <br/>
                                <span className="text-black" style={{fontSize:'16px'}}><strong>$3.7</strong></span> <span
                                      className="text-gray">USD</span>
                              </td>
                            
                              <td>
                                <span className="text-gray">Volumn 24h</span>
                                <br/>
                                <span className="text-black" style={{fontSize:'16px'}}><strong>$32.7M</strong></span> <span
                                  className="text-gray">USD</span>
                              </td>
                              <td>
                                <span className="text-gray">Market Cap</span>
                                <br/>
                                <span className="text-black" style={{fontSize:'16px'}}><strong>$32.7B</strong></span> <span
                                  className="text-gray">USD</span>
          
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span className="text-gray">Change 1h</span>
                                <br/>
                                <span className="text-danger" style={{fontSize:'16px'}}><strong>-0.28%</strong></span><i
                                  className="mdi mdi-arrow-down text-danger"></i>
                              </td>
                              <td>
                                <span className="text-gray">Change 24h</span>
                                <br/>
                                <span className="text-danger" style={{fontSize:'16px'}}> <strong>-2.75%</strong></span><i
                                  className="mdi mdi-arrow-down text-danger"></i>
                              </td>
                              <td>
                                <span className="text-gray">Change 7d</span>
                                <br/>
                                <span className="text-success" style={{fontSize:'16px'}}><strong>12.02%</strong></span><i
                                  className="mdi mdi-arrow-up text-success"></i>
                              </td>
                            </tr>
                          </tbody>
          
                        </table>
                      </div>
                      <div className="row row-5">
                        <canvas id="chart-line-4" width="100%" height="40%"></canvas>
                      </div>
                      <div className="row row-2">
                        <div className="col-5">
                          <span className="text-gray">历史总质押</span>
                          <br/>
                          <span className="text-black" style={{fontSize:'16px'}}><strong>17334,123,000 ETH</strong></span>
                        </div>
                        <div className="col-5">
          
                          <span className="text-gray">历史总收益</span>
                          <br/>
                          <span className="text-black" style={{fontSize:'16px'}}><strong>234,988,000 RC</strong></span>
                        </div>
          
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop:'20px'}}>
              <div className="col-12">
                <div className="card">
                  <header className="card-header">
                    <div className="card-title">
                      <label style={{fontSize:'20px',marginLeft:'0px'}}>
                        <strong>质押池</strong>
                      </label>
                    </div>
                    <div className="card-title">
                      <a style={{marginLeft:'0px'}} href="../pool/pool_index.html">
                        <span className="text-primary">查看更多</span>
                      </a>
                    </div>
                  </header>
        
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li className="media">
                        <img className="mr-3" data-src="holder.js/180x250" alt="180x250" src="../../asserts/images/login-bg-1.jpg"
                          data-holder-rendered="true" style={{width:'180px',height:'250px',borderRadius:'5px'}}/>
                        <div className="media-body">
                          <ul className="list-group">
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-6">
                                  <h5 className="mt-0 mb-1"><a href="!#">ETH质押池</a></h5>
                                </div>
                                <div className="col-6" style={{textAlign:'right'}}>
                                  <span className="text-gray">未开始</span>
                                </div>
                              </div>
                            </li>
        
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-4">
                                  目标金额：<span className="text-danger">2000,000</span>
                                </div>
                                <div className="col-4">
                                  已质押：<span className="text-danger">1020,000</span>
                                </div>
                                <div className="col-4">
                                  产生收益：<span className="text-danger">672,000</span>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-2">
                                  进&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：
                                </div>
                                <div className="col-8" style={{textAlign:'left'}}>
                                  <div className="progress" style={{height:'auto'}}>
                                    <div className="progress-bar" role="progressbar" style={{width:'25%'}} >25%</div>
                                  </div>
                                </div>
                                <div className="col-3">
        
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">开始时间：2024-12-01 11:00:00 </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-6">
                                  结束时间：2024-12-01 11:00:00
                                </div>
                                <div className="col-6" style={{textAlign:'right'}}>
                                  <a className="btn  btn-outline-info" href="#!">查看详情</a>
                                </div>
                              </div>
                            </li>
        
                          </ul>
                        </div>
                      </li>
        
                      <li className="media">
                        <img className="mr-3" data-src="holder.js/180x250" alt="180x250" src="../../asserts/images/login-bg-2.jpg"
                          data-holder-rendered="true" style={{width:'180px',height:'250px',borderRadius:'5px'}} />
                        <div className="media-body">
                          <ul className="list-group">
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-6">
                                  <h5 className="mt-0 mb-1"><a href="!#">USDT质押池</a></h5>
                                </div>
                                <div className="col-6" style={{textAlign:'right'}}>
                                  <span className="text-success">进行中</span>
                                </div>
                              </div>
                            </li>
        
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-4">
                                  目标金额：<span className="text-danger">3000,000</span>
                                </div>
                                <div className="col-4">
                                  已质押：<span className="text-danger">1020,000</span>
                                </div>
                                <div className="col-4">
                                  产生收益：<span className="text-danger">672,000</span>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-2">
                                  进&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：
                                </div>
                                <div className="col-8" style={{textAlign:'left'}}>
                                  <div className="progress" style={{height:'auto'}}>
                                    <div className="progress-bar bg-yellow" role="progressbar" style={{width:'55%'}}
                                    >25%</div>
                                  </div>
                                </div>
                                <div className="col-3">
        
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">开始时间：2024-12-01 11:00:00 </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-6">
                                  结束时间：2024-12-01 11:00:00
                                </div>
                                <div className="col-6" style={{textAlign:'right'}}>
                                  <a className="btn  btn-outline-info"  href="#!">查看详情</a>
                                </div>
                              </div>
                            </li>
        
                          </ul>
                        </div>
                      </li>
        
                      <li className="media">
                        <img className="mr-3" data-src="holder.js/180x250" alt="180x250" src="../../asserts/images/login-bg-3.jpg"
                          data-holder-rendered="true" style={{width:'180px',height:'250px',borderRadius:'5px'}} />
                        <div className="media-body">
                          <ul className="list-group">
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-6">
                                  <h5 className="mt-0 mb-1"><a href="!#">USDT质押池</a></h5>
                                </div>
                                <div className="col-6" style={{textAlign:'right'}}>
                                  <span className="text-danger">已结束</span>
                                </div>
                              </div>
                            </li>
        
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-4">
                                  目标金额：<span className="text-danger">3000,000</span>
                                </div>
                                <div className="col-4">
                                  已质押：<span className="text-danger">1020,000</span>
                                </div>
                                <div className="col-4">
                                  产生收益：<span className="text-danger">672,000</span>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-2 w-80">
                                  进&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：
                                </div>
                                <div className="col-8" style={{textAlign:'left'}}>
                                  <div className="progress" style={{height:'auto'}}>
                                    <div className="progress-bar bg-yellow" role="progressbar" style={{width:'55%'}}
                                    >25%</div>
                                  </div>
                                </div>
                                <div className="col-2">
        
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">开始时间：2024-12-01 11:00:00 </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-6">
                                  结束时间：2024-12-01 11:00:00
                                </div>
                                <div className="col-6" style={{textAlign:'right'}}>
                                  <a className="btn  btn-outline-info"  href="#!">查看详情</a>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
        
                  </div>
        
                </div>
              </div>
              
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <header className="card-header">
                    <div className="card-title">
                      <label style={{fontSize:'20px',marginLeft:'0px'}}>
                        <strong>最近交易</strong>
                      </label>
                    </div>
                    <div className="card-title">
                      <a style={{marginLeft:'0px'}} href="#!">
                        <span className="text-primary">查看更多</span>
                      </a>
                    </div>
                  </header>
        
                  <div className="card-body">
                    
                    <table className="table table-borderless table-hover">
                      <thead>
                        <tr>
                          <th>质押池</th>
                          <th>交易地址</th>
                          <th>日期</th>
                          <th>金额</th>
                          <th>类型</th>
                          <th>质押天数</th>
                          <th>收益</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>ETH质押池</td>
                          <td><a href="#!">dfe2L****2Axs</a></td>
                          <td>2024-12-10 12:12:43</td>
                          <td>0.4 ETH</td>
                          <td><span className="text-warning">质押</span></td>
                          <td></td>
                          <td><span className="text-danger"></span></td>
                        </tr>
                        <tr>
                          <td>BTC质押池</td>
                          <td><a href="#!">AOm2x****22Bn</a></td>
                          <td>2024-12-09 02:12:43</td>
                          <td>0.4 ETH</td>
                          <td><span className="text-success">解质押</span></td>
                          <td>12 天</td>
                          <td><span className="text-danger">25RC</span></td>
                        </tr>
                        <tr>
                          <td>BTC质押池</td>
                          <td><a href="#!">AOm2x****22Bn</a></td>
                          <td>2024-12-09 02:12:43</td>
                          <td>0.4 ETH</td>
                          <td><span className="text-success">解质押</span></td>
                          <td>12 天</td>
                          <td><span className="text-danger">25RC</span></td>
                        </tr>
                        <tr>
                          <td>BTC质押池</td>
                          <td><a href="#!">AOm2x****22Bn</a></td>
                          <td>2024-12-09 02:12:43</td>
                          <td>0.4 ETH</td>
                          <td><span className="text-success">解质押</span></td>
                          <td>12 天</td>
                          <td><span className="text-danger">25RC</span></td>
                        </tr>
                        <tr>
                          <td>BTC质押池</td>
                          <td><a href="#!">AOm2x****22Bn</a></td>
                          <td>2024-12-09 02:12:43</td>
                          <td>0.4 ETH</td>
                          <td><span className="text-success">解质押</span></td>
                          <td>12 天</td>
                          <td><span className="text-danger">25RC</span></td>
                        </tr>
                        <tr>
                          <td>BTC质押池</td>
                          <td><a href="#!">AOm2x****22Bn</a></td>
                          <td>2024-12-09 02:12:43</td>
                          <td>0.4 ETH</td>
                          <td><span className="text-success">解质押</span></td>
                          <td>12 天</td>
                          <td><span className="text-danger">25RC</span></td>
                        </tr>
                        <tr>
                          <td>BTC质押池</td>
                          <td><a href="#!">AOm2x****22Bn</a></td>
                          <td>2024-12-09 02:12:43</td>
                          <td>0.4 ETH</td>
                          <td><span className="text-success">解质押</span></td>
                          <td>12 天</td>
                          <td><span className="text-danger">25RC</span></td>
                        </tr>
                        <tr>
                          <td>BTC质押池</td>
                          <td><a href="#!">AOm2x****22Bn</a></td>
                          <td>2024-12-09 02:12:43</td>
                          <td>0.4 ETH</td>
                          <td><span className="text-success">解质押</span></td>
                          <td>12 天</td>
                          <td><span className="text-danger">25RC</span></td>
                        </tr>
                        <tr>
                          <td>BTC质押池</td>
                          <td><a href="#!">AOm2x****22Bn</a></td>
                          <td>2024-12-09 02:12:43</td>
                          <td>0.4 ETH</td>
                          <td><span className="text-success">解质押</span></td>
                          <td>12 天</td>
                          <td><span className="text-danger">25RC</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
        
                </div>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-1"> 
                    <i className="mdi mdi-alert-outline mdi-48px text-warning"></i>
                  </div>
                  <div className="col-10"> 
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <span className="text-danger">风险提示： </span>防范以“虚拟货币”“区块链”名义进行非法集资的风险
                          <div style={{float:'right',marginTop:'10px'}}>
                            <span style={{color:'#1383C6'}}> <a href="#!"></a>——银保监会等五部门</span>
                          </div>
                      </li>
                      <li className="list-group-item">
                        <span className="text-danger">免责声明：</span>本站数据，合约地址以及相关源码仅在测试链使用，并且全部开源，本站不做任何盈利行为，仅供交流使用。任何人和组织不得以本项目从事非法行为，否则一切后果与本站无关
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{textAlign:'left'}}>
                  <strong>每周收益榜</strong>
                </h5>
                <div className="col" style={{textAlign:'left'}}>
                  <table className="table table-borderless table-hover">
                      <thead>
                        <tr>
                          <th>排行</th>
                          <th>账户</th>
                          <th>收益</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span className="badge badge-danger badge-pill">1</span></td>
                          <td>asdf****1d3A</td>
                          <td><span className="text-danger">25 RC</span></td>
                        </tr>
                        <tr>
                          <td><span className="badge badge-warning badge-pill">2</span></td>
                          <td>Bgfx****iu7M</td>
                          <td><span className="text-warning">24 RC</span></td>
                        </tr>
                        <tr>
                          <td><span className="badge badge-success badge-pill">3</span></td>
                          <td>H8ss****50Bs</td>
                          <td><span className="text-success">20 RC</span></td>
                        </tr>
                        <tr>
                          <td><span className="badge badge-secondary badge-pill">4</span></td>
                          <td>H8ss****50Bs</td>
                          <td>19 RC</td>
                        </tr>
                        <tr>
                          <td><span className="badge badge-secondary badge-pill">5</span></td>
                          <td>H8ss****50Bs</td>
                          <td>19 RC</td>
                        </tr>
                        <tr>
                          <td><span className="badge badge-secondary badge-pill">6</span></td>
                          <td>H8ss****50Bs</td>
                          <td>19 RC</td>
                        </tr>
                        <tr>
                          <td><span className="badge badge-secondary badge-pill">7</span></td>
                          <td>H8ss****50Bs</td>
                          <td>19 RC</td>
                        </tr>
                        <tr>
                          <td><span className="badge badge-secondary badge-pill">8</span></td>
                          <td>H8ss****50Bs</td>
                          <td>19 RC</td>
                        </tr>
                        <tr>
                          <td><span className="badge badge-secondary badge-pill">9</span></td>
                          <td>H8ss****50Bs</td>
                          <td>19 RC</td>
                        </tr>
                        <tr>
                          <td><span className="badge badge-secondary badge-pill">10</span></td>
                          <td>H8ss****50Bs</td>
                          <td>19 RC</td>
                        </tr>
                      </tbody>
                  </table>
                </div>
              
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{textAlign:'left'}}>
                  <strong>热门标签</strong>
                </h5>
                <div className="col w-80" style={{textAlign:'left',fontSize:'18px',padding:'5px'}}>
                  <table className="table table-borderless">
                    <tr>
                      <td><a href="#!" className="badge badge-pill badge-success">进行中</a></td>
                      <td><a href="#!" className="badge badge-pill badge-warning">人数最多</a></td>
                      <td><a href="#!" className="badge badge-pill badge-danger">收益最高</a></td>
                      <td><a href="#!" className="badge badge-pill badge-dark">已结束</a></td>
                    </tr>
                    <tr>
                      <td><a href="#!" className="badge badge-pill badge-secondary">未开始</a></td>
                      <td><a href="#!" className="badge badge-pill badge-purple">ETH</a></td>
                      <td><a href="#!" className="badge badge-pill badge-info">USDT</a></td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{textAlign:'left'}}>
                  <strong>常见问题</strong>
                </h5>
                <div className="col w-80" style={{textAlign:'left',fontSize:'14px'}}>
                  <ul className="list-group list-group-flush p-t-5">
                  <li className="list-group-item">
                    <a href="#!"><span className="text-black">1. 什么是代币质押？</span></a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!">2. 如何获取收益？</a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!">3. 中途退出怎么办？</a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!">4. 质押的代币有风险吗？</a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!">5. 收益计算规则？</a>
                  </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
              <h5 className="card-title" style={{textAlign:'left'}}>
                <strong>联系我们</strong>
              </h5>
              <div className="col w-80" style={{textAlign:'left',fontSize:'16px'}} >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <a href="#!"><span className="img-avatar img-avatar-48 bg-translucent text-warning"><i className="mdi mdi-qqchat fs-22"></i>&nbsp;&nbsp;&nbsp;466830255</span></a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!"><span className="img-avatar img-avatar-48 bg-translucent text-warning"><i className="mdi mdi-wechat fs-22"></i>&nbsp;&nbsp;&nbsp;mingdong1129</span></a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!"> <span className="img-avatar img-avatar-48 bg-translucent text-warning"><i className="mdi mdi-cellphone fs-22"></i>&nbsp;&nbsp;&nbsp;18710181258</span></a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!"> <span className="img-avatar img-avatar-48 bg-translucent text-warning"><i className="mdi mdi-email-outline fs-22"></i>&nbsp;&nbsp;&nbsp;7023302@qq.com</span></a>
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
          </div>
        </div>
       </div>
    </>
}

export default Home