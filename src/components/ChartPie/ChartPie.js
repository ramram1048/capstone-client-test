import React from 'react';


import {
  PieChart, Pie, Legend, Tooltip,
} from 'recharts';



export default class ChartPie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data03: [
        { name: "상의", value: 10},
        { name: "하의", value: 5},
        { name: "신발", value: 8},
        { name: "악세", value: 3}
       
      ]
  }
  //this.a=this.a.bind(this);
 
}


componentWillMount(){
  
}


  render() { 
      return (
          <div>
            파이차트 <br/> <br/>
         
          <PieChart width={400} height={400}>
          <Pie dataKey="value" isAnimationActive={false} data={this.props.pieData} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
            
            <Tooltip />
            </PieChart>
          </div>
        );
    }
}

