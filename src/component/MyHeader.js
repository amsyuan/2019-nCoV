/**
 * Created by Yuan on 3/25/20.
 */

import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

class MyHeader extends Component {

    /*componentDidMount() {
        this.Init();
    }

    Init() {
        const province = this.props.province;
    }*/

    render () {
        const province = this.props.province;
        return (
            <header>
                <div className="bg"></div>
                <h1>

                    <small style={{color:'white'}}>新型冠状病毒</small>
                    <br />
                    肺炎疫情动态追踪/回顾 · { province ? province.name : 'Epidemic and Evolution' }
                </h1>
                <i>By amsyuan </i>
            </header>
            /*<nav>
            <NavLink exact activeClassName="active" to="/">
                Home
            </NavLink>
            <NavLink activeClassName="active" to="/users">
            Users
            </NavLink>
            <NavLink activeClassName="active" to="/contact">
                Contact
            </NavLink>
            </nav>*/
        )
    }
}

//<span style={{fontSize:20}}>新型冠状病毒</span>

//<small>新型冠状病毒</small>
export default MyHeader;
