import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './footer.scss';

class FooterView extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="footer-wrapper">
                    <div className="footer-inner">
                        <ul>
                            <li>
                                <NavLink to="/" activeClassName="selected">
                                    Telegram
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/" activeClassName="selected">
                                    Twitter
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/" activeClassName="selected">
                                    Discord
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/" activeClassName="selected">
                                    Github
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/" activeClassName="selected">
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FooterView
