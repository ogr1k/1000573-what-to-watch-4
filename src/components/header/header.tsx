import * as React from "react";
import {AuthorisationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../constants.js";
import {Link} from "react-router-dom";


interface Props {
  authorisationStatus: string;
}

const UserBlock: React.FunctionComponent<Props> = (props: Props) => {

  const {authorisationStatus} = props;

  return (

    <header className="page-header movie-card__head">
      <div className="logo">
        <Link to={AppRoute.ROOT} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="user-block">

        {authorisationStatus === AuthorisationStatus.AUTH
          ?
          <Link to={AppRoute.MYLIST}>
            <div className="user-block__avatar">
              <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </Link>
          :
          <Link to={AppRoute.MYLIST} className="user-block__link">Sign in</Link>
        }

      </div>
    </header>
  );
};

export default UserBlock;
