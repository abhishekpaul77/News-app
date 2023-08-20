import React /*, { Component }*/ from "react";

const NewsItem =(props) =>{
  // render() {
    let { title, description, imageURL, newsURL, source, publishedAt, author } = props;
    return (
      <div className="my-3">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={
              !imageURL
                ? "https:upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                : imageURL
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}...{" "}
              <span className="badge rounded-pill bg-success">New</span>
            </h5>

            <p className="card-text">{description}...</p>
            <small className="text-body-secondary">
              By {author} on {new Date(publishedAt).toGMTString()}
            </small>
            <a
              rel="noreferrer"
              href={newsURL}
              target="_blank"
              className="btn btn-sm btn-dark d-flex justify-content-center"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  // }
}

export default NewsItem;