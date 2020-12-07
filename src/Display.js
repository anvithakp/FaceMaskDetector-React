import React from 'react';
import { Text, initializeIcons } from '@fluentui/react';
import { Card } from '@uifabric/react-cards';
import 'office-ui-fabric-react/dist/css/fabric.css';import './App.css';
import { Component } from 'react';
import * as firebase from 'firebase';
import {Pie} from 'react-chartjs-2';


const container = {
    display: 'flex',
    justifyContent: 'center',
    margin: '10vh 0',
};

// const chartcontainer = {
//     // display: 'flex',
//     justifyContent: 'center',
//     margin: '10vh 0',
//     height: '40vh 0',
//
// };
//
// const main = {
//     display: 'flex',
//     justifyContent: 'center',
//     // margin: '10vh 0',
//     height: '20vh 0',
// };


const icon = {
    fontSize: 24,
    padding: 15,
    verticalAlign: 'middle',
    paddingLeft: 20,
    color: '#0078d4'
}

const styles = {
    cardStyles: {
        root: {
            background: 'white',
            textAlign: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            padding: 20,
            borderTop: '5px solid #0078d4',
            width: '90%',
            maxWidth: '90%',
            margin: 'auto',
        }
    },
    header: {
        root: {
            fontSize: 20,
            fontWeight: 'bold',
        }
    },
    count: {
        root: {
            fontSize: 26,
            paddingBottom: 20,
            paddingTop: 30,
            color: '#0078d4',
            fontWeight: 'bold',
        }
    }
};

const cards = [
    {
        title: 'Avg Inference Time',
        icon: 'Timer',
    },
    {
        title: 'Total Inferences',
        icon: 'NumberSymbol',
    },
    {
        title: 'Total No Mask Count',
        icon: 'NumberSymbol'
    },
    {
        title: 'Total Mask Count',
        icon: 'NumberSymbol'
    }
]


class Display extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dbValues : [1111, 2222, 3333],
            chartData : {
                labels: ['No Masks', 'Wearing Masks'],
                datasets: [
                    {
                        label: 'Mask Count',
                        backgroundColor: [
                            '#B21F00'
                        ],
                        hoverBackgroundColor: [
                            '#501800'
                        ],
                        data: [20,80]
                    }
                ]
            }
        }

    }

    async componentDidMount() {
        console.log("componentDidMount")
        const db = firebase.firestore();
        db.collection('aggregationStats').doc('stats').onSnapshot(docSnapshot => {
            console.log("database collection found")
            const avgInferTime = Number(docSnapshot.get('avg_infer_time')).toFixed(2);
            const totInferences = docSnapshot.get('tot_inferences');
            const totNoMasks = docSnapshot.get('tot_no_masks');
            const totMasks = docSnapshot.get('tot_masks');

            console.log('avgInferTime:' + avgInferTime)
            console.log('totInferences:' + totInferences)
            console.log('totNoMasks:' + totNoMasks)
            console.log('totMasks:' + totMasks)

            this.setState({
                dbValues: [avgInferTime, totInferences, totNoMasks, totMasks],
                chartData : {
                    labels: ['No Masks', 'Wearing Masks'],
                    datasets: [
                        {
                            label: 'Mask Count',
                            backgroundColor: [
                                '#B21F00'
                            ],
                            hoverBackgroundColor: [
                                '#501800'
                            ],
                            data: [totNoMasks,totMasks]
                        }
                    ]
                }
            });

            // ...
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    }



    render() {
        initializeIcons();
        return (
            <div>
            <div style={container}>
                {cards.map((card, index) => (
                    <div className="mbsc-grid">
                        <Card styles={styles.cardStyles}>
                            <Card.Section>
                                <Card.Item>
                                    <i style={icon} className={`ms-Icon ms-Icon--${card.icon}`} aria-hidden="true"/>
                                    <Text styles={styles.header}>{card.title}</Text>
                                </Card.Item>
                                <Card.Item>
                                    <Text styles={styles.count}>{this.state.dbValues[index]}</Text>
                                </Card.Item>
                            </Card.Section>
                        </Card>
                    </div>
                ))}
            </div>
                <div style={{width: 400, height: 400, position: 'absolute', left: '55%', top: '105%',
                    transform: 'translate(-50%, -50%)'}}>
                    <Pie
                        data={this.state.chartData}
                        options={{
                            title:{
                                display:true,
                                text:'Total Masks',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Display;
