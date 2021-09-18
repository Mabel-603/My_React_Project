import {INCREMENT,DECREMENT} from './action_types'
export const creatIncrementAction = value=> ({type:INCREMENT,data:value*1})
export const creatDecrementAction = value=> ({type:DECREMENT,data:value*1})