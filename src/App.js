import './App.css';
import Navigation from './components/Navigation/Navigation';
import EmailForm from './components/EmailForm/EmailForm';
import SignUp from './components/SignUp/SignUp';


function App() {
  return (
    <div className="App">
      <Navigation />
      {/* <Logo /> */}
      <EmailForm />
      <SignUp />
      {/* <EmailHistory /> */}
    </div>
  );
}

export default App;
