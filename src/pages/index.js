import React from 'react';
import { graphql, Link } from 'gatsby';

import Heart from '../components/heart';
import User from '../components/user';

const truncateString = (str) => {
  if (str && str.length >= 100) {
    return `${str.slice(0, 100)}...`;
  } else {
    return str;
  }
};

const Page = ({
  data: {
    allNycPhoto: { nodes }
  }
}) => {
  return (
    <main className="container mx-auto max-w-5xl grid gap-16 p-8">
      <div className="grid gap-6">
        <h1 className="text-5xl font-black grid gap-1">
          <span>Unsplash NYC</span>
          <span className="text-brand-primary">Photographs</span>
        </h1>
        <div>
          <h2 className="text-lg">
            {`Displaying ${nodes.length} photos sourced from `}
            <a className="text-brand-default" href="https://unsplash.com/" rel="nopener">
              Unsplash
            </a>
          </h2>
          <span className="font-black">Black and hite photos tagged with NYC</span>
        </div>
      </div>
      <ul className="grid gap-8">
        {nodes.map((item, index) => {
          const {
            slug,
            description,
            alt_description,
            user: { name },
            urls: { small },
            likes
          } = item;
          return (
            <li
              key={index}
              className="cursor-pointer flex flex-col shadow-md rounded-lg overflow-hidden bg-gray-50 transform transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white"
            >
              <Link to={slug}>
                <div className=" grid sm:grid-cols-auto-1fr capitalize">
                  <div className="relative w-full h-auto sm:w-200 sm:h-200">
                    <div className="sm:absolute top-0 left-0 w-full h-full bg-cover bg-center z-1">
                      <img src={small} alt={alt_description} className="object-cover object-center w-full h-full" />
                    </div>
                  </div>

                  <div className="grid gap-4 p-4">
                    <div className="text-lg sm:text-2xl font-black">
                      <span className="text-brand-primary">{`#${index + 1}`}</span>
                      <h2 className="mb-2">{truncateString(description)}</h2>
                      <p className="text-sm font-normal">{alt_description}</p>
                    </div>
                    <div className="grid grid-cols-auto-1fr gap-4 items-end text-sm">
                      <div className="grid grid-cols-auto-1fr gap-1 items-center">
                        <User />
                        {name}
                      </div>
                      <div className="grid grid-cols-auto-1fr gap-1 items-center">
                        <Heart />
                        {likes}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export const query = graphql`
  {
    allNycPhoto(sort: { order: DESC, fields: likes }) {
      nodes {
        slug
        description
        alt_description
        user {
          name
        }
        urls {
          small
        }
        likes
      }
    }
  }
`;

export default Page;
