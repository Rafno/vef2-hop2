import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import './registerRead.css';
import { Route, Link, Switch } from 'react-router-dom';


class registerRead extends Component {
    generateOptions(categories) {
        return categories.map( (x, i) => {
         return (<option key={i} value={x}>{x}</option>)
        });
    }
    render(){
        const gognin = this.props.check;
        const visible = this.props.read;
        console.log(visible, ' dhbjdshbjsdhjbdsfhbj');
        let tableClass = null;
        if(visible === false  || visible === null){
            tableClass='none ';
        }else{
            tableClass = 'ListinnFyrirBok';
        }
        const allCategories = ['fiction', 'mistery', 'horror', 'thriller', 'drama', 'romance'];
        const options = this.generateOptions(allCategories);
        return(
            <div className={tableClass}>
               <div>
                    <legend htmlFor="about">um Bók</legend>
                    <textarea rows="5" cols="50" type="text" name="about" onChange={this.handleInputChange}></textarea>
                </div>
                <lable htmlFor="category" >Flokkur:</lable>
                <select name="category" onChange={this.handleInputChange}>
                    {options}
                </select>
            </div>
        );
    }
}
export default registerRead;