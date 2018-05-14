import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {api} from '../utils/Api';

import SymbolContainer from '../containers/SymbolContainer';
import NotFound from '../components/NotFound';


class SymbolsContainer extends Component {

    /*Container that will hold the list of all symbols*/

    constructor(props) {
        super(props);

        this.state = {
            fetched: false,
            isError: false,
            symbols: [],
            currentPage: 1,
            symbolsPerPage: 6
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    componentWillUnmount() {
        clearInterval(this.pollsDataTimer);
    }

    componentDidMount() {
        this.getSymbols();
        this.pollsDataTimer = setInterval(() => {
            this.getSymbols();
        }, 5000);
    }

    getSymbols() {
        api.fetchAllSymbols()
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
        const { symbols, currentPage, symbolsPerPage } = this.state;

        // Logic for displaying symbols
        const indexOfLastSymbol = currentPage * symbolsPerPage;
        const indexOfFirstTodo = indexOfLastSymbol - symbolsPerPage;
        const currentSymbols = symbols.slice(indexOfFirstTodo, indexOfLastSymbol);

        const renderSymbols = currentSymbols.map((symbol, index) => {
            return <SymbolContainer
                symbol={symbol}
                key={index}
            />
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(symbols.length / symbolsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li className="page-item">
                    <a
                        className={"page-link"}
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                    >
                        {number}
                    </a>
                </li>
            );
        });



        return (


            !this.state.fetched
                ? (
                    <div className="ui active inverted dimmer">
                        <div className="ui text loader">Loading the symbols...</div>
                    </div>
                )
                : (
                    !this.state.isError
                        ? (

                            <div className={"container"}>
                                <div className="row">
                                    {renderSymbols}
                                </div>

                                <div className="row align-items-center justify-content-center">
                                    <nav aria-label="navigation">
                                        <ul className="pagination justify-content-center">
                                            {renderPageNumbers}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        )
                        : (
                            <NotFound/>
                        )
                )



        )
    }
}

SymbolsContainer.propTypes = {
    className: PropTypes.string,
};

export default SymbolsContainer;
