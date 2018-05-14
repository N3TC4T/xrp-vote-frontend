import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Link from 'react-router-dom/Link';

import {api} from '../utils/Api';

import locales from '../../src/locales';


class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locale : localStorage.getItem('locale')
        }
    }

    changeLanguage(locale){
        localStorage.setItem('locale', locale);
        this.setState({locale});
        window.location.reload();
    }


    getAvailableLocales(){
        const {all} = locales ;
        let availableLocales = [];
        const currentLocale = this.state.locale;
        for (let i = all.length - 1; i >= 0; i--) {
            if (all[i] !== currentLocale) availableLocales.push(all[i]);
        }
        return availableLocales
    }

    render (){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark pb_navbar pb_scrolled-light" id="pb-navbar">
                <div className="container">
                    <Link
                        className="navbar-brand"
                        to="/">
                        XRP Symbol
                    </Link>
                    <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse"
                            data-target="#probootstrap-navbar" aria-controls="probootstrap-navbar" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span><i className="ion-navicon"/></span>
                    </button>
                    <div className="collapse navbar-collapse" id="probootstrap-navbar">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><a className="nav-link" href="/#section-home">{locales.t('application.home')}</a></li>
                            <li className="nav-item"><a className="nav-link" href="/#section-submissions">{locales.t('application.submissions')}</a></li>
                            <li className="nav-item"><a className="nav-link" href="/#section-faq">{locales.t('application.faq')}</a></li>
                            {
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">{this.state.locale.toUpperCase()}
                                        <b className="caret" /></a>
                                    <div className="dropdown-menu">
                                        {
                                            this.getAvailableLocales().map((locale, index) => {
                                                return(
                                                    <a key={index} className="dropdown-item" onClick={() => {this.changeLanguage(locale)}} href="#">{locale.toUpperCase()}</a>
                                                )
                                            })
                                        }
                                    </div>
                                </li>
                            }
                            {
                                api.isLoggedIn()
                                    ? (
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                to="/submit">
                                                {locales.t('application.submit')}
                                            </Link>
                                        </li>
                                    )
                                    : (
                                        this.props.fetchingToken
                                            ?(
                                                <li className="nav-item cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0">
                                                    <a className="nav-link">
                                                    <span
                                                        className="pb_rounded-4 px-4">{locales.t('application.loading')}<b>
                                                        <i className="fa fa-twitter"/></b>
                                                    </span>
                                                    </a>
                                                </li>
                                            )
                                            :(
                                                <li className="nav-item cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0">
                                                    <a style={{cursor: "pointer"}} className="nav-link" onClick={this.props.twitterLoginStart}>
                                                    <span
                                                        className="pb_rounded-4 px-4">{locales.t('application.submitDesign')}: <b>{locales.t('application.login')}
                                                        <i className="fa fa-twitter"/></b>
                                                    </span>
                                                    </a>
                                                </li>
                                            )
                                    )
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        )}

}

TopBar.propTypes = {
    className: PropTypes.string,
    toggleVisibility: PropTypes.func,
    twitterLoginStart: PropTypes.func,
    fetchingToken: PropTypes.bool,
};

export default TopBar;
