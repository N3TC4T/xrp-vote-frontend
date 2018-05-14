import React from 'react';
import PropTypes from 'prop-types';


import locales from '../../src/locales';

const Symbol = (props) => {
    const {symbol} = props ;
    const img_url = `/${symbol.symbol_image[0].path}`;

    return (
        <div className="col-lg-4 col-md- col-sm-6">
            <div className="media d-block pb_feature-v1 text-left">
                <div className="pb_icon img-thumbnail">
                    <img src={img_url} className="img-fluid"/>
                </div>
                <div className="media-body">
                    {
                        symbol.published ? (
                            <span className={"text-success"}>{locales.t('application.published')}</span>
                        ) : (
                            <span className={"text-warning"}>{locales.t('application.waitingForApprove')}</span>
                        )
                    }
                    <p className="text-sans-serif">{symbol.description}</p>
                </div>
                <hr/>
                <div className="btn-group btn-block">
                    <button
                        onClick={props.onEdit}
                        className="btn btn-sm btn-default">
                        <i className="fa fa-edit"></i> {locales.t('application.edit')}
                    </button>
                    {/*<button*/}
                        {/*onClick={props.onDelete}*/}
                        {/*className="btn btn-sm btn-danger">*/}
                        {/*<i className="fa fa-trash"></i> Delete*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
};

Symbol.propTypes = {
    className: PropTypes.string,
    symbol: PropTypes.object,
    totalVotes: PropTypes.number,
};

export default Symbol;
