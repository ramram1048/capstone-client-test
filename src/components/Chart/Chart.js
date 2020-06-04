import React from 'react';
import ChartBar from '../ChartBar';
import ChartGra from '../ChartGra';
import ChartPie from '../ChartPie'
import { yujinserver } from '../../restfulapi';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieData: [],
      barData: {
        category1: [],
        category2: [],
        category3: [],
        category4: []
      },
      grapData: [
        {
          name: '1월', num: 0
        },
        {
          name: '2월', num: 0
        },
        {
          name: '3월', num: 0
        },
        {
          name: '4월', num: 0
        },
        {
          name: '5월', num: 0
        },
        {
          name: '6월', num: 0
        },
        {
          name: '7월', num: 0
        },
        {
          name: '8월', num: 0
        },
        {
          name: '9월', num: 0
        },
        {
          name: '10월', num: 0
        },
        {
          name: '11월', num: 0
        },
        {
          name: '12월', num: 0
        },
      ]
    }
}
/*
[{
    sales: "",
    product: "",
  },{
    sales: "",
    product: "",
  },{
    sales: "",
    product: "",
  },{
    sales: "",
    product: "",
  }]
callApi()
.then(res => {this.setState({chat:res}); console.log(this.state.chat); })

.catch(err => console.log(err));
*/

componentDidMount(){
  callApi1()
  .then(res => {
    const convertedData = this.convertResDataToChartPie(res);
    this.setState({
      pieData: convertedData
    });
  })
  .catch(err => console.log(err));

 callApi2()
  .then(res => {
    const convertedData = this.convertResDataToChartBar(res);
    this.setState({
      barData: convertedData
    });
  })
  .catch(err => console.log(err));

 callApi3()
  .then(res => {
    console.log(res)
    const convertedData = this.convertResDataToChartGrap(res);
    this.setState({
      grapData: convertedData
    });
  })
  .catch(err => console.log(err));
  }

    render() {
        return (
           <div>
             통계관련
             카테고리별 판매량
             <ChartPie pieData={this.state.pieData} />
             상의품목별판매량
             <ChartBar barData={this.state.barData.category1}/>
             하의품목별판매량
             <ChartBar barData={this.state.barData.category2}/>
             신발품목별판매량
             <ChartBar barData={this.state.barData.category3}/>
             악세서리품목별판매량
             <ChartBar barData={this.state.barData.category4}/>
             총 수익 그래프
             <ChartGra grapData={this.state.grapData}/>
            </div>
        );
    }

    convertResDataToChartPie(datas) {
      const tempData = [];
      for (const data of datas) {
        let name = '';
        switch (data.product.categoryId) {
          case 1:
            name = '상의';
            break;
          case 2:
            name = '하의';
            break;
          case 3:
            name = '신발';
            break;
          case 4:
            name = '악세사리';
            break;
        }

        tempData.push({
          name,
          value: data.sales - 0
        });
      }

      return tempData;
    }

    convertResDataToChartBar(datas) {
      const tempDatas= {};
      Object.keys(datas).map((key) => {
        const tempData = [];
        for (const data of datas[key]) {
          let name = '';
          if(data.product.pname.length > 4) {
            for ( let i =0; i < 4; i++) {
              name += data.product.pname[i];
            }
            name += '...';
          }
          tempData.push({
            name, // name: data.product.pname, 
            num: data.sales - 0
          });
        }
        tempDatas[key] = tempData;
      });

      return tempDatas;
    }

    convertResDataToChartGrap(datas) {
      const tempData = [
          {
            name: '1월', num: 0
          },
          {
            name: '2월', num: 0
          },
          {
            name: '3월', num: 0
          },
          {
            name: '4월', num: 0
          },
          {
            name: '5월', num: 0
          },
          {
            name: '6월', num: 0
          },
          {
            name: '7월', num: 0
          },
          {
            name: '8월', num: 0
          },
          {
            name: '9월', num: 0
          },
          {
            name: '10월', num: 0
          },
          {
            name: '11월', num: 0
          },
          {
            name: '12월', num: 0
          },
        ];
        datas.map((data, index) => {
          const tempYM = data.ym.split('-');
          tempData[tempYM[1] - 1]['num'] = data.sales;
        });

      return tempData;
    }
}


const callApi1 = async () => {
  const response = await fetch(yujinserver+'/category')
  const body = await response.json();
 // console.log(body); //consolelog찍어보면 res로 image경로가 제대로넘어오긴한다 근데 나오질않는다 시발!!!
  return body;
}
  const callApi2 = async () => {
    const response = await fetch(yujinserver+'/category/detail')
    const body = await response.json();
   // console.log(body); //consolelog찍어보면 res로 image경로가 제대로넘어오긴한다 근데 나오질않는다 시발!!!
    return body;
  }
  

  const callApi3 = async () => {
    const response = await fetch(yujinserver+'/month')
    const body = await response.json();
   // console.log(body); //consolelog찍어보면 res로 image경로가 제대로넘어오긴한다 근데 나오질않는다 시발!!!
    return body;
  }
  
  
  

