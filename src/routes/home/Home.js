import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkLogin } from '../../actions/auth';
import './home.css';

class Home extends Component {
  state = {isLoggedIn:false};

  onHeaderClick = (header) => {
    return (e) => {
      console.log('presses');
    }
  }
  render() {
    const maybeToken = localStorage.getItem("Token")
    if (maybeToken) {
    this.props.checkLogin(maybeToken);
    }
    const { isAuthenticated } = this.props;
    const visible = isAuthenticated ?
    <div className ="IsLoggedIn">
    <h2> Velkominn á bókasafnið</h2>
    <div className="loggedText">
      <p>Þú ert skráður notandi og getur því </p>
      <p><Link to="/updateBook">skráð bækur</Link></p>
      <p> og </p>
        <p><Link to ="/books">breytt þeim sem til eru.</Link></p>
        </div>
         <p>Einnig geturu <Link to ="/users">skoðað aðra notendur</Link> </p>
    </div>:
    <div className="isNotLoggedIn">
    <h2> Velkominn á bókasafnið</h2>
      <p> Til að njóta bókasafnsins til fullnustu
      við með að skrá sig inn. Þangað til getur þú skoðað
      <a href="/books"> allar bækur </a></p>
    </div>
    return (
      <div className="mainPageContainer">
        {visible}
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
const mapStateToProps = state => ({
  data: state.books.items,
  back: false,
  isAuthenticated: state.auth.isAuthenticated,
  forward: false,
  error: null,
  linkur: null,
  next: null,
  count: 1,
});

export default connect(mapStateToProps, { checkLogin })(Home);

