import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class update extends Component {
    state = {
        title: '',
        author: '',
        about:'',
        category:'',
        isbn10:'',
        isbn13:'',
        released:'',
        pageCount:'',
        language:'',
      }
      handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name) {
            console.log(name);
            if(e.target.id === 'title'){
                this.setState({[name]:value, title:e.target.value});
            }
            if(e.target.id === 'author'){
                this.setState({[name]:value, author:e.target.value});
            }
            if(e.target.id === 'about'){
                this.setState({[name]:value, about:e.target.value});
            }
            if(e.target.id === 'category'){
                this.setState({[name]:value, categories:e.target.value});
            }
            if(e.target.id === 'isbn10'){
                this.setState({[name]:value, isbn10:e.target.value});
            }
            if(e.target.id === 'isbn13'){
                this.setState({[name]:value, isbn13:e.target.value});
            }
            if(e.target.id === 'released'){
                this.setState({[name]:value, released:e.target.value});
            }
            if(e.target.id === 'pageCount'){
                this.setState({[name]:value, pageCount:e.target.value});
            }
            if(e.target.id === 'language'){
                this.setState({[name]:value, language:e.target.value});
            }
        }
    }
    buttonHandler = (e) => {
        const {title, author, about, category, isbn10, isbn13, released, pageCount, language } = this.state;
        console.log(`title is ${title}
                    author ${author}
                    about ${about}
                    category ${category}
                    isbn10 ${isbn10}
                    isbn13 ${isbn13}
                    released ${released}
                    pagecount ${pageCount}
                    language ${language}`);
    }
    generateOptions(categories, currentCategory) {
        return categories.map( (x, i) => {
         return (<option key={i} value={x}>{x}</option>)
        });
    }
  render() {
    const { title, author, category, isbn10, isbn13, released, pageCount, language} = this.state;
    // TODO FALL SÆKJA ÖLL CATEGORIES
    const allCategories = ['fiction', 'mistery', 'horror', 'thriller', 'drama', 'romance'];
    const options = this.generateOptions(allCategories, category);
    const about = "tommy was a little boy";
    return(
        <div>
            <h2> Breyta bók </h2>
            <div>
                <label htmlFor="username">Titill:</label>
                <input id="title" type="text" name="title" value={title} onChange={this.handleInputChange} />
            </div>
            <div>
                <label htmlFor="">Höfundur:</label>
                <input id="author" type="text" name="author" value={author} onChange={this.handleInputChange} />
            </div>
            <div>
                <legend htmlFor="about">Lýsing</legend>
                <textarea rows="5" cols="50" id="about" type="text" name="about" onChange={this.handleInputChange}>
                {about}
                </textarea>
            </div>
            <div>
                <lable htmlFor="category" >Flokkur:</lable>
                <select id="category" name="category" defaultValue={category} onChange={this.handleInputChange}>
                    {options}
                </select>
            </div>
            <div>
                <label htmlFor="isbn10">ISBN10:</label>
                <input id="isbn10" type="text" name="isbn10" value={isbn10} onChange={this.handleInputChange} />
            </div>
            <div>
                <label htmlFor="isbn13">ISBN13:</label>
                <input id="isbn13" type="text" name="isbn13" value={isbn13} onChange={this.handleInputChange} />
            </div>
            <div>
                <label htmlFor="released">Útgefin:</label>
                <input id="released" type="text" name="released" value={released} onChange={this.handleInputChange} />
            </div>
            <div>
                <label htmlFor="pageCount">Fjöldi síða:</label>
                <input id="pageCount" type="text" name="pageCount" value={pageCount} onChange={this.handleInputChange} />
            </div>
            <div>
                <label htmlFor="language">Tungumál:</label>
                <input id="language" type="text" name="language" value={language} onChange={this.handleInputChange} />
            </div>

            <button onClick = {this.buttonHandler}> Submit </button>

      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default update;