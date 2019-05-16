import React from "react"
import PropTypes from "prop-types"
import Img from 'gatsby-image'

const Timeline = ({label, image, alignRight, content}) => (
    <div className="timeline" data-align={alignRight ? 'right' : 'left'}>
        {label ? <div className="timeline-label">{label}</div> : null}
        <div className="timeline-body">
            {image ? <div className="timeline-background"><Img fluid={image}/></div> : null}
            {content ? <div className="timeline-content">
                <div dangerouslySetInnerHTML={{__html: content}}/>
            </div> : null}
        </div>
    </div>
);

Timeline.defaultProps = {
    label: ``,
    image: null,
    alignRight: true,
    content: ``
};

Timeline.propTypes = {
    label: PropTypes.string,
    image: PropTypes.object,
    alignRight: PropTypes.bool,
    content: PropTypes.string.isRequired
};

export default Timeline
