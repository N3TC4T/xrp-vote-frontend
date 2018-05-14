import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {api} from '../utils/Api';

import Symbol from '../components/Symbol';

class SymbolContainer extends Component {

    /*Symbols Container*/

    constructor(props) {
        super(props);
        this.state = {
            symbol: props.symbol,
            totalVotes: props.symbol.vote,
            voted: false,
            successVote:false,
        }
    }

    onVote = (event) => {
        if(!this.state.voted){
            this.setState({
                totalVotes: this.state.totalVotes+1,
            });
            api.postVote(this.state.symbol.id)
                .then((response) => {
                    if(response === 403){
                        this.setState({
                            voted: true,
                            totalVotes: this.state.totalVotes-1,
                        });
                    }
                    else{
                        api.fetchSingleSymbol(this.state.symbol.id)
                            .then((symbol) => {
                                this.setState({
                                    successVote: true,
                                    symbol,
                                });
                            })
                    }
                })
        }
    }

    render() {
        return (
            <Symbol
                symbol={this.props.symbol}
                totalVotes={this.state.totalVotes}
                onVote={this.onVote}
                voted={this.state.voted}
                successVote={this.state.successVote}
            />
        );
    }
}

SymbolContainer.propTypes = {
    className: PropTypes.string,
};

export default SymbolContainer;
