import React from 'react'
import noMatchStyle from '../assests/styles/index.module.scss'
function NoMatch() {
  return (
    <h1 className={noMatchStyle['no-match']}>Page not found</h1>
  )
}

export default NoMatch