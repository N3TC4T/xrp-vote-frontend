import React, { Component } from 'react';

import MySymbolsContainer from '../containers/MySymbolsContainer';
import CreateSymbolContainer from '../containers/CreateSymbolContainer'

import locales from '../../src/locales';

class Submit extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section
                    className="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb_slant-light"
                    style={{maxHeight : 500 + 'px'}} id="section-home">
                    <div className="container">
                        <div className="row align-items-center justify-content-center" style={{maxHeight : 500 + 'px'}}>
                            <div className="col-md-6">
                                <h2 className="heading mb-3">{locales.t('submit.Header')}</h2>
                                <div className="sub-heading">
                                    <p className="mb-4">{locales.t('submit.HeaderS')}</p>
                                    <a className="btn btn-success btn-lg pb_btn-pill smoothscroll"
                                       href="#section-submit"><span
                                        className="pb_font-14 text-uppercase pb_letter-spacing-1">{locales.t('submit.headerB')}</span></a>
                                </div>
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
                                <h2><b>{locales.t('submit.SubmissionsH')}</b></h2>
                            </div>
                        </div>

                        <MySymbolsContainer />
                    </div>
                </section>

                <section className="pb_section pb_slant-white" id="section-submit">
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="col-md-6 text-center mb-5">
                                <h5 className="text-uppercase pb_font-15 mb-2 pb_color-dark-opacity-3 pb_letter-spacing-2">
                                    <strong>{locales.t('submit.ParticipateH')}</strong></h5>
                                <h2>{locales.t('submit.ParticipateS')}</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <h3 className=""><b>{locales.t('submit.RulesH')}</b></h3>
                                <ol>
                                    <li>{locales.t('submit.Rule1')}</li>
                                    <li>{locales.t('submit.Rule2')}</li>
                                    <li>{locales.t('submit.Rule3')}</li>
                                    <li>{locales.t('submit.Rule4')}</li>
                                    <li>{locales.t('submit.Rule5')}</li>
                                    <li>{locales.t('submit.Rule6')}</li>
                                    <li>{locales.t('submit.Rule7')}</li>
                                </ol>
                            </div>
                            <div className="col-12 col-lg-1">&nbsp;</div>
                            <div className="col-12 col-lg-5">
                                <CreateSymbolContainer />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Submit;
