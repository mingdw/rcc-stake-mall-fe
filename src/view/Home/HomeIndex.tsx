import React,{FC} from "react";
import {ArrowDownOutlined, ArrowUpOutlined, DollarCircleOutlined, FieldNumberOutlined, GiftOutlined, MailOutlined, PhoneOutlined, QqOutlined,UserOutlined,WarningOutlined,WechatOutlined} from '@ant-design/icons';
import { useTranslation  } from 'react-i18next';


const Home: FC = () => {
  const {t, i18n } = useTranslation();

    return <>
       <div className="container-fluid p-t-15">
        <div className="row">
          <div className="col-md-6 col-xl-3">
            <div className="card bg-primary text-white">
              <div className="card-body clearfix">
                <div className="flex-box">
                  <span className="img-avatar img-avatar-48 bg-translucent"><FieldNumberOutlined style={{fontSize:'24px'}}/></span>
                  <span className="fs-22 lh-22">4</span>
                </div>
                <div className="text-right">{t('body.stat.poolSize')}</div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="card bg-danger text-white">
              <div className="card-body clearfix">
                <div className="flex-box">
                  <span className="img-avatar img-avatar-48 bg-translucent"><UserOutlined style={{fontSize:'24px'}}/></span>
                  <span className="fs-22 lh-22">156</span>
                </div>
                <div className="text-right">{t('body.stat.users')}</div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="card bg-success text-white">
              <div className="card-body clearfix">
                <div className="flex-box">
                  <span className="img-avatar img-avatar-48 bg-translucent"><DollarCircleOutlined style={{fontSize:'24px'}} /></span>
                  <span className="fs-22 lh-22">34,005,000</span>
                </div>
                <div className="text-right">{t('body.stat.totalAmount')}</div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="card bg-purple text-white">
              <div className="card-body clearfix">
                <div className="flex-box">
                  <span className="img-avatar img-avatar-48 bg-translucent"><GiftOutlined style={{fontSize:'24px'}}/></span>
                  <span className="fs-22 lh-22">153</span>
                </div>
                <div className="text-right">{t('body.stat.totalPrize')}</div>
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
                        <strong>{t('body.contract.status')}</strong>
                      </h5>
          
                      <p>
                        <span style={{fontSize:'12px',color:'gray'}}>
                        {t('body.contract.address')}
                        </span>
                        <br/>
                        <span style={{fontSize:'14px',color:'black'}}>
                          <a href="#!">husw79Qzi81Hgsnu12jzq0MLaa75j4X</a>
                        </span>
                      </p>
                      <p>
                        <span style={{fontSize:'12px',color:'gray'}}>
                        {t('body.contract.version')}
                        </span>
                        <br/>
                        <span style={{fontSize:'14px',color:'black'}} className="text-info">
                          V 1.0.0.1
                        </span>
                      </p>
          
                      <p>
                        <span style={{fontSize:'12px',color:'gray'}}>
                        {t('body.contract.chaninID')}
                        </span>
                        <br/>
                        <span style={{fontSize:'14px',color:'black'}} className="text-info">
                          1165511
                        </span>
                      </p>
                      <p>
                        <span style={{fontSize:'12px',color:'gray'}}>
                        {t('body.contract.pubtime')}
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
                        <strong>{t('body.prize.name')}</strong>
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
                                <span className="text-success" style={{fontSize:'16px'}}><strong>-0.28%</strong></span><ArrowDownOutlined style={{color:'#15C377'}}/>
                              </td>
                              <td>
                                <span className="text-gray">Change 24h</span>
                                <br/>
                                <span className="text-success" style={{fontSize:'16px'}}> <strong>-2.75%</strong></span><ArrowDownOutlined  style={{color:'#15C377'}} />
                              </td>
                              <td>
                                <span className="text-gray">Change 7d</span>
                                <br/>
                                <span className="text-danger" style={{fontSize:'16px'}}><strong>12.02%</strong></span><ArrowUpOutlined style={{color:'#F76767'}}/>
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
                          <span className="text-gray">{t('body.prize.history.total.pledge')}</span>
                          <br/>
                          <span className="text-black" style={{fontSize:'16px'}}><strong>17334,123,000 ETH</strong></span>
                        </div>
                        <div className="col-5">
          
                          <span className="text-gray">{t('body.prize.history.total.prize')}</span>
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
                        <strong>{t('body.pledge.pool.name')}</strong>
                      </label>
                    </div>
                    <div className="card-title">
                      <a style={{marginLeft:'0px'}} href="../pool/pool_index.html">
                        <span className="text-primary">{t('body.pledge.pool.view.more')}</span>
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
                                {t('body.pledge.pool.target.amount')}：<span className="text-danger">2000,000</span>
                                </div>
                                <div className="col-4">
                                {t('body.pledge.pool.pledged.amount')}：<span className="text-danger">1020,000</span>
                                </div>
                                <div className="col-4">
                                {t('body.pledge.pool.prize.amount')}：<span className="text-danger">672,000</span>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-2">
                                  {t('body.pledge.pool.prograss')}：
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
                            <li className="list-group-item">{t('body.pledge.pool.startTime')}：2024-12-01 11:00:00 </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-6">
                                {t('body.pledge.pool.endTime')}：2024-12-01 11:00:00
                                </div>
                                <div className="col-6" style={{textAlign:'right'}}>
                                  <a className="btn  btn-outline-info" href="#!">{t('body.pledge.pool.view.details')}</a>
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
                                {t('body.pledge.pool.target.amount')}: <span className="text-danger">3000,000</span>
                                </div>
                                <div className="col-4">
                                {t('body.pledge.pool.pledged.amount')}：<span className="text-danger">1020,000</span>
                                </div>
                                <div className="col-4">
                                {t('body.pledge.pool.prize.amount')}：<span className="text-danger">672,000</span>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-2">
                                {t('body.pledge.pool.prograss')}：
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
                            <li className="list-group-item">{t('body.pledge.pool.startTime')}：2024-12-01 11:00:00 </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-6">
                                {t('body.pledge.pool.endTime')}：2024-12-01 11:00:00
                                </div>
                                <div className="col-6" style={{textAlign:'right'}}>
                                  <a className="btn  btn-outline-info"  href="#!">{t('body.pledge.pool.view.details')}</a>
                                </div>
                              </div>
                            </li>
        
                          </ul>
                        </div>
                      </li>
        
                      <li className="media">
                        <img className="mr-3" data-src="holder.js/180x250" alt="180x250" src="../assets/images/login-bg-3.jpg"
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
                                  {t('body.pledge.pool.target.amount')}：<span className="text-danger">3000,000</span>
                                </div>
                                <div className="col-4">
                                  {t('body.pledge.pool.pledged.amount')}：<span className="text-danger">1020,000</span>
                                </div>
                                <div className="col-4">
                                {t('body.pledge.pool.prize.amount')}：<span className="text-danger">672,000</span>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-2 w-80">
                                {t('body.pledge.pool.prograss')}：
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
                            <li className="list-group-item"> {t('body.pledge.pool.startTime')}：2024-12-01 11:00:00 </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-6">
                                {t('body.pledge.pool.endTime')}：2024-12-01 11:00:00
                                </div>
                                <div className="col-6" style={{textAlign:'right'}}>
                                  <a className="btn  btn-outline-info"  href="#!"> {t('body.pledge.pool.view.details')}</a>
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
                        <strong> {t('body.transaction.name')}</strong>
                      </label>
                    </div>
                    <div className="card-title">
                      <a style={{marginLeft:'0px'}} href="#!">
                        <span className="text-primary">{t('body.transaction.button.view.more')}</span>
                      </a>
                    </div>
                  </header>
        
                  <div className="card-body">
                    
                    <table className="table table-borderless table-hover">
                      <thead>
                        <tr>
                          <th>{t('body.transaction.table.header.pledge')}</th>
                          <th>{t('body.transaction.table.header.address')}</th>
                          <th>{t('body.transaction.table.header.date')}</th>
                          <th>{t('body.transaction.table.header.amount')}</th>
                          <th>{t('body.transaction.table.header.type')}</th>
                          <th>{t('body.transaction.table.header.pledge.days')}</th>
                          <th>{t('body.transaction.table.headerer.prize')}</th>
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
                  <WarningOutlined style={{fontSize:'24px',color:'red'}}/>
                  </div>
                  <div className="col-10"> 
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <span className="text-danger">{t('body.right.describe.risk.warning.title')}： </span>{t('body.right.describe.risk.warning.content')}
                          <div style={{float:'right',marginTop:'10px'}}>
                            <span style={{color:'#1383C6'}}> <a href="#!"></a>{t('body.right.describe.risk.warning.author')}</span>
                          </div>
                      </li>
                      <li className="list-group-item">
                        <span className="text-danger">{t('body.right.describe.disclaimer')}：</span>{t('body.right.describe.disclaimer.content')}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{textAlign:'left'}}>
                  <strong>{t('body.right.weekly.prize.top')}</strong>
                </h5>
                <div className="col" style={{textAlign:'left'}}>
                  <table className="table table-borderless table-hover">
                      <thead>
                        <tr>
                          <th>{t('body.right.weekly.prize.top.header.top')}</th>
                          <th>{t('body.right.weekly.prize.top.header.account')}</th>
                          <th>{t('body.right.weekly.prize.top.header.prize')}</th>
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
                  <strong>{t('body.right.hot.tag')}</strong>
                </h5>
                <div className="col w-80" style={{textAlign:'left',fontSize:'18px',padding:'5px'}}>
                  <table className="table table-borderless">
                    <tr>
                      <td><a href="#!" className="badge badge-pill badge-success">{t('body.right.hot.tag.running')}</a></td>
                      <td><a href="#!" className="badge badge-pill badge-warning">{t('body.right.hot.tag.most.user')}</a></td>
                      <td><a href="#!" className="badge badge-pill badge-danger">{t('body.right.hot.tag.most.prize')}</a></td>
                      <td><a href="#!" className="badge badge-pill badge-dark">{t('body.right.hot.tag.end')}</a></td>
                    </tr>
                    <tr>
                      <td><a href="#!" className="badge badge-pill badge-secondary">{t('body.right.hot.tag.no.start')}</a></td>
                      <td><a href="#!" className="badge badge-pill badge-purple">{t('body.right.hot.tag.no.eth')}</a></td>
                      <td><a href="#!" className="badge badge-pill badge-info">{t('body.right.hot.tag.no.usdt')}</a></td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{textAlign:'left'}}>
                  <strong>{t('body.right.requesttions')}</strong>
                </h5>
                <div className="col w-80" style={{textAlign:'left',fontSize:'14px'}}>
                  <ul className="list-group list-group-flush p-t-5">
                  <li className="list-group-item">
                    <a href="#!"><span className="text-black">{t('body.right.requesttions.q1')}</span></a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!">{t('body.right.requesttions.q2')}</a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!">{t('body.right.requesttions.q3')}</a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!">{t('body.right.requesttions.q4')}</a>
                  </li>
                 
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
              <h5 className="card-title" style={{textAlign:'left'}}>
                <strong>{t('body.right.contact.us')}</strong>
              </h5>
              <div className="col w-80" style={{textAlign:'left',fontSize:'16px'}} >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <a href="#!"><span className="img-avatar img-avatar-48 bg-translucent text-warning"><QqOutlined />&nbsp;&nbsp;&nbsp;466830255</span></a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!"><span className="img-avatar img-avatar-48 bg-translucent text-warning"><WechatOutlined />&nbsp;&nbsp;&nbsp;mingdong1129</span></a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!"> <span className="img-avatar img-avatar-48 bg-translucent text-warning"><PhoneOutlined />&nbsp;&nbsp;&nbsp;18710181258</span></a>
                  </li>
                  <li className="list-group-item">
                    <a href="#!"> <span className="img-avatar img-avatar-48 bg-translucent text-warning"><MailOutlined />&nbsp;&nbsp;&nbsp;7023302@qq.com</span></a>
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