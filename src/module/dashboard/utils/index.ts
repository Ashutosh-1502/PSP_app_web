import type { UserDetails } from "@/module/dashboard/types/index";
import type {Sequence} from "@/types"

function formatDate(isoDate: string): string {
	if (!isoDate) return "Invalid date";

	const date = new Date(isoDate);
	if (isNaN(date.getTime())) return "Invalid date";

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const day = date.getUTCDate();
	const month = monthNames[date.getUTCMonth()] ?? "Unknown";
	const year = date.getUTCFullYear();

	return `${String(day)} ${String(month)} ${String(year)}`;
}

function formatedTime(dateString: string): string {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${hours}:${paddedMinutes} ${amPm}`;
}


type WeeklyResult = { day: string; total: number };
type MonthlyResult = { week: string; total: number };

function groupGraphDataByDate(graphData: UserDetails[] | Sequence[], filter: string): WeeklyResult[] | MonthlyResult[] {
	if (graphData.length === 0) return [];

	const now = new Date();

	if (filter === "Week") {
		const startOfWeek = new Date(now);
		startOfWeek.setHours(0, 0, 0, 0);
		startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));

		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(startOfWeek.getDate() + 7);

		const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const result: WeeklyResult[] = weekdays.map(day => ({ day, total: 0 }));


		graphData.forEach((data) => {
			const createdDate = new Date(data.createdAt);
			if (createdDate >= startOfWeek && createdDate < endOfWeek) {
				const dayIndex = (createdDate.getDay() + 7) % 7;
				const current = result[dayIndex]?.total ?? 0;
				result[dayIndex]!.total = current + 1;
			}
		});

		return result;
	}

	if (filter === "Month") {
		const year = now.getFullYear();
		const month = now.getMonth();

		const startOfMonth = new Date(year, month, 1);
		const endOfMonth = new Date(year, month + 1, 0);
		const totalDays = endOfMonth.getDate();

		const firstDayOfMonth = startOfMonth.getDay();
		const offset = (firstDayOfMonth + 6) % 7;
		const totalWeeks = Math.ceil((totalDays + offset) / 7);

		const result: MonthlyResult[] = Array.from({ length: totalWeeks }, (_, i) => ({
      week: `Week ${i + 1}`,
      total: 0,
    }));

		graphData.forEach((data) => {
			const createdDate = new Date(data.createdAt);
			if (createdDate.getFullYear() === year && createdDate.getMonth() === month) {
				const dayOfMonth = createdDate.getDate();
				const jsDayOfFirst = startOfMonth.getDay();
				const dayOffset = (jsDayOfFirst + 7) % 7;
				const weekIndex = Math.floor((dayOfMonth + dayOffset - 1) / 7);
				if (weekIndex >= 0 && weekIndex < result.length) {
					const current = result[weekIndex]?.total ?? 0;
					result[weekIndex]!.total = current + 1;
				}
			}
		});

		return result;
	}

	return [];
}

export { formatDate, groupGraphDataByDate, formatedTime };
