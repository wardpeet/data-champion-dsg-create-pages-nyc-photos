import React from 'react';
import { graphql, Link } from 'gatsby';
import LeftArrow from '../components/left-arrow';
import RightArrow from '../components/right-arrow';

const Template = ({
  data: {
    nycPhoto: {
      description,
      alt_description,
      urls: { regular }
    }
  },
  pageContext
}) => {
  return (
    <main>
      <div className="relative grid gap-4 bg-black text-white opacity-80 p-4 z-20">
        <Link to="/" className="relative grid grid-cols-auto-1fr">
          <LeftArrow />
          Back
        </Link>
        <h1 className="font-black text-3xl capitalize">{description}</h1>
      </div>
      <div className="absolute top-0 left-0 w-full h-screen z-10">
        <div className="flex justify-between items-center w-full h-screen">
          {pageContext.prev ? (
            <Link className="bg-white text-black p-4 opacity-80 font-bold capitalize" to={`/${pageContext.prev.slug}`}>
              <LeftArrow />
            </Link>
          ) : (
            <div />
          )}
          {pageContext.next ? (
            <Link className="bg-white text-black p-4 opacity-80 font-bold capitalize" to={`/${pageContext.next.slug}`}>
              <RightArrow />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-screen bg-cover bg-center z-1">
        <img src={regular} alt={alt_description} className="object-cover w-full h-full" />
      </div>
    </main>
  );
};

export const query = graphql`
  query ($id: String) {
    nycPhoto(id: { eq: $id }) {
      description
      alt_description
      user {
        name
        twitter_username
        portfolio_url
        profile_image {
          small
        }
        bio
        for_hire
      }
      urls {
        regular
      }
      likes
      created_at
    }
  }
`;

export default Template;
