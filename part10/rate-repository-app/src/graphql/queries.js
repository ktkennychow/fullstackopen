import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
  query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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

export const CHECK_USER = gql`
{
  me {
    id
    username
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
  query ($repositoryId: ID!){
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
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

