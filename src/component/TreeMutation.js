/**
 * Created by Yuan on 4/17/20.
 */

import React, {Component} from 'react';
import { NavLink } from "react-router-dom";


import Phyloeny from './Phylogeny'
import Mutation from './Mutation'

class TreeMutation extends Component {
    render(){

        return  <div id='tree_mutation'>
            <Phyloeny/> <Mutation/>
        </div>
    }
}

export default TreeMutation;