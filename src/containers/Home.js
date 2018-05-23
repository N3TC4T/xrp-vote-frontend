import React, { Component } from 'react';

// container
import SymbolsContainer from '../containers/SymbolsContainer';

// libs
import {api} from '../utils/Api';
import Link from 'react-router-dom/Link';

// locals
import locales from '../../src/locales';


class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section
                    className="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb_slant-light"
                    id="section-home">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-6">
                                <h2 className="heading mb-3">{locales.t('home.headerL')}</h2>
                                <div className="sub-heading">
                                    <p className="mb-4">{locales.t('home.headerLS')}</p>
                                    <p className="mb-5"><a className="btn btn-success btn-lg pb_btn-pill smoothscroll"
                                                           href="#section-submissions"><span
                                        className="pb_font-14 text-uppercase pb_letter-spacing-1">{locales.t('application.vote')}</span></a></p>
                                </div>
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-5 relative align-self-center">
                                {
                                    api.isLoggedIn()
                                        ? (
                                            <form action="#" className="bg-white rounded pb_form_v1">

                                                <h2 className="mb-4 mt-0 text-center">{locales.t('home.headerF')}</h2>
                                                <p>
                                                    @{api.getUsername()} {locales.t('home.LoggedIn')}
                                                </p>
                                                <div className="form-group">
                                                    <Link
                                                        className="btn btn-primary btn-lg btn-block pb_btn-pill btn-shadow-blue"
                                                        to="/submit">
                                                        <i className="fa fa-send" /> {locales.t('application.submit')}
                                                    </Link>
                                                </div>
                                            </form>
                                        )
                                        : (
                                            <form action="#" className="bg-white rounded pb_form_v1">

                                                <h2 className="mb-4 mt-0 text-center">{locales.t('home.headerF')}</h2>
                                                <p>
                                                    {locales.t('home.NotLoggedIn')}
                                                </p>
                                                <div className="form-group">
                                                    {
                                                        this.props.fetchingToken ? (
                                                            <a href="#"
                                                               className="btn btn-primary btn-lg btn-block pb_btn-pill btn-shadow-blue">
                                                                <i className="fa fa-twitter" />{locales.t('application.loading')}
                                                            </a>
                                                        ) : (
                                                            <a href="#"
                                                               onClick={this.props.twitterLoginStart}
                                                               className="btn btn-primary btn-lg btn-block pb_btn-pill btn-shadow-blue">
                                                                <i className="fa fa-twitter" />{locales.t('application.login')}
                                                            </a>
                                                        )
                                                    }

                                                </div>
                                            </form>
                                        )
                                }


                            </div>
                        </div>
                    </div>
                </section>

                <section className="pb_section bg-light pb_slant-white pb_pb-250" id="section-submissions">
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="col-md-6 text-center mb-5">
                                <h5 className="text-uppercase pb_font-15 mb-2 pb_color-dark-opacity-3 pb_letter-spacing-2">
                                    <strong>{locales.t('application.submissions')}</strong></h5>
                                <h2>{locales.t('home.SubmissionsH')}<br/><b>{locales.t('home.SubmissionsS')}</b></h2>
                            </div>
                        </div>


                        <SymbolsContainer />


                    </div>
                </section>

                <section className="pb_section pb_slant-wnhite" id="section-faq">
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="col-md-6 text-center mb-5">
                                <h5 className="text-uppercase pb_font-15 mb-2 pb_color-dark-opacity-3 pb_letter-spacing-2">
                                    <strong>{locales.t('application.faq')}</strong></h5>
                                <h2>{locales.t('home.FAQH')}</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <div id="pb_faq" className="pb_accordion" data-children=".item">
                                    <div className="item">
                                        <a data-toggle="collapse" data-parent="#pb_faq" href="#pb_faq1"
                                           aria-expanded="true" aria-controls="pb_faq1"
                                           className="pb_font-22 py-4">{locales.t('home.FAQ1')}</a>
                                        <div id="pb_faq1" className="collapse show" role="tabpanel">
                                            <div className="py-3">
                                                <p>
                                                    {locales.t('home.FAQ1Answer')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <a data-toggle="collapse" data-parent="#pb_faq" href="#pb_faq2"
                                           aria-expanded="false" aria-controls="pb_faq2" className="pb_font-22 py-4">
                                            {locales.t('home.FAQ2')}
                                        </a>
                                        <div id="pb_faq2" className="collapse" role="tabpanel">
                                            <div className="py-3">
                                                <p>
                                                    {locales.t('home.FAQ2Answer')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <a data-toggle="collapse" data-parent="#pb_faq" href="#pb_faq3"
                                           aria-expanded="false" aria-controls="pb_faq3" className="pb_font-22 py-4">
                                            {locales.t('home.FAQ3')}
                                        </a>
                                        <div id="pb_faq3" className="collapse" role="tabpanel">
                                            <div className="py-3">
                                                <p>
                                                    {locales.t('home.FAQ3Answer')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <a data-toggle="collapse" data-parent="#pb_faq" href="#pb_faq4"
                                           aria-expanded="false" aria-controls="pb_faq4" className="pb_font-22 py-4">
                                            {locales.t('home.FAQ4')}
                                        </a>
                                        <div id="pb_faq4" className="collapse" role="tabpanel">
                                            <div className="py-3">
                                                <p>
                                                    {locales.t('home.FAQ4Answer')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <a data-toggle="collapse" data-parent="#pb_faq" href="#pb_faq5"
                                           aria-expanded="false" aria-controls="pb_faq5" className="pb_font-22 py-4">
                                            {locales.t('home.FAQ5')}
                                        </a>
                                        <div id="pb_faq5" className="collapse" role="tabpanel">
                                            <div className="py-3">
                                                <p>
                                                    {locales.t('home.FAQ5Answer')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <a data-toggle="collapse" data-parent="#pb_faq" href="#pb_faq6"
                                           aria-expanded="false" aria-controls="pb_faq6" className="pb_font-22 py-4">
                                            {locales.t('home.FAQ6')}
                                        </a>
                                        <div id="pb_faq6" className="collapse" role="tabpanel">
                                            <div className="py-3">
                                                <p style={{"white-space": "pre-wrap"}}>
                                                    {locales.t('home.FAQ6Answer')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pb_xl_py_cover overflow-hidden pb_slant-light pb_gradient_v1 cover-bg-opacity-8">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-5 justify-content-center">
                                <h2 className="heading mb-5 pb_font-40">{locales.t('home.DescH')}</h2>
                                <div className="sub-heading">
                                    <p className="mb-4">{locales.t('home.DescS')}</p>
                                </div>
                            </div>
                            <div className="col-md-1" />
                            <div className="col-md-5">
                                <form action="#" className="bg-white rounded pb_form_v1">
                                    <h2 className="mb-4 mt-0 text-center"><i
                                        className="fa fa-exclamation-triangle" />{locales.t('home.WarningNoteH')}</h2>
                                    <p>
                                        {locales.t('home.WarningNoteS')}
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;
