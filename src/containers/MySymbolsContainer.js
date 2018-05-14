import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {api} from '../utils/Api';

import MySymbolContainer from '../containers/MySymbolContainer'
import NotFound from '../components/NotFound';


class MySymbolsContainer extends Component {

    /*Container that will hold the list of all symbols*/

    constructor(props) {
        super(props);

        this.state = {
            fetched: false,
            isError: false,
            symbols: [],
        }
    }

    componentDidMount() {
        this.getSymbols();
    }

    getSymbols() {
        api.fetchMySymbols()
            .then((symbols) => {
                if (symbols === 404){
                    this.setState({
                        fetched: true,
                        isError: true,
                    });
                }
                else{
                    this.setState({
                        fetched: true,
                        symbols,
                    });
                }
            });
    }

    render() {
        return (
            <div className="row">
                    {!this.state.fetched
                        ?(
                            <div className="ui active inverted dimmer">
                                <div className="ui text loader">Loading my symbols...</div>
                            </div>
                        )
                        :(
                            !this.state.isError
                                ?(
                                    this.state.symbols.map((symbol, index) => (
                                        <MySymbolContainer
                                            symbol={symbol}
                                            key={index}
                                        />
                                    ))
                                )
                                :(
                                    <NotFound/>
                                )
                        )
                    }
            </div>
        );
    }
}

MySymbolsContainer.propTypes = {
    className: PropTypes.string,
};

export default MySymbolsContainer;
