const initialState = {count: 0, firstName: "Samar", lastName: "Badriddinov"}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "INC":
      return {
        ...state,
        count: state.count + 1
      }
    case "DECR":
      return {
        ...state,
        count: state.count - 1
      }
    case "RND":
      return {
        ...state,
        count: action.payload
      }
  }
}

export default reducer
