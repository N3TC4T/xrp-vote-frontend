import React, { Component } from 'react';
import PropTypes from 'prop-types';

import qs from 'qs';

import {api} from '../utils/Api';


class LoginTwitter extends Component {

    componentWillMount(){
        const parsed = qs.parse(window.location.search, { ignoreQueryPrefix: true });
        api.saveTwitterTokens(parsed.user_oauth_token, parsed.user_oauth_verifier, parsed.user);
        window.open('', '_self', ''); window.close();
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

LoginTwitter.propTypes = {
    className: PropTypes.string,
};

export default LoginTwitter;
