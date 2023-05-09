import { gql } from "graphql-request";

const AllPosts = gql`
  query AllPosts {
    blogPosts(orderBy: publishedAt_DESC) {
      body
      createdAt
      title
      id
      slug
      updatedAt
      displayImage {
        url
        width
        height
      }
    }
  }
`;

const SinglePost = gql`
  query SinglePost($slug: String!) {
    blogPost(where: { slug: $slug }) {
      body
      createdAt
      title
      id
      slug
      updatedAt
      displayImage {
        url
        width
        height
      }
    }
  }
`;

export { AllPosts, SinglePost };
