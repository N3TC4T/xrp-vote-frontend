import axios from 'axios';

const API_STEM = '/api/v1';
const API_STEM_AUTH = '/rest-auth';

class Api{

    constructor() {
        if(localStorage.getItem('token') === null){
            this.token = null;
        }
        else{
            this.token = localStorage.getItem('token');
        }
    }

    /*Fetching the Data*/
    fetchAllSymbols(){
        let URL = `${API_STEM}/symbols/`;
        return axios.get(URL)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response.status === 404) {
                    return error.response.status;
                }
                else{
                    console.warn("Error in fetchAllSymbols", error);
                }
            });
    }

    fetchSingleSymbol(id){
        let URL = `${API_STEM}/symbols/${id}/`;
        return axios.get(URL)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response.status === 404) {
                    return error.response.status;
                }
                else{
                    console.warn("Error in fetchAllSymbols", error);
                }
            });
    }

    fetchMySymbols(){
        let URL = `${API_STEM}/symbols/mine/`;
        let config = {
                headers: {"Authorization": "Token " + this.token},
            };
        return axios.get(URL, config)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response.status === 404) {
                    return error.response.status;
                }
                else{
                    console.warn("Error in fetchMySymbols", error);
                }
            });
    }

    postVote(symbolId){
        let URL = `${API_STEM}/symbols/${symbolId}/vote/`;
        let config = {};

        if(this.isLoggedIn()){
            config = {
                headers: {"Authorization": "Token " + this.token},
            };
        }

        return axios.post(
                URL,
                {
                    "symbol": symbolId
                },
                config
            )
            .then((response) => {
                return response.data.data.question;
            })
            .catch((error) => {
                if(error.response.status === 403){
                    return error.response.status;
                }
                else{
                    console.warn(error);
                }
            })
    }

    deleteSymbol(symbolId){
        let URL = `${API_STEM}/symbols/${symbolId}/`;
        let config = {
            headers: {"Authorization": "Token " + this.token},
        };
        return axios.delete(
                URL,
                config
            )
            .then((response) => {
                return response.status;
            })
            .catch((error) => {
                console.warn(error);
            })
    }

    symbolUpdate(symbolId, description){
        let URL = `${API_STEM}/symbols/${symbolId}/`;
        let config = {
            headers: {"Authorization": "Token " + this.token},
        };

        let data = {
            description
        };

        return axios.put(
                URL,
                data,
                config
            )
            .then((response) => {
                return {
                    status: response.status,
                    symbol: response.data,
                };
            })
            .catch((error) => {
                console.warn(error);
            })
    }

    createSymbol(description, symbol){
        let URL = `${API_STEM}/symbols/`;
        let config = {
            headers: {"Authorization": "Token " + this.token},
        };

        let data = {
            description,
            symbol
        };

        return axios.post(
                URL,
                data,
                config
            )
            .then((response) => {
                return response.status;
            })
            .catch((error) => {
                console.warn(error);
            })
    }

    /*Authentication*/

    /*handleLogin(username, password){

        let URL = `${API_STEM_AUTH}/login/`;

        let csrfToken = cookies.get('csrftoken');
        let config = {
            headers: {"X-CSRFToken": csrfToken},
        };

        return axios.post(
            URL,
            {
                username,
                password
            },
            config
        )
        .then((response) => {
            let token = response.data.key;
            localStorage.setItem('token', token);
            this.token = token;
            localStorage.setItem('username', username);
            return 'success';
        })
        .catch((error) => {
            // Wrong credentials, status code 400
            if(error.response.status === 400){
                return error.response.status;
            }
            else{
                console.warn(error.response);
            }
        })
    }*/

    handleTwitterLogin(){
        let URL = `${API_STEM_AUTH}/twitter/`;

        let access_token = localStorage.getItem('oath_token');
        let token_secret = localStorage.getItem('oauth_secret');
        if(access_token && token_secret){
            return axios.post(
                    URL,
                    {
                        access_token,
                        token_secret
                    },
                )
                .then((response) => {
                    let token = response.data.key;
                    localStorage.setItem('token', token);
                    this.token = token;
                    localStorage.removeItem('oath_token');
                    localStorage.removeItem('oauth_secret');

                    return 'success';
                })
                .catch((error) => {
                    console.warn(error.response);
                })
        }
        else{
            let promise = new Promise((resolve, reject) =>{
                resolve('error');
            });
            return promise;
        }
    }

    saveTwitterTokens(oath_token, oauth_secret, user){
        localStorage.removeItem('oath_token');
        localStorage.removeItem('oauth_secret');
        localStorage.removeItem('user');
        localStorage.setItem('oath_token', oath_token);
        localStorage.setItem('oauth_secret', oauth_secret);
        localStorage.setItem('user', user);
    }

    handleLogout(){
        localStorage.removeItem('oath_token');
        localStorage.removeItem('oauth_secret');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.token = null;
        let URL = `${API_STEM_AUTH}/logout/`;
        let config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        axios.post(
            URL,
            config
        )
        .catch((error) => {
            console.warn(error.response);
        })
    }

    isLoggedIn(){
        return !!this.token;
    }

    getUsername(){
        return localStorage.getItem('user');
    }
}

export const api = new Api();
