import React, { Component } from 'react'
import '../custom-tachyons.css'
import 'tachyons'
import Header from './Header'
import AppRouter from './AppRouter'

class App extends Component {
  render() {
    return (
      <article className="bg-light-gray opensans">
        <Header />
        <AppRouter />
      </article>
    )
  }
}

export default App
