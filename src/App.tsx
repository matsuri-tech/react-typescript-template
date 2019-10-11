import { About } from "./pages/About"
import { AddTodo } from "./components/AddTodo"
import { Footer } from "./components/Footer"
import { Home } from "./pages/Home"
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom"
import { Users } from "./pages/Users"
import { VisibleTodoList } from "./components/VisibleTodoList"
import React from "react"

export const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to={Home.path}>Home</Link>
                        </li>
                        <li>
                            <Link to={About.path}>About</Link>
                        </li>
                        <li>
                            <Link to={Users.path}>Users</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path={About.path}>
                        <About />
                    </Route>
                    <Route path={Users.path}>
                        <Users />
                    </Route>
                    <Route path={Home.path}>
                        <Home />
                    </Route>
                </Switch>
                <AddTodo />
                <VisibleTodoList />
                <Footer />
            </div>
        </Router>
    )
}
