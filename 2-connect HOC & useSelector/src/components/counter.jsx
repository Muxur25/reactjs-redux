/* eslint-disable react-refresh/only-export-components */
import { useDispatch, useSelector } from "react-redux"
import { decr, inc, rnd } from "../redux/actions"

const Counter = () => {
  const {count} = useSelector(state => state)
  const dispatch = useDispatch()

	return (
		<div className="w-full vh-100 bg-dark text-white d-flex justify-content-center align-items-center">
      <div
        className="border border-5 w-50 p-5 rounded border-success border-opacity-50 d-flex align-items-center flex-column bg-secondary">
        <h1>Counter: <span>{count}</span></h1>

        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-success" onClick={() => dispatch(inc())}>Increment</button>
          <button className="btn btn-danger" onClick={() => dispatch(decr())}>Decrement</button>
          <button className="btn btn-info" onClick={() => dispatch(rnd())}>Random</button>
        </div>
      </div>
    </div>
	)
}

// const mapStateToProps = (state) =>{
// 	return {
// 		counter: state.count
// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	return bindActionCreators(actions, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Counter)
export default Counter