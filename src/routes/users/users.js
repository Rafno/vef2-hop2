import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { viewUser } from '../../actions/auth';
import { connect } from 'react-redux';

class users extends Component {
  state = {page:0, pageNumber:1};
  componentDidMount() {
    const { token } = this.props;
    const { page, pageNumber } = this.state;
    const url = this.props.location.search;
    console.log(url);
    const string = url.split('=');
    console.log(string.length, " þetta er lengdin");
    
    if(string.length === 1) {
      console.log('her er stuttur');
    }else{
      console.log("her er langur");
    }
    const givenNumber = string;
    this.props.viewUser(token,page);
    this.setState({page:page, pageNumber:pageNumber})
  }
  forwardHandler = (e) => {
    e.preventDefault();
    const { page, pageNumber } = this.state;
    const numb = page+10;
    const sida = pageNumber+1;
    this.updateFall(numb, sida)
  }
  backwardHandler = (e) => {
    e.preventDefault();
    const { page, pageNumber } = this.state;
    const numb = page-10;
    const sida = pageNumber-1;
    this.updateFall(numb, sida)
  }
  updateFall(tala,sida){
    const { token } = this.props;
    this.props.viewUser(token,tala);
    this.setState({page:tala, pageNumber:sida})

  }
  render() {
    const {page, pageNumber} = this.state;
    const { users } = this.props;
    console.log(users);
    let next = null;
    let prev = null;
    const userList = users ?
    <div>
      {
        users.response.items.map((i,index) => {
          if( index == 0) {
            prev = users.response.links.prev;
            next = users.response.links.next;
          }
          return(
          <ul>
            <li> {i.name} </li>
          </ul>
          );
        })
      }
    </div>
      : <p>Hleð inn gögnum</p>
    return (
      <div>
        <h2> Notendur </h2>
        {userList}
        <div className="takkar">
          {prev ? <button className="backButton" onClick={this.backwardHandler}>Aftur um síðu</button> : null}
          <p>Síða {pageNumber}</p>
          {next ? <button className="forwardButton" onClick={this.forwardHandler}>Áfram um síðu </button> : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    users: state.auth.users,
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, { viewUser })(users);