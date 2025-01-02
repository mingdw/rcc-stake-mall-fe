import React,{FC,useState} from "react";
import { useTranslation  } from 'react-i18next';


export interface PledgePoolType {
    name: string,
    status:number,
    targetAmount:string,
    pledgedAmount:string,
    prize:string,
    progress:number,
    startTime:string,
    endTime:string,
    imgUrl:string
  }

const PledgePoolComponent: FC<PledgePoolType> = (props:PledgePoolType) => {
    
const initDate = props
const [pledgePool,setPledgePool] =useState<PledgePoolType>(initDate)
const {t, i18n } = useTranslation();
const stausStyle = initDate.status==0?"text-gray":initDate.status==1?"text-danger":"text-success"
    return <>
        <div>
        <li className="media">
                        <img className="mr-3" data-src="holder.js/180x250" alt="180x250" src="../../assets/images/login-bg-1.jpg"
                          data-holder-rendered="true" style={{width:'180px',height:'250px',borderRadius:'5px'}}/>
                        <div className="media-body">
                          <ul className="list-group">
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-6">
                                  <h5 className="mt-0 mb-1"><a href="!#">{pledgePool.name}</a></h5>
                                </div>
                                <div className="col-6" style={{textAlign:'right'}} >
                                  <strong><span className={stausStyle}>{pledgePool.status==0?"未开始":pledgePool.status==1?"进行中":"已结束"}</span></strong>
                                </div>
                              </div>
                            </li>
        
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-4">
                                {t('body.pledge.pool.target.amount')}：<span className="text-danger">{pledgePool.targetAmount}</span>
                                </div>
                                <div className="col-4">
                                {t('body.pledge.pool.pledged.amount')}：<span className="text-danger">{pledgePool.pledgedAmount}</span>
                                </div>
                                <div className="col-4">
                                {t('body.pledge.pool.prize.amount')}：<span className="text-danger">{pledgePool.prize}</span>
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
                                    <div className="progress-bar" role="progressbar" style={{width:pledgePool.progress+"%"}} >{pledgePool.progress}%</div>
                                  </div>
                                </div>
                                <div className="col-3">
        
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">{t('body.pledge.pool.startTime')}：{pledgePool.startTime} </li>
                            <li className="list-group-item">
                              <div className="row">
                                <div className="col-6">
                                {t('body.pledge.pool.endTime')}：{pledgePool.endTime}
                                </div>
                                <div className="col-6" style={{textAlign:'right'}}>
                                  <a className="btn  btn-outline-info" href="#!">{t('body.pledge.pool.view.details')}</a>
                                </div>
                              </div>
                            </li>
        
                          </ul>
                        </div>
                      </li>
        </div>
    </>
}

export default PledgePoolComponent