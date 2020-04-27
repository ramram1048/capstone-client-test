import React from 'react'
import ProductListSummary from './ProductListSummary';

/*
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
*/
// 샘플 불러오기


const Home = () => {
  //let list;
  fetch("http://172.16.100.173:3000/products")
    .then(res => res.json())
    .then((out) => {
      console.log('Checkout this JSON! ', out);
      return(
        <ProductListSummary list={out} />
      )
    })
    .catch(err => { 
      return(
        <div>
          home
        </div>
      )
    });
}

export default Home
