import React from 'react';
import PropTypes from 'prop-types';


const Footer = (props) =>  {
    return (
        <footer className="pb_footer bg-light" role="contentinfo">
            <div className="container">
                <div className="row text-center">
                    <div className="col">
                        <ul className="list-inline">
                            <li className="list-inline-item"><a href="#" className="p-2"><i
                                className="fa fa-twitter" /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <p className="pb_font-14">&copy; 2018 XRP Community <br/> Developed by
                            <a href={"https://twitter.com/baltazar223"} target={"_blank"}>@baltazar223</a> and <a target={"_blank"} href={"https://twitter.com/WietseWind"}>@WietseWind</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;
