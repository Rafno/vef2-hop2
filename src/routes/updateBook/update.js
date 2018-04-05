import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class update extends Component {
    state = {
        title: '',
        author: '',
        about:'',
      }
      handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name) {
            if(e.target.id === 'title'){
                this.setState({[name]:value, title:e.target.value});
            }
            if(e.target.id === 'author'){
                this.setState({[name]:value, author:e.target.value});
            }
            console.log(e.target.id);
            console.log(e.target.value);
        }
    }
buttonHandler = () => {
    const {title, author } = this.state;
    console.log(title, author,'ég komst ')
}
  render() {
    const { title, author, about} = this.state;
    return(
        <div>
            <h2> Breyta bók </h2>
            <div>
                <label htmlFor="username">Titill:</label>
                <input id="title" type="text" name="title" value={title} onChange={this.handleInputChange} />
            </div>
            <div>
                <label htmlFor="username">Höfundur:</label>
                <input id="author" type="text" name="author" value={author} onChange={this.handleInputChange} />
            </div>
            <div>
                <legend htmlFor="user">Lýsing</legend>
                <textarea rows="5" cols="50">
                <input id="text" type="text" name="about" value={about} onChange={this.handleInputChange}/>
                </textarea>
            </div>

            <button onClick = {this.buttonHandler}> Submit </button>

      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default update;