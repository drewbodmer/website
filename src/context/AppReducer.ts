
export default (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        shoppingList: [action.payload, ...state.shoppingList]
      }
    case 'REMOVE_ITEM':
      return {
        shoppingList: state.shoppingList.filter((item: any) => item !== action.payload)
      }
    default:
      return state;
  }
}