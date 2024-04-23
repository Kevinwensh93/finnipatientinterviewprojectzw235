import logo from './logo.svg';
import './App.css';
import PatientTable from './patient-tables/PatientTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Finni Health</p>
      </header>
      <div className="content">
        <PatientTable/>
      </div>
    </div>
  );
}

export default App;