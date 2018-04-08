import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/book';
import { get } from '../../api';

/**
 * Hér mun þessi compnent sjá um alla listann af bókunum og getur valið spes bók.
 */

class books extends Component {

  constructor(props) {
      super(props);
      this.state = { 
        back:false, 
        forward:false,
        data:null, 
        error:null, 
        linkur:null,
        next:null,
        count:1,
      };

      this.forwardHandler = this.forwardHandler.bind(this);
      this.backwardHandler = this.backwardHandler.bind(this);
  }

  getQueryVariable(variable) {
       const query = window.location.search.substring(1);
       const vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               let pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
  }
  async componentDidMount() {
    this.props.fetchBooks();
  } 
  async forwardHandler(event) {
    const {back, forward, data, count} = this.state;
    const linkur = data.links.next.href.toString();
    if(linkur){
      const gogn = await this.fetchData(linkur);
      const inc = count+1;

      await this.setState({ data: gogn, loading: false, count:inc });
    }
  }

  async backwardHandler(event) {
    const {back, forward, data, count} = this.state;
    const linkur = data.links.prev.href.toString();
    if(linkur){
      const gogn = await this.fetchData(linkur);
      const dec = count-1;

      await this.setState({ data: gogn, loading: false, count:dec});
    }
  }

  render() {
    const {data, error, teljari} = this.props;
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