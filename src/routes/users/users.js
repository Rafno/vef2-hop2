import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { viewUser } from '../../actions/auth';
import { connect } from 'react-redux';

class users extends Component {
  state = {page:1, pageNumber:-1};
  componentDidMount() {

    const { token } = this.props;
    const { page, pageNumber } = this.state;
    const url = this.props.location.search;
    const strengur = url.split('=');
    let RealSide = null;
    if(strengur.length === 1) {
      RealSide = page;
    }else{
      const res = parseInt(strengur[1]);
      console.log(res);
      RealSide = res*10;
      console.log(RealSide);
    }
    //window.location.replace(`localhost:3000/users?page=${RealSide-10}`)
    window.location.replace('localhost:3000/');
    this.props.viewUser(token,RealSide);
    this.setState({page:page, pageNumber:RealSide})
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
    const { users, isAuthenticated } = this.props;
    let next = null;
    let prev = null;
    let sidan = null;
    sidan = this.state.pageNumber-1;
    sidan = sidan*10;
    let id = 0;
      const userList = users ?
        <div>
          {
            users.response.items.map((i, index) => {
              if (index == 0) {
                prev = users.response.links.prev;
                next = users.response.links.next;
              }
              console.log(index);
              id = sidan + index;
              return (
                <ul>

                  <Link to={"users/" + id + "/read"}>
                    <li>{i.name}</li>
                  </Link>
                </ul>
              );
            })
          }
        </div>
        : isAuthenticated ? < p > Hleð inn gögnum</p> : <p>Vinsamlegast skráðu þig inn</p>
    return (
      <div>
        <h2> Notendur </h2>
        {userList}
        <div className="takkar">
          {page > 1 ? <button className="backButton" onClick={this.backwardHandler}>Aftur um síðu</button> : null}
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