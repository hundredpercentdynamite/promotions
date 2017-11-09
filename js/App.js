import {Promotions} from "./components/promotions";


class App extends React.Component {

    render() {
        return (
            <div className="page-wrap main-content">
                <main>
                    <div className="left-side"/>
                    <div className="middle-side">
                        <div className="container">
                            <Promotions/>
                        </div>
                    </div>
                    <div className="right-side"/>
                </main>
            </div>
        );
    }
}

window.ReactDOM.render(<App/>, document.querySelector('.js-app'));