import "./App.css";
import { Route, Link } from "wouter";
import Home from "pages/Home";
import Detail from "pages/Details";
import SearchResults from "pages/SearchResults";
import Context from "context/StaticContext";
import { GifsContextProvider } from "context/GifsContext";

function App() {
    return (
        <Context.Provider value={{}}>
            <div className='App'>
                <section className='App-content'>
                    <Link to={"/"}>
                        <figure className='App-logo'>
                            <img alt='Giffy logo' src='/logo.png' />
                        </figure>
                    </Link>
                    <GifsContextProvider>
                        <Route component={Home} path='/' />
                        <Route
                            path='/search/:keyword/:rating?'
                            component={SearchResults}
                        />
                        <Route component={Detail} path='/gif/:id' />
                        <Route
                            component={() => <h1> 404 Page Not Found :(</h1>}
                            path='/404'
                        />
                    </GifsContextProvider>
                </section>
            </div>
        </Context.Provider>
    );
}

export default App;
