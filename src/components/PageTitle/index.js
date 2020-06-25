import React from 'react';
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import './index.scss'

export default function PageTitle({ title, shadow }) {
    let history = useHistory();

    const goBack = () => {
        history.go(-1)
    }

    const classNames = classnames('page-title', {
        'page-title-shadow': shadow
    })

    return (<div className={classNames}>
        <svg onClick={goBack} t="1592303421054" className="page-title-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2669"><path d="M1024 460.8H196.096l219.648-219.648-72.192-72.704L0 512l343.552 343.552 72.192-72.704L196.096 563.2H1024V460.8z" p-id="2670" fill="#333333"></path></svg>
        <h6 className="page-title-text">{title}</h6>
    </div>)
}