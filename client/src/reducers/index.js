const initialState = {
dogsLoaded : [],
dogLoaded:[],
dogDetail: {},
temps:[],
filter:[],
}

const reducer = (state = initialState, action) =>{
  console.log("entre al reducer")
  switch(action.type){
      case "GET_DOG":
         return {
        ...state,
        dogsLoaded: action.payload,
        filter: action.payload,
      }
      case "GET_NAME":
      return{
       ...state,
       dogLoaded: action.payload,   
      }

      case "GET_TEMP":
            return {
                ...state,
            temps: action.payload
      }
      case "order_ZA":
        return {
            ...state,
            filter: action.payload
        }
    case "order_AZ":
        return {
            ...state,
            filter: action.payload
        }
    case "ORDER_LIGHT":
        return {
            ...state,
            filter: action.payload
        }
    case "ORDER_HEAVY":
        return {
            ...state,
            filter: action.payload
        }
    case "GET_ID":
        let found = state.dogsLoaded.filter((element) => element.id === Number(action.payload) || element.id === action.payload);
        return {
          ...state,
          dogDetails: found}
          
    case "FILTER":
        return {
            ...state,
            filter: action.payload
        }

    case "DB": 
        return {
            ...state,
            filter: state.dogsLoaded.filter(b => b.id.length > 6).sort()
        }
    case "API": 
        return {
            ...state,
            filter: state.dogsLoaded.filter(b => b.id < 500).sort()
        }
    case "ALL": 
        return {
            ...state,
            filter: state.dogsLoaded
        }
      
      
      default: return state;
    }  
      
}



export default reducer;