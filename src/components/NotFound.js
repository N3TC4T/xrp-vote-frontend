import React from 'react';
import PropTypes from 'prop-types';

import Link from 'react-router-dom/Link';

import locales from '../../src/locales';

const NotFound = ({ className }) => {
    return (

        <div className="ui negative message">
            <div className="header">404</div>
            <p>{locales.t('application.404')} <Link to="/">main.</Link></p>
        </div>

    );
};

NotFound.propTypes = {
    className: PropTypes.string,
};

export default NotFound;
