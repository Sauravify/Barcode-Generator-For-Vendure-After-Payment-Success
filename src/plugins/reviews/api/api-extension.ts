import gql from 'graphql-tag';

export const apiExtensions = gql`
    type ProductReview implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        product: Product!
        productId: ID!
        rating: Float!
    }

    extend type Query {
        productReviews(productId: ID!): [ProductReview!]!
    }
`;
