import React from "react"
import PropTypes from "prop-types"
import Img from 'gatsby-image'

const Card = ({id, title, blurb, thumbnail}) => (
    <div className="card" data-id={id}>
        <div className="card-body">
            <div className="card-content">
                <h3>{title}</h3>
                {blurb ? (
                    <div className="card-blurb">{blurb}
                        <div className="card-action"><a href={'?portfolio=' + id}>View Project Detail</a></div>
                    </div>) : null}
            </div>
            {thumbnail ? <div className="card-thumbnail"><Img fluid={thumbnail}/></div> : null}
        </div>
    </div>
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
