import React from 'react'
import { connect } from 'react-redux'

function Home({ number, increase, decrease }) {
  return (
    <div>
      Some state changes:
      {number}     
    </div>
  )
}

export default connect(
 
)(Home)