import { gql } from 'apollo-server-express';
const typeDefs = gql`
  type Flashcard {
    _id: ID!
    flashinfo: String!
  }
  type Query {
    getFlashcard(_id: ID!): Flashcard
    allFlashcards: [Flashcard]
  }
  input FlashcardCreateInput {
    flashinfo: String!
  }
  input FlashcardUpdateInput {
    flashinfo: String
  }
  type Mutation {
    createFlashcard(input: FlashcardCreateInput) : Flashcard
    updateFlashcard(_id: ID!, input: FlashcardUpdateInput): Flashcard
    deleteFlashcard(_id: ID!) : Flashcard
  }
`;
export default typeDefs;
