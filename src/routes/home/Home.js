import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Home extends Component {
  state = {isLoggedIn:true};
  render() {
    /* todo birta mismunandi upplýsingar ef innskráður notandi eða ekki */
    const visible = this.state.isLoggedIn ?
    <div className ="IsLoggedIn">
      <p>Þú ert skráður notandi og getur því skráð bækur og breytt þeim sem til eru</p>
      <p> Einnig geturu skoðað aðra notendur </p>
    </div>:
    <div className="isNotLoggedIn">
      <p> Til að njóta bókasafnsins til fullnustu mælum
      við með að skrá sig inn. Þangað til getur þú skoðað allar bækurnar.</p>
    </div>
    return (
      <div>
      <h2> Velkominn á bókasafnið</h2>
        {visible}
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Home;
