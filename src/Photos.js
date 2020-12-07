import React from 'react';
import { Component } from 'react';
import Gallery from 'react-grid-gallery';
import * as firebase from "firebase";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


class Photos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dbValues: [1111, 2222, 3333],
            images:[],
            backImages:[],
            startDate: new Date(),
            filter: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    handleChange(timeData) {
        console.log("handleChange: " + timeData.toISOString());
        let hours = new Date(timeData)
        hours.setHours(0,0,0,0)
        var minTime = hours.getTime() / 1000
        console.log("handleChange:minTIme " + minTime);
        hours.setHours(23,59,59,0)
        var maxTime = hours.getTime() / 1000
        console.log("handleChange:maxTime " + maxTime);

        let filteredDates = this.state.images.filter(function (e) {
            return e.timeCreated > minTime && e.timeCreated < maxTime;
        });
        filteredDates.forEach(e => console.log("filtered: " + JSON.stringify(e)))
        this.setState({
            filter:true,
            startDate: timeData,
            backImages : filteredDates
        })
    }

    // 1606888800
    // 1607321913
    handleSubmit(date) {
        this.setState({
            startDate: date
        })
    }

    onFormSubmit(e) {
        console.log("onFormSubmit: ");
        e.preventDefault();
        console.log(this.state.startDate)
        this.setState({
            filter :true
        })
    }

    onReset() {
        console.log("onReset: ");
        this.setState({
            startDate: new Date(),
            filter :false
        })
    }


    async componentDidMount() {
        console.log("componentDidMount")
        const db = firebase.firestore();




        db.collection("imageurls").orderBy('timestamp', 'desc').limit(20)
            .onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
                let url = change.doc.data().url
                let timeCreated = change.doc.data().timestamp
                let data = {
                    src: url,
                    thumbnail: url,
                    thumbnailWidth: 320,
                    thumbnailHeight: 174,
                    timeCreated: timeCreated
                }
                if (change.type === 'added') {
                    const imagesNew = this.state.images.concat(data);
                    this.setState({
                        images: imagesNew
                    });
                    console.log('New data: ', data);
                }
                if (change.type === 'modified') {
                    console.log('modified: ', data);
                }
                if (change.type === 'removed') {
                    console.log('Removed: ', data);
                }
            });
        });

    }

    render() {
        const isFilterOn = this.state.filter;
        let displayData;
        if (isFilterOn) {
            displayData = this.state.backImages
        } else {
            displayData = this.state.images
        }
        console.log("isFilter On : "+ isFilterOn)
        return(
            <div style={{width: 400, height: 400, position: 'absolute', left: '30%', top: '160%',
                transform: 'translate(-50%, -50%)'}}>
                <form onSubmit={ this.onFormSubmit }>
                    <div className="form-group">
                        <label>Filter Time :  </label>
                        <DatePicker
                            selected={ this.state.startDate }
                            onChange={ this.handleChange }
                            // showTimeSelect
                            // timeFormat="HH:mm"
                            // timeIntervals={20}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy"
                        />
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <button className="btn btn-success">Filter</button>*/}
                    {/*</div>*/}
                </form>
                <div>
                    <button className="btn btn-success" onClick={this.onReset} >Show All </button>
                </div>
                <Gallery images={displayData} margin={20}/>
            </div>
        );
    }
}

export default Photos;
