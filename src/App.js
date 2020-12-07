import Navigation from './Navigation';
import Display from "./Display";
import Photos from "./Photos"

function App() {
    return (
        <div className="ms-Grid" dir="ltr" >
            <div className="ms-Grid-row" >
                <div className="ms-Grid-col ms-sm1 ms-xl1">
                    <Navigation />
                </div>
                <div className="main-element ms-Grid-col ms-sm11 ms-xl11">
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <h1>Face Mask Detection</h1>
                    </div>
                    <div className="ms-Grid-row">
                        <Display />
                    </div>
                    <div className="ms-Grid-row gallery-nav">
                        <Photos />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;