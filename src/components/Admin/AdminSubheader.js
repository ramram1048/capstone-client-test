import React from 'react'
import Subheader from '../Header/Subheader'

const menus = [
    {component: "요약/통계", path: "/admin/analyze"},
    {component: "상품목록", path: "/admin/mypage"},
    {component: "상품등록", path: "/admin/addproduct"},
    {component: "주문관리", path: "/admin/order"},
];

const AdminSubheader = () => (
    <Subheader menus={menus} additionalButton={null}/>
)

export default AdminSubheader