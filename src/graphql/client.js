// import ApolloClient from 'apollo-boost'

//  const client = new ApolloClient({
//    uri: 'https://react-music-shares.herokuapp.com/v1/graphql'
//  })

//  export default client
import {gql} from 'apollo-boost'
import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { GET_QUEUED_SONGS } from './queries'

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
  `,
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, {input}, {cache}) => { // we can work w/ the cache to take whats in it currently (empty array) then add/remove songs from it
        const queryResult =  cache.readQuery({
        query: GET_QUEUED_SONGS
        })

        if (queryResult) {
          const {queue} = queryResult //remember that queue is an array we destructured

          const isInQueue = queue.some(song => song.id === input.id) //we will check the song's id to see if it is already in the queue. If it IS already there, then we will delete, otherwisem we will add

        // if it IS in the queue, we will remove it by returning a filtered array consisting of all other songs, otherwise we return the current queue anda add in the new "input" aka user pasted song
          const newQueue =  isInQueue ? queue.filter(song => song.id !== input.id) : [...queue, input]
          cache.writeQuery({
            query: GET_QUEUED_SONGS,
            data: {queue: newQueue}
          })
          return newQueue
        }
        return []
      }
    }
  }
})

const data = {
  queue: []
}

client.writeData({data})
export default client
