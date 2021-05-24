import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import MediaQuery from 'react-responsive';
import './header.scss';

import LogoImage from "../../../assets/images/logo.png";

 
class HeaderMenus extends Component {
    render() {
        return (
            <ul>
                <li>
                    <NavLink to="/home" activeClassName="selected">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" activeClassName="selected">
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/docs" activeClassName="selected">
                        Docs
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/stake-lp" activeClassName="selected">
                        Stake Lp
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/stake-melon" activeClassName="selected">
                        Stake Melon
                    </NavLink>
                </li>
            </ul>
        )
    }
}


class HeaderView extends Component {
    state = {
        collapsed: true,
    };
    sidebarToggle = (e) => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        if (this.state.collapsed) {
            document.getElementById("menuMobile").classList.add('sidebar-open');
        } else {
            document.getElementById("menuMobile").classList.remove('sidebar-open');
        }
    };
    render() {
        return (
            <React.Fragment>
                <div className="header-wrapper">
                    <div className="header-inner">
                        <div className="leftmenus">
                            <div className="logo-header">
                                <img alt="Melonswap" src={LogoImage} />
                            </div>
                            <MediaQuery maxDeviceWidth={767}>
                            <div className="menu-icon" onClick={this.sidebarToggle}>
                                <div className="menu-icon-lines">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="menus-list" id="menuMobile">
                                    <HeaderMenus />
                                </div>
                                </div>
                            </MediaQuery>
                        </div>
                        <MediaQuery minDeviceWidth={768}>
                            <div className="rightmenus">
                                <HeaderMenus />
                            </div>
                        </MediaQuery>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HeaderView
