import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CreateBook } from '../../actions/auth';
import {UpdateBookById} from '../../actions/auth';
import { connect } from 'react-redux';


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
      async componentDidMount() {
        const path = this.props.location.pathname;
        if (path.includes('edit')){
            console.log("im altering");
            await this.setState( { action:"Breyta" });
        } else if (path.includes('new')) {
            console.log("changing stuff for new");
            await this.setState( { loading: false, action:'Ný bók'});
        }
        const { action } = this.state;
        console.log('action is');
        console.log(action);
        if (action==="Breyta") {
            console.log("chagingin");
            try {
                const str = window.location.pathname;
                const hlutur = str.split('/');
                const url = 'https://verkefni2server.herokuapp.com/'+hlutur[1]+'/'+hlutur[2];
                console.log(url);
                const data = await this.fetchData(url);
                console.log(data);
                console.log(data.gogn[0].category)
                this.setState({
                    data, loading: false,
                    title: data.gogn[0].title,
                    author: data.gogn[0].author,
                    category:data.gogn[0].category,
                    isbn10: data.gogn[0].isbn10,
                    isbn13: data.gogn[0].isbn13,
                    released: data.gogn[0].published,
                    pageCount: data.gogn[0].pagecount,
                    language: data.gogn[0].language,
                    description: data.gogn[0].description,
                    sluggid:hlutur[2],
                });
            } catch (e) {
                console.error('Error fetching navigation', e);
                this.setState({ error: true, loading: false});
            }
        }
      }
      async fetchData(url) {
        const {linkur} = this.state;
        const link = url;
        let data = null;
        const response = await fetch(link);
        data = await response.json();
        return data;
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
        const {title, author, about, category, isbn10, isbn13, released, pageCount, language, sluggid, action } = this.state;
        if (action === "Ný bók") {
            this.props.CreateBook(title, author, about, parseInt(isbn10,10), parseInt(isbn13,10), released, parseInt(pageCount,10), language, category);
        } else if (action === "Breyta") {
            this.props.UpdateBookById(title, author, about, parseInt(isbn10,10), parseInt(isbn13,10), released, parseInt(pageCount,10), language, category, sluggid);
        }
    }
    generateOptions(categories, currentCategory) {
        return categories.map( (x, i) => {
         return (<option key={i} value={x}>{x}</option>)
        });
    }
  render() {
    const { title, author, category, isbn10, isbn13, released, pageCount, language, description, action} = this.state;
    // TODO FALL SÆKJA ÖLL CATEGORIES
    const allCategories = ['Science Fiction', 'Fantasy', 'Fiction', 'Computer Science', 'Comic', 'Nonfiction', 'Business',
                            'Psychology', 'Horror', 'Design', 'Economics', 'Graphic Novel'];
    const options = this.generateOptions(allCategories, category);
    return(
        <div>
            <h2>{action}</h2>
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
                <textarea rows="5" cols="50" id="about" type="text" value ={description} name="about" onChange={this.handleInputChange}>
                </textarea>
            </div>
            <div>
                <lable htmlFor="category" >Flokkur:</lable>
                <select id="category" name="category" value={category} onChange={this.handleInputChange}>
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
            <button>
               <Link to={`/books/${this.state.sluggid}`}> Til baka</Link>
            </button>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      isFetching: state.auth.isFetching,
      isAuthenticated: state.auth.isAuthenticated,
      message: state.auth.message,
    }
  }

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default connect (mapStateToProps, {CreateBook, UpdateBookById})(update);