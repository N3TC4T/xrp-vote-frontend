import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {api} from '../utils/Api';

import MySymbol from '../components/MySymbol';
import EditSymbol from '../components/EditSymbol';



class MySymbolContainer extends Component {

    /*Single Symbol Container*/

    constructor(props) {
        super(props);
        this.state = {
            symbol: props.symbol,
            totalVotes: props.symbol.vote,
            isError: false,
            editSymbol: false,
            symbolUpdated: false,
            symbolDeleted: false,
        }
    }


    onEdit = (event) =>{
        this.setState({
            editSymbol: true,
        })
    }

    onDelete = (event) =>{
        api.deleteSymbol(this.state.symbol.id)
            .then((response) => {
                if(response === 204){
                    this.setState({
                        symbolDeleted: true,
                    })
                }
            })
    };

    onSymbolUpdate = (description) =>{
        api.symbolUpdate(this.state.symbol.id, description)
            .then((response) =>{
                if(response.status === 200){
                    this.setState({
                        symbolUpdated: true,
                        symbol: response.symbol,
                    })
                }
            })
    }

    editFinish = () =>{
        this.setState({
            editSymbol: false,
        })
    }

    render() {
        if(this.state.symbolDeleted){
            return null;
        }

        return (
            this.state.editSymbol
                ?(
                    <EditSymbol
                        symbol={this.state.symbol}
                        onSymbolUpdate={this.onSymbolUpdate}
                        symbolUpdated={this.state.symbolUpdated}
                        goBack={this.editFinish}/>
                )
                :(
                    <MySymbol
                        symbol={this.state.symbol}
                        totalVotes={this.state.totalVotes}
                        onEdit={this.onEdit}
                        onDelete={this.onDelete}
                    />
                )
        );
    }
}

MySymbolContainer.propTypes = {
    className: PropTypes.string,
};

export default MySymbolContainer;
