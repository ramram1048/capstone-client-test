import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
    Container
} from '@material-ui/core'

import queryString from 'query-string'
import NoMatch from './NoMatch'

// 샘플 list
const list = {
    "title": "베스트상품",
    "productList": [
      {
        "id": 1,
        "title": "세이스타일 꾸안꾸 뷔스티에 A롱 원피스",
        "price": 16900,
        "owner": "세이스타일",
        "option": {
            "size": [
                "ONE-SIZE(44~66)"
            ],
            "color": [
                "black"
            ]
        },
        "thumbnails": [
            "https://picsum.photos/200/300"
        ],
        "detail": "https://picsum.photos/200/1500"
      },
      {
        "id": 2,
        "title": "ㅁㄴㅇㄹ",
        "price": 16900,
        "owner": "ㅇㅅㅇ",
        "option": {
            "size": [
                "ONE-SIZE(44~66)"
            ],
            "color": [
                "black"
            ]
        },
        "thumbnails": [
            "https://picsum.photos/200/300"
        ],
        "detail": "https://picsum.photos/200/1500"
      },
      {
        "id": 3,
        "title": "ㅓㄹ엉ㄴㄹ",
        "price": 16900,
        "owner": "ㄴㅇ란ㅇㄹ",
        "option": {
            "size": [
                "ONE-SIZE(44~66)"
            ],
            "color": [
                "black"
            ]
        },
        "thumbnails": [
            "https://picsum.photos/200/300"
        ],
        "detail": "https://picsum.photos/200/1500"
      },
      {
        "id": 4,
        "title": "ㄷ쟈겾ㄷㄱ",
        "price": 16900,
        "owner": "뱌겨뱢ㄷ",
        "option": {
            "size": [
                "ONE-SIZE(44~66)"
            ],
            "color": [
                "black"
            ]
        },
        "thumbnails": [
            "https://picsum.photos/200/300"
        ],
        "detail": "https://picsum.photos/200/1500"
      }
    ]
  }

const useStyles = makeStyles((theme) => ({
    
}));

const ProductDetail = ({search}) => {
    const classes = useStyles();
    const qs = queryString.parse(search);
    if(!qs.id) return <NoMatch />

    // sample json에서 받는 코드니까 나중에 지우기
    let product;
    for(let i=0; i < list.productList.length; i++){
        if(list.productList[i].id == qs.id){
            product = list.productList[i];
            break;
        }
    }
    // 여기까지
    console.log(product);

    return(
      <Container maxWidth="md">
          
      </Container>
    )
  }

  ProductDetail.propTypes = {
    //pathname: PropTypes.string,
    search: PropTypes.string,
    //hash: PropTypes.string,
  }
  

  const mapStateToProps = state => ({
    //pathname: state.router.location.pathname,
    search: state.router.location.search,
    //hash: state.router.location.hash,
  })
  
  export default connect(mapStateToProps)(ProductDetail)