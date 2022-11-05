import React from 'react';
import './App.css';
import { ContactDetails } from './components/ContactDetails';
import { useContactsQuery } from './services/contactsApi';

function App() {
  const { data, error, isLoading, isFetching, isSuccess } = useContactsQuery(); //it exports the api data, isloading,isFetching,error and isSucess
  return (
    <div className="App">
      <h1>RTK Query</h1>
      {isLoading && <h2>...loading</h2>}
      {error && <h2>Somthing went wrong</h2>}
      {isFetching && <h2>....Fetching</h2>}
      {
        isSuccess && (
          <div>
            {
              data.map(item => {
                return <div key={item.id}>
                  <span>{item.name}</span>
                  <ContactDetails id={item.id} />
                </div>
              })
            }
          </div>
        )
      }
    </div>
  );
}

export default App;
