import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class Home extends Component {
  state = {isLoggedIn:true,hello:52};

  onHeaderClick = (header) => {
    return (e) => {
      console.log('presses');
    }
  }
  render() {
    /* todo birta mismunandi upplýsingar ef innskráður notandi eða ekki */
    console.log(this.state.isLoggedIn,'jjj',this.state.hello)
    const visible = this.state.isLoggedIn ?
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
      <div>
        {visible}
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Home;
