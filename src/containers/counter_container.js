import {connect} from 'react-redux'
import  Counter from '../components/counter.jsx'
import {creatIncrementAction,creatDecrementAction,creatIncrementAsyncAction} from '../redux/actions/counter_action'

// function mapStateToProps(state){
//   return {count:state}
// }
// function mapDispatchToProps(dispatch){
//   return {
//   increment:value=>dispatch(creatIncrementAction(value)),
//   decrement:value=>dispatch(creatDecrementAction(value))
//   }
// }

// mapStateToProps = state =>({count:state})

// mapDispatchToProps = dispatch=>(
//   {increment:value=>dispatch(creatIncrementAction(value)),
//    decrement:value=>dispatch(creatDecrementAction(value))
//   }
//   )
// export default connect(mapStateToProps,mapDispatchToProps)(Counter)
export default connect(
  state=>({count:state.count,person:state.person}),
  {increment:creatIncrementAction,
   decrement:creatDecrementAction,
   incrementAsync:creatIncrementAsyncAction
  }
)(Counter)

