import ApolloClient from 'apollo-boost'

 const client = new ApolloClient({
   uri: 'https://react-music-shares.herokuapp.com/v1/graphql'
 })

 export default client
