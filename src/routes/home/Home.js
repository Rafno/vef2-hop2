import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './home.css';

class Home extends Component {
  state = {isLoggedIn:false};

  onHeaderClick = (header) => {
    return (e) => {
      console.log('presses');
    }
  }
  render() {
    const { isAuthenticated } = this.props;
    const visible = isAuthenticated ?
    <div className ="IsLoggedIn">
    <h2> Velkominn á bókasafnið</h2>
      <p>Þú ert skráður notandi og getur því</p>
      <p><a href="/updateBook"> skráð bækur</a></p>
      <p>og breytt þeim sem til eru Einnig geturu skoðað aðra notendur </p>
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

export default connect(mapStateToProps)(Home);

