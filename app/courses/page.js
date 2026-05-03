import React from "react";
import StickyHeadTable from "../components/table";

const Page = async () => {
	async function getData() {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
			cache: "force-cache",
		});
		return res.json();
	}
	const myData = await getData();
	return (
		<div>
			<h1>This is the courses page.</h1>
			<StickyHeadTable myData={myData}></StickyHeadTable>
		</div>
	);
};

export default Page;
