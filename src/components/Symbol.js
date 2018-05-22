import React from 'react';
import PropTypes from 'prop-types';

import locales from '../../src/locales';

const Symbol = (props) => {
    const {symbol} = props;
    const img_url = `/${symbol.symbol_image[0].path}`;

    return (
        <div className="col-lg-4 col-md- col-sm-6">
            <div className="media d-block pb_feature-v1 text-left">
                <div className="pb_icon img-thumbnail">
                    <img src={img_url} className="img-fluid"/>
                </div>
                <div className="btn-group btn-block votebtn">
                    {
                        props.voted || props.successVote
                            ? (
                                <button className="btn btn-success btn-block text-center" disabled>
                                    {props.voted ? (locales.t('application.alreadyVote')) : (locales.t('application.voted'))}
                                    <i className="fa fa-check"></i>
                                </button>

                            )
                            :(
                                <button
                                    onClick={props.onVote}
                                    className="btn btn-primary btn-block text-center"
                                    disabled
                                >
                                    <i className="fa fa-heart"></i>&nbsp;{locales.t('application.vote')}

                                </button>
                            )
                    }
                    <button className="btn btn-outline-primary" ><b>{props.totalVotes}</b></button>
                </div>
                <div className="media-body">
                    <h6 className="mt-0 mb-3 heading text-center">
                        <small><b>@{symbol.username}</b></small>
                    </h6>
                    <p className="text-sans-serif">{symbol.description}</p>
                </div>
            </div>
        </div>

    );
};

Symbol.propTypes = {
    className: PropTypes.string,
    symbol: PropTypes.object,
    totalVotes: PropTypes.number,
    onVoteSelectChange: PropTypes.func,
    onVote: PropTypes.func,
    voted: PropTypes.bool,
};

export default Symbol;
