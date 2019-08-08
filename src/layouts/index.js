import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import './footer.scss';
import '../styles/styles.scss';
import 'webslides/static/css/webslides.css';
import '../../static/css/animation.css';
import '../../static/css/fontawesome.css';

const Footer = ({ name, title, date }) => (
  <footer className="metadata">
    <div className="wrap">
      <Link to="/slides" className="alignleft">
        <span>{name}</span> — <span className="title">{title}</span>
      </Link>
      <time className="alignright">{date}</time>
    </div>
  </footer>
);

const TemplateWrapper = ({ content, site, ...props }) => {
  return (
    <div>
      <Helmet
        title={`${site.siteMetadata.title} — ${site.siteMetadata.name}`}
      />
      <article id="webslides" style={{'width': '100%'}} dangerouslySetInnerHTML={{ __html: content }} />
      <Footer
        name={site.siteMetadata.name}
        title={site.siteMetadata.title}
        date={site.siteMetadata.date}
      />
    </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
};

export default props => {
  return (
    <StaticQuery
      query={graphql`
        query IndexQuery {
          site {
            siteMetadata {
              name
              title
              date
            }
          }
          allSlide {
            edges {
              node {
                id
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <TemplateWrapper
            site={data.site}
            content={props.pageContext.content}
            {...props}
          />
        );
      }}
    />
  )
};
