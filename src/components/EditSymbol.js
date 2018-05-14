import React, { Component } from 'react';

import PropTypes from 'prop-types';


import locales from '../../src/locales';

class EditSymbol extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldErrors: {},
            description: "",
        }
    }

    componentDidMount(){
        this.setState({
            description: this.props.symbol.description,
        })
    }

    onDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    };

    formSubmit = (event) =>{
        event.preventDefault();

        const fieldErrors = this.validate(this.state.description);

        this.setState({
            fieldErrors,
        });

        if(Object.keys(fieldErrors).length > 1) return;

        this.props.onSymbolUpdate(this.state.description);
    };

    goBack = (event) =>{
        event.preventDefault();
        this.props.goBack();
    };

    validate = (description) => {
        const errors = {};
        if(!description || typeof(description) === "undefined"){
            errors.description = true;
        }
        return errors;
    };

    render() {
        return (
            <div className="col-lg-4 col-md- col-sm-6">
                <div className="media d-block pb_feature-v1 text-left">
                    <div className="ui top attached label green">{locales.t('submit.EditSymbol')}</div>
                    <form
                        onSubmit={this.formSubmit}
                        className="form">
                        <div className={"field " +
                        (this.state.fieldErrors.description ? "error" : "")}>
                            <div className="form-group">
                                <textarea
                                    autoFocus={true}
                                    className="form-control pb_height-100 reverse"
                                    onChange={this.onDescriptionChange}
                                    value={this.state.description}
                                    placeholder={locales.t('application.description')}
                                />
                            </div>
                        </div>
                        <hr/>
                        <input
                            type="submit"
                            className="btn btn-sm btn-success"
                            value={locales.t('application.submit')}/>
                        <button
                            onClick={this.goBack}
                            className="btn btn-sm btn-secondary goback">
                            {locales.t('application.back')}
                        </button>
                    </form>
                    {
                        this.props.symbolUpdated
                            ? (
                                <div className="alert alert-success" role="alert">
                                    {locales.t('submit.SuccessUpdate')}
                                </div>
                            )
                            :(<p></p>)
                    }
                </div>
            </div>

        );
    }
}

EditSymbol.propTypes = {
    className: PropTypes.string,
    symbol: PropTypes.object,
    onSymbolUpdate: PropTypes.func,
    symbolUpdated: PropTypes.bool,
    goBack: PropTypes.func,
};

export default EditSymbol;
