import React, { Component } from 'react';

import FileBase64 from 'react-file-base64';

import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/Redirect';

import {api} from '../utils/Api';

import locales from '../../src/locales';


class CreateSymbolContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldErrors: {},
            description: undefined,
            symbolImage: undefined,
            choicesCounter: 0,
            cancelCreate: false,
            notEnoughChoices: false,
            submitting: false,
            created: false,
        }
    }

    onDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    };

    onSymbolImageChange(image){
        this.setState({ symbolImage: image })
    }


    formSubmit = (event) =>{
        event.preventDefault();

        const fieldErrors = this.validate(this.state.description, this.state.symbolImage);

        this.setState({
            fieldErrors,
        });

        if(Object.keys(fieldErrors).length > 0) return;


        this.setState({
            submitting: true,
        });
        api.createSymbol(this.state.description, this.state.symbolImage)
            .then((response) => {
                if(response === 200){
                    this.setState({
                        created: true,
                    })
                }
            })

    }

    cancelCreate = (event) =>{
        event.preventDefault();
        this.setState({
            cancelCreate: true,
        })
    }

    validate = (description, image) => {
        const errors = {};

        if(!description || typeof(description) === "undefined"){
            errors.description = true;
        }

        if(image || typeof(image) !== "undefined") {
            let {type, size} = image ;
            if(type.indexOf("image") === -1){
                errors.image = true;
                errors.error_desc = locales.t('submit.InvalidType')
            }
            size = size.replace(' kB');
            if(Number(size) > 5000){
                errors.image = true;
                errors.error_desc = locales.t('submit.InvalidSize')
            }
        }else{
            errors.image = true;
        }

        return errors;
    };

    render() {
        return (
            (this.state.cancelCreate || this.state.created)
                ?(
                    <form action="#" className="bg-white rounded pb_form_v1">
                        <div className="alert alert-success" role="alert">
                            {locales.t('submit.SuccessRegister')}
                        </div>
                    </form>
                )
                :(
                    <form action="#" className="bg-white rounded pb_form_v1" onSubmit={this.formSubmit}>
                        <h2 className="mb-4 mt-0 text-center">{locales.t('submit.YourDesign')}</h2>
                        <div className="form-group">
                         <textarea
                             className={"form-control pb_height-100 reverse " +  (this.state.fieldErrors.description ? "is-invalid" : "")}
                             onChange={this.onDescriptionChange}
                             value={this.state.description}
                             placeholder={locales.t('application.description')}/>

                        </div>
                        <div className="form-group">
                            <FileBase64
                                className="form-control pb_height-50 reverse"
                                multiple={ false }
                                onDone={ this.onSymbolImageChange.bind(this) }
                            />
                            {this.state.fieldErrors.error_desc &&
                            <div className="alert alert-warning" role="alert">
                                {this.state.fieldErrors.error_desc}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            }
                        </div>
                        <div className="form-group">
                            <input type="submit"
                                   className="btn btn-primary btn-lg btn-block pb_btn-pill  btn-shadow-blue"
                                   value="Submit" />
                        </div>
                        {this.state.submitting
                            ? (
                                <div className="alert alert-success" role="alert">
                                    {locales.t('submit.Registering')}
                                </div>
                            )
                            :(<p></p>)
                        }
                    </form>

                )
        );
    }
}

CreateSymbolContainer.propTypes = {
    className: PropTypes.string,
};

export default CreateSymbolContainer;
