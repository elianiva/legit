import { ResponsiveLine } from "@nivo/line";

const data = [
	{
		id: "japan",
		color: "hsl(180, 70%, 50%)",
		data: [
			{
				x: "plane",
				y: 183,
			},
			{
				x: "helicopter",
				y: 74,
			},
			{
				x: "boat",
				y: 274,
			},
			{
				x: "train",
				y: 108,
			},
			{
				x: "subway",
				y: 104,
			},
			{
				x: "bus",
				y: 170,
			},
			{
				x: "car",
				y: 4,
			},
			{
				x: "moto",
				y: 273,
			},
			{
				x: "bicycle",
				y: 268,
			},
			{
				x: "horse",
				y: 228,
			},
			{
				x: "skateboard",
				y: 157,
			},
			{
				x: "others",
				y: 194,
			},
		],
	},
];

export function LineChart() {
	return (
		<ResponsiveLine
			axisBottom={null}
			axisLeft={null}
			axisRight={null}
			axisTop={null}
			colors={["#0078D4"]}
			curve="natural"
			data={data}
			enableArea
			enableGridX={false}
			enableGridY={false}
			enablePoints={false}
			margin={{ top: 16 }}
			xScale={{ type: "point" }}
			yScale={{
				type: "linear",
				min: "auto",
				max: "auto",
			}}
		/>
	);
}
