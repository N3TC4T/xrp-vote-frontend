import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import {api} from '../utils/Api';
import VARIABLES from '../utils/variables';

import Authenticated from '../components/Authenticated';

//
import LoginTwitter from './LoginTwitter';
import Logout from './Logout';
import Home from './Home'
import Submit from './Submit'

import TopBar from '../components/TopBar'
import Footer from '../components/Footer'

import NotFound from '../components/NotFound';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetchingToken: false,
        }
    }

    twitterLoginStart = (event) => {

        localStorage.removeItem('oath_token');
        localStorage.removeItem('oauth_secret');
        localStorage.removeItem('user');

        // http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
        let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        let dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

        let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        let left = ((width / 2) - (570 / 2)) + dualScreenLeft;
        let top = ((height / 2) - (520 / 2)) + dualScreenTop;
        window.open(
            VARIABLES.TWITTER_LOGIN_URL,
            '_blank',
            'location=yes,height=400,width=400,scrollbars=yes,status=yes,top=' + top + ',left=' + left + ''
        );
        this.twitterLogin();
    };

    twitterLogin(){
        /*Remove login text while loggging in is in process*/
        let user = localStorage.getItem('user');
        if(user !== '' && typeof user !== 'undefined' && user !== null){
            this.setState({
                fetchingToken: true,
            });
        }
        api.handleTwitterLogin()
            .then((response) =>{
                if(response === 'error'){
                    setTimeout(() => {
                        this.twitterLogin();
                    }, 50);
                }
                else if(response === 'success'){
                    this.setState({
                        fetchingToken: false,
                    });
                }
            })
    }


    render(){
        return(
            <div>
                <TopBar
                    fetchingToken={this.state.fetchingToken}
                    twitterLoginStart={this.twitterLoginStart}
                />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Authenticated exact path="/submit" component={Submit} />
                    <Route path="/twitter_logged_in/" component={LoginTwitter} />
                    <Route path="/logout" component={Logout} />
                    <Route path="*" component={NotFound} />
                </Switch>

                <Footer />
            </div>

        )
    }
};

App.propTypes = {
    className: PropTypes.string,
};

export default App;
