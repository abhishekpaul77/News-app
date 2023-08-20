import React /*{component}*/ from 'react'
import loading from './loading.gif'

const Loadlogo =()=> {
  // render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={loading} alt="loading" />
      </div>
    )
  // }
}

export default Loadlogo