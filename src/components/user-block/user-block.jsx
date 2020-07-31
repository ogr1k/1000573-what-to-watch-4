import React from "react";
import {AuthorisationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../constants.js";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const UserBlock = (props) => {

  const {authorisationStatus} = props;

  return (

    <div className="user-block">
      {authorisationStatus === AuthorisationStatus.NO_AUTH
        ? <Link to={AppRoute.LOGIN} className="user-block__link"> Sign-in </Link>
        : (
          <Link to={AppRoute.MYLIST}>
            <div className="user-block__avatar">
              <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </Link>
        )
      }
    </div>

  );
};

UserBlock.propTypes = {
  authorisationStatus: PropTypes.string.isRequired
};


export default UserBlock;
