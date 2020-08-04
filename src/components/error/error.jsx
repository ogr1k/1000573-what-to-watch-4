import React from "react";
import PropTypes from "prop-types";


const ServerError = (props) => {

  return (
    <div id="servererror">
      <div className="servererror">
        <div className="servererror-message">
          <h1>Oops!</h1>
          <h2>{props.notFoundError ? `404 ERROR Page not found` : `SERVER UNAVAILABLE`}</h2>
        </div>
      </div>
    </div>
  );
};

ServerError.propTypes = {
  notFoundError: PropTypes.bool
};

export default ServerError;
