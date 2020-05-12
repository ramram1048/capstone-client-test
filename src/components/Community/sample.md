/page/post 커뮤니티메인
[
    {
        "id": 10,
        "title": "제목수정하기",
        "content": "내용 수저ㅇ하기~!~!",
        "createdAt": "2020-04-30T17:43:00.000Z",
        "updatedAt": "2020-05-06T03:58:44.000Z",
        "deletedAt": null,
        "userId": 2,
        "likecount": 2,
        "commentcount": 3,
        "user": {
            "id": 2,
            "name": "김유진"
        },
        "Pimgs": [
            {
                "id": 11,
                "img": "https://swcap02.s3.ap-northeast-2.amazonaws.com/closet/1586965701899testimg1.jpg"
            },
            {
                "id": 12,
                "img": "https://swcap02.s3.ap-northeast-2.amazonaws.com/closet/1588077824737testimg1.jpg"
            },
            {
                "id": 13,
                "img": "test"
            }
        ]
    }
]

/post/:postid 글상세
[
    {
        "id": 10,
        "title": "제목수정하기",
        "content": "내용 수저ㅇ하기~!~!",
        "createdAt": "2020-04-30T17:43:00.000Z",
        "updatedAt": "2020-05-06T03:58:44.000Z",
        "deletedAt": null,
        "userId": 2,
        "likecount": 2,
        "commentcount": 3,
        "user": {
            "id": 2,
            "name": "김유진"
        },
        "Pimgs": [
            {
                "id": 11,
                "img": "https://swcap02.s3.ap-northeast-2.amazonaws.com/closet/1586965701899testimg1.jpg"
            },
            {
                "id": 12,
                "img": "https://swcap02.s3.ap-northeast-2.amazonaws.com/closet/1588077824737testimg1.jpg"
            },
            {
                "id": 13,
                "img": "test"
            }
        ]
    }
]

글쓰기: 주소 "/post/" POST
이미지 img //맞춰봐야됨
제목 title
내용 content
클로젯 closet [어레이로 closet id보냄] //맞춰봐야됨

댓글쓰기: 주소 "/comment/post/:postid" POST
이미지 img //3개
내용 content
클로젯 closet [어레이로 closet id보냄] //맞춰봐야됨


