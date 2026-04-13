import './App.css'
import babyStatue from './assets/baby statue.png'
import guy from './assets/guy.png'

function App() {
  return (
    <div className="app">
      <div className="grid-container">
        <div className="box">
          <img src={guy} alt="Guy" className="box-image" />
          <h2 className="box-title">Info</h2>
        </div>
        <div className="box">
          <img src={babyStatue} alt="Baby Statue" className="box-image" />
          <h2 className="box-title">Build a statue</h2>
        </div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
    </div>
  )
}

export default App
