import { parseStartTime } from "react-player/lib/utils"

function songReducer(state, action) {
  switch(action.type) {
    case 'PLAY_SONG': {
      return {...state, isPlaying: true}
    }



    default:
      return state
  }
}

export default songReducer
