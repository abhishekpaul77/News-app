import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loadlogo from "./Loadlogo";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    // const url = `https:newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    if (props.searchQuery) {
      url += `&q=${props.searchQuery}`;
    } else {
      url += `&category=${props.category}`;
    }
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setarticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `Rozana - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  }, [props.searchQuery]);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}${props.searchQuery ? `&q=${props.searchQuery}` : ""}`;
    setPage(page + 1);
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      if (parsedData.articles && parsedData.articles.length > 0) {
        setarticles((prevArticles) => prevArticles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        Rozana - {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Loadlogo />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loadlogo />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageURL={element.urlToImage}
                    newsURL={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
// import React, {useEffect, useState} from 'react'
// import NewsItem from './NewsItem'
// import Loadlogo from './Loadlogo'
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";

// const News = (props)=>{
//     const [articles, setarticles] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [page, setPage] = useState(1)
//     const [totalResults, setTotalResults] = useState(0)

//     const capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }

//     const updateNews = async ()=>{
//         props.setProgress(10);
//         const url = `https:newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
//         setLoading(true)
//         let data = await fetch(url);
//         props.setProgress(30);
//         let parsedData = await data.json()
//         props.setProgress(70);
//         setarticles(parsedData.articles)
//         setTotalResults(parsedData.totalResults)
//         setLoading(false)
//         props.setProgress(100);
//     }

//     useEffect(() => {
//         document.title = `Rozana - ${capitalizeFirstLetter(props.category)}`;
//         updateNews();
//         // eslint-disable-next-line
//     }, [])

//     const fetchMoreData = async () => {
//         const url = `https:newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
//         setPage(page+1)
//         let data = await fetch(url);
//         let parsedData = await data.json()
//         setarticles(articles.concat(parsedData.articles))
//         setTotalResults(parsedData.totalResults)
//       };

//         return (
//             <>
//                 <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>Rozana - {capitalizeFirstLetter(props.category)} Headlines</h1>
//                 {loading && <Loadlogo/>}
//                 <InfiniteScroll
//                     dataLength={articles.length}
//                     next={fetchMoreData}
//                     hasMore={articles.length !== totalResults}
//                     loader={<Loadlogo/>}
//                 >
//                     <div className="container">

//                     <div className="row">
//                         {articles.map((element) => {
//                             return <div className="col-md-4" key={element.url}>
//                                 <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//                             </div>
//                         })}
//                     </div>
//                     </div>
//                 </InfiniteScroll>
//             </>
//         )

// }

// News.defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general',
// }

// News.propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
// }

// export default News

//---------CBC----------
// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import Loadlogo from './Loadlogo'
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
//     static defaultProps = {
//         country: 'in',
//         pageSize: 8,
//         category: 'general',
//     }

//     static propTypes = {
//         country: PropTypes.string,
//         pageSize: PropTypes.number,
//         category: PropTypes.string,
//     }
//     capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }
//     constructor(props) {
//         super(props);
//         this.state = {
//             articles: [],
//             loading: true,
//             page: 1,
//             totalResults: 0
//         }
//         document.title = `Rozana - ${this.capitalizeFirstLetter(this.props.category)} Headlines`;
//     }

//     async updateNews() {
//         this.props.setProgress(10);
//         const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//         // this.setState({ loading: true });
//         let data = await fetch(url);
//         this.props.setProgress(30);
//         let parsedData = await data.json()
//         this.props.setProgress(70);
//         this.setState({
//             articles: parsedData.articles,
//             totalResults: parsedData.totalResults,
//             loading: false,
//         })
//         this.props.setProgress(100);

//     }
//     async componentDidMount() {
//         this.updateNews();
//     }

//     handlePrevClick = async () => {
//         this.setState({ page: this.state.page - 1 });
//         this.updateNews();
//     }

//     handleNextClick = async () => {
//         this.setState({ page: this.state.page + 1 });
//         this.updateNews()
//     }

//     fetchMoreData = async () => {
//       this.setState({page: this.state.page + 1})
//       const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
//         let data = await fetch(url);
//         let parsedData = await data.json()
//         this.setState({
//             articles: this.state.articles.concat(parsedData.articles),
//             totalResults: parsedData.totalResults

//         })
//       };

//     render() {
//         return (
//             <>
//                 <h1 className="text-center" style={{ margin: '35px 0px' }}>Rozana - {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
//                 {this.state.loading && <Loadlogo/>}
//                 <InfiniteScroll
//                     dataLength={this.state.articles.length}
//                     next={this.fetchMoreData}
//                     hasMore={this.state.articles.length !== this.state.totalResults}
//                     loader={<Loadlogo/>}
//                 >
//                     <div className="container">

//                     <div className="row">
//                         {this.state.articles.map((element) => {
//                             return <div className="col-md-4" key={element.url}>
//                                 <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageURL={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//                             </div>
//                         })}
//                     </div>
//                     </div>
//                 </InfiniteScroll>

//             </>
//         )
//     }
// }

// export default News
