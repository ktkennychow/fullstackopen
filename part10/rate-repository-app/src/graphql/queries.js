import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
  query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
      pageInfo {
      endCursor
      hasNextPage
      startCursor
      }
      edges {
        node {
          language
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          description
          fullName
          name
          ownerAvatarUrl
          ownerName
          id
        }
      }
    }
  }
`;

export const AUTHENTICATION = gql`
  mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    },
  }`

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
        id
        username
        reviews @include(if: $includeReviews) {
          edges {
            node {
              text
              rating
              createdAt
              id
              repository {
                fullName
                ownerName
                id
              }
            }
          }
    }
    }
  }
`

export const GET_SINGLE_REPO = gql`
  query ($repositoryId: ID!){
    repository(id: $repositoryId) {
      language
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      description
      fullName
      name
      ownerAvatarUrl
      ownerName
      id
      url
    }
  }
`

export const GET_REPO_REVIEW = gql`
  query Query($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    reviews(first: $first, after: $after) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      edges {
        node {
          id
          rating
          createdAt
          repositoryId
          text
          user {
            id
            username
          }
        }
        cursor
      }
    }
  }
}
`

export const CREATE_REVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`
export const DELETE_REVIEW = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`
