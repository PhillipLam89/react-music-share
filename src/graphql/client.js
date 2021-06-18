// import ApolloClient from 'apollo-boost'

//  const client = new ApolloClient({
//    uri: 'https://react-music-shares.herokuapp.com/v1/graphql'
//  })

//  export default client
import {gql} from 'apollo-boost'
import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://react-music-shares.herokuapp.com/v1/graphql',
    options: {
      reconnect: true
    }
  }),
  cache: new InMemoryCache(), //typeDefs allows us to write local and custom mutations for Apollo, this will be used to manage state of position of queued songs instead of using React Context or useReducer since those cannot easily access the browser
  typeDefs: gql `
    type Song {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }

    input SongInput {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }

    type Query {
      queued: [Song]!
    }
    type Mutation {
      addOrRemoveFromQueue(input: SongInput!): [Song]!
    }
  `
})

const data = {
  queue: []
}

client.writeData({data})
export default client
