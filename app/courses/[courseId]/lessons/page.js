import React from "react";

const Page = async () => {
	async function getData() {
		const res = await fetch("http://localhost:3001/users", {
			next: { revalidate: 60 * 60 * 24 },
		});
		return res.json();
	}
	const myData = await getData();
    // Note: Ask About This! (localStorage)
	return (
		<div>
			{myData.map((d) => (
				<h1 key={d.id}>{d.first_name}</h1>
			))}
			<h1>This is the Lessons Page.</h1>
		</div>
	);
};

export default Page;
