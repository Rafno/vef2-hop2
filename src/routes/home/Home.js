import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Home extends Component {
  state = {isLoggedIn:false};

  onHeaderClick = (header) => {
    return (e) => {
      console.log('presses');
    }
  }
  render() {
    /* todo birta mismunandi upplýsingar ef innskráður notandi eða ekki */
    const visible = this.state.isLoggedIn ?
    <div className ="IsLoggedIn">
    <h2> Velkominn á bókasafnið</h2>
      <p>Þú ert skráður notandi og getur því skráð bækur og breytt þeim sem til eru</p>
      <p> Einnig geturu skoðað aðra notendur </p>
    </div>:
    <div className="isNotLoggedIn">
    <h2> Velkominn á bókasafnið</h2>
      <p> Til að njóta bókasafnsins til fullnustu
      við með að skrá sig inn. Þangað til getur þú skoðað</p>
      <a href ="/books"> allar bækur </a>
    </div>
    return (
      <div>
        {visible}
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Home;
