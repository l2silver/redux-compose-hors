// @flow
type $action = {
  type: any
};

export default function(reducer: Function, ...hors: Function[]){
  const horsLength = hors.length
  return function tryAllHocs(state: any, action: $action){
    let counter = 0
    function stateActionChange(nextState, nextAction){
      if (counter === horsLength) {
        return reducer(nextState, nextAction)
      }
      if(nextState === state && nextAction === action){
        counter += 1
        return
      }
      return tryAllHocs(nextState, nextAction)
    }
    return hors.concat([(rawReducer)=>rawReducer]).reduce((finalState, hor) => {
      const result = hor(stateActionChange)(state, action)
      return result !== undefined ? result : finalState
    }, state)
  }
}
