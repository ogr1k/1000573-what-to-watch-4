import * as React from "react";


interface Props {
  notFoundError?: boolean;
}

const ServerError: React.FunctionComponent<Props> = (props: Props) => {

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


export default ServerError;
