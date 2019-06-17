import React from "react";
import PropTypes from "prop-types";
import Img from 'gatsby-image';
import {Link} from 'gatsby';

const Card = ({id, title, blurb, thumbnail}) => (
    <li className="card" data-id={id}>
        <div className="card-body">
            <div className="card-content">
                <h3><Link to={'/portfolio/' + id}>{title}</Link></h3>
                {blurb ? (
                    <div className="card-blurb">{blurb}
                        <div className="card-action">View Project Detail</div>
                    </div>) : null}
            </div>
            {thumbnail ? <div className="card-thumbnail"><Img fluid={thumbnail}/></div> : null}
        </div>
    </li>
);

Card.defaultProps = {
    id: ``,
    title: ``,
    blurb: ``,
    thumbnail: null
};

Card.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    blurb: PropTypes.string,
    thumbnail: PropTypes.object
};

export default Card
