import React from 'react';
import StickyHeadTable from '../components/table';

const Page = async () => {
    async function getData(){
       const res= await fetch("http://localhost:3001/users" ,{
        cache:"no-store"   
       })
       return res.json()
    }
    const myData = await getData()
    return (
        <div>
            <h1>This is the Admin Dashboard page.</h1>
            <h2>Users List</h2>
            <StickyHeadTable myData={myData}></StickyHeadTable>
        </div>
    );
}

export default Page;
