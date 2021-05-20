// import { gql } from '@apollo/client'

// export const FETCH_RESTAURANTS = gql`
// query restaurants {
//     restaurants {
//       id
//       name
//       operationHours
//       offDays
//       setOne
//       setTwo
//       setThree
//       setFour
//       setFive
//     }
//   }
// `

// export const RESTAURANT_DETAILS = gql`
// query restaurant ($restaurantId: ID) {
//   restaurant(id: $restaurantId) {
//     id
//     name
//     operationHours
//     offDays
//     setOne
//     setTwo
//     setThree
//     setFour
//     setFive
//   }
// }
// `

// export const USER_PROFILE = gql`
// query user {
//   user {
//     id
//     username
//     firstName
//     lastName
// 		cart {
//       restaurant
//       restaurantId
//       foods {
//         name
//         quantity
//       }
//     }
//     orderHistory {
//       date
//       restaurant
//       foods {
//         name
//         quantity
//         price
//         totalPrice
//       }
//       totalPaid
//     }
//   }
// }
// `

// export const USER_LOGIN = gql`
// query login ($username: String!, $password: String!) {
//   loginAccount(username: $username, password: $password) {
//   	response 
//   }
// }
// `

// export const USER_REGISTER = gql`
// mutation register ($username:String!, $password: String!, $firstName: String!, $lastName: String!) {
//   registerAccount (username: $username, password: $password, firstName: $firstName, lastName: $lastName) {
//     id,
//     username,
//     firstName,
//     lastName
//   }
// }
// `

// export const UPDATE_CART = gql`
// mutation addToCart ($restaurantId: ID!, $restaurantName: String!, $foodName: String!, $quantity: Int!) {
//   addToCart (restaurantId: $restaurantId, restaurantName: $restaurantName, foodName: $foodName, quantity: $quantity) {
//     restaurant
//     foods {
//       name
//       quantity
//       price
//       totalPrice
//     }
//   }
// }
// `

// export const ORDER_FOOD = gql`
// mutation orderFood {
//   orderFood {
//     date
//     restaurant
//     foods {
//       name
//       quantity
//       price
//       totalPrice
//     }
//     totalPaid
//   }
// }
// `

// export const CLEAR_CART = gql`
// mutation clearCart {
//   clearCart {
//     message
//   }
// }
// `