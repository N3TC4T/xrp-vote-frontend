import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Truncate from 'react-truncate';

import locales from '../../src/locales';

class Symbol extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            truncated: false
        };

        this.handleTruncate = this.handleTruncate.bind(this);
        this.toggleLines = this.toggleLines.bind(this);
    }

    handleTruncate(truncated) {
        if (this.state.truncated !== truncated) {
            this.setState({
                truncated
            });
        }
    }

    toggleLines(event) {
        event.preventDefault();

        this.setState({
            expanded: !this.state.expanded
        });
    }


    render() {

        const {
            symbol,
        } = this.props;

        const {
            expanded,
            truncated
        } = this.state;

        const img_url = `/${symbol.symbol_image[0].path}`;

        return (
            <div className="col-lg-4 col-md- col-sm-6">
                <div className="media d-block pb_feature-v1 text-left">
                    <div className="pb_icon img-thumbnail">
                        <img src={img_url} className="img-fluid"/>
                    </div>
                    <div className="btn-group btn-block votebtn">
                        {
                            this.props.voted || this.props.successVote
                                ? (
                                    <button className="btn btn-success btn-block text-center" disabled>
                                        {this.props.voted ? (locales.t('application.alreadyVote')) : (locales.t('application.voted'))}
                                        <i className="fa fa-check" />
                                    </button>

                                )
                                : (
                                    <button
                                        onClick={this.props.onVote}
                                        className="btn btn-primary btn-block text-center"
                                        disabled
                                    >
                                        <i className="fa fa-heart"/>&nbsp;{locales.t('application.vote')}

                                    </button>
                                )
                        }
                        <button className="btn btn-outline-primary"><b>{this.props.totalVotes}</b></button>
                    </div>
                    <div className="media-body">
                        <h6 className="mt-0 mb-3 heading text-center">
                            <small><b>@{symbol.username}</b></small>
                        </h6>
                        <Truncate
                            className="text-sans-serif"
                            lines={!expanded && 1}
                            ellipsis={(
                                <span>... <a href='#' onClick={this.toggleLines}>More</a></span>
                            )}
                            onTruncate={this.handleTruncate}
                        >
                            {symbol.description}
                        </Truncate>
                        {!truncated && expanded && (
                            <span> <a href='#' onClick={this.toggleLines}>Less</a></span>
                        )}
                    </div>
                </div>
            </div>

        );
    }
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
