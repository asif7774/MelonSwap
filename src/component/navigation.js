import React from 'react';
import {
    NavLink
} from "react-router-dom";
const Navigation = () => {
    return (
        <ul className="inline-list">
            <li>
                <NavLink exact to="/" activeClassName="btn-active" className="btn">Swap</NavLink>
            </li>
            <li>
                <NavLink exact to="/deposit" activeClassName="btn-active" className="btn">Deposit</NavLink>
            </li>
            <li>
                <NavLink exact to="/withdraw" activeClassName="btn-active" className="btn">Withdraw</NavLink>
            </li>
        </ul>
    );
}

export default Navigation;
