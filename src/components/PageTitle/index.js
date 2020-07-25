import React from 'react';
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import './index.scss'

export default function PageTitle({ title, shadow, rightCon, onBack, leftIcon }) {
    let history = useHistory();

    const goBack = () => {
      // history.go(-1)
      // alert(window.JsBridge);
      window.JsBridge && window.JsBridge.call({
        method: 'pop'
      }, function() {
        alert('test,回调')
      })
    }

    const classNames = classnames('page-title', {
        'page-title-shadow': shadow
    })

    return (<div className={classNames}>
        <div className="page-title-left">
            {
                leftIcon === 'close'
                    ? <svg onClick={onBack || goBack} t="1594453110719" className="page-title-icon page-title-icon-close" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2078"><path d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z" p-id="2079"></path></svg>
                    : <svg onClick={onBack || goBack} t="1592303421054" className="page-title-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2669"><path d="M1024 460.8H196.096l219.648-219.648-72.192-72.704L0 512l343.552 343.552 72.192-72.704L196.096 563.2H1024V460.8z" p-id="2670" fill="#333333"></path></svg>
            }
            <h6 className="page-title-text">{title}-{window.WMjavascriptChannel}-</h6>
        </div>
        {
            rightCon ? (<div>{rightCon}</div>) : null
        }
    </div>)
}