export const setFilter = (data) => {
  return {
    type: 'SET_FILTER',
    filter: data
  }
}


const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      state = action.filter
      return state
    default:
      return state
  }
}

export default filterReducer