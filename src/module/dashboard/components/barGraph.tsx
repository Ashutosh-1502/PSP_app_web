/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-unsafe-call */


import type { BarGraphType } from "@/module/dashboard/types/index";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
	total: {
		label: "Total",
	},
} satisfies ChartConfig;

export default function BarGraph(graphProps: BarGraphType) {
	console.log(graphProps.graphData)
	return (
		<>
			<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
				<BarChart accessibilityLayer data={graphProps.graphData}>
					<CartesianGrid stroke="#d1d5db" strokeWidth={1} strokeDasharray="6 6" vertical={false} />
					<XAxis
						dataKey={graphProps.filter === "Week" ? "day" : "week"}
						tickLine={true}
						tickMargin={10}
						axisLine={false}
						interval={0}
						tick={({ x, y, payload }) => {
							const dayMap: Record<string, string> = {
                                Sunday: "Sun",
								Monday: "Mon",
								Tuesday: "Tue",
								Wednesday: "Wed",
								Thursday: "Thu",
								Friday: "Fri",
								Saturday: "Sat",
							};

							const shortDay = dayMap[payload.value] ?? payload.value;

							return (
								<text x={x} y={y + 10} textAnchor="middle" style={{ fill: "#000", fontSize: 12, fontWeight: 500 }}>
									{shortDay}
								</text>
							);
						}}
					/>
					<YAxis
						tickLine={true}
						axisLine={false}
						tickMargin={10}
						domain={[0, 40]}
						tick={({ x, y, payload }) => {
							const value = payload.value;
							const displayValue = value >= 40 ? "40+" : value.toString();

							return (
								<text
									x={x}
									y={y}
									textAnchor="middle"
									dy={4}
									dx={-10}
									style={{ fill: "#000", fontSize: 12, fontWeight: 500 }}
								>
									{displayValue}
								</text>
							);
						}}
					/>

					<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
					<Bar
						dataKey="total"
						fill={graphProps.barColor}
						radius={3}
						activeBar={{ fill: graphProps.barColor }}
					/>
				</BarChart>
			</ChartContainer>
		</>
	);
}
