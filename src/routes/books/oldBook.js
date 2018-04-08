import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBooks, getbookByID } from '../../actions/book';
import { get } from '../../api';

/**
 * Hér mun þessi compnent sjá um alla listann af bókunum og getur valið spes bók.
 */

class books extends Component {

  constructor(props) {
    super(props);
    this.state = {
      back: false,
      forward: false,
      data: null,
      error: null,
      linkur: null,
      next: null,
      count: 1,
    };

    this.forwardHandler = this.forwardHandler.bind(this);
    this.backwardHandler = this.backwardHandler.bind(this);
  }

  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
  }

  async componentDidMount() {
    this.props.fetchBooks("https://verkefni2server.herokuapp.com/books?offset=0&limit=10&books");
    const searchParam = this.getQueryVariable("query");
    try {
      if (searchParam) {
        const baseUrl = "https://verkefni2server.herokuapp.com/books?search=";
        this.props.fetchBooks(baseUrl + searchParam);
      }
    } catch (e) {
      console.error('Error fetching navigation', e);
      this.setState({ error: true, loading: false });
    }
  }

  async forwardHandler(event) {
    const { count } = this.state;
    const pageCount = count + 1;
    const nextUrl = await this.props.data.links.next;
    this.props.fetchBooks(nextUrl.href);
    this.setState({ count: pageCount });
  }

  async backwardHandler(event) {
    const { count } = this.state;
    try {
      const pageCount = count - 1;
      const PrevUrl = await this.props.data.links.prev;
      this.props.fetchBooks(PrevUrl.href);
      this.setState({ count: pageCount });
    } catch (e) {

    }
  }

  render() {
    let { data, error, teljari } = this.props;
    if (data.response) {
      data = data.response;
    }
    try {
      const books = data.items
      let bakkari = true;
      let frammari = true;
      const view1 = bakkari ? <div><button>Aftur um síðu</button></div> : null;
      const view2 = frammari ? <div> <button>Áfram um síðu</button></div> : null
      return (
        <div className="BookList">
          <h2> Bækur </h2>
          {books.map((i, index) => {
            const slug = i.id
            const url = "/book/" + slug
            return (
              <ul className="listarnir">
                <Link to={url}>
                  <li> {i.title}</li>
                </Link>
                <li> {i.author} </li>
              </ul>
            );
          })}
          <div className="takkar">
            {<button className="backButton" onClick={this.backwardHandler}>{view1}</button>}
            {"Síða númer: " + this.state.count}
            {<button className="forwardButton" onClick={this.forwardHandler}>{view2}</button>}
          </div>
        </div>
      );
    }
    catch (e) {
      return (
        <div>
          <p>Sæki gögn...</p>
        </div>
      );
    }
  }
}

/* Leið til að setja upp nýja bók.
componentWillReceiveProps(nextProps) {
if (nextProps.newPost) {
this.props.posts.unshift(nextProps.newPost);
}
}
*/
books.propTypes = {
  fetchBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  data: state.books.items,
  back: false,
  forward: false,
  error: null,
  linkur: null,
  next: null,
  count: 1,
});

export default connect(mapStateToProps, { fetchBooks })(books);
