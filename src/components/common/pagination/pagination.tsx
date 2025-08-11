"use client";

import { Button } from "@/components/ui/button";
import { type PaginationType } from "@/types";

export function Pagination({ page, pageSize, totalPages, handlePageChange, totalDocs }: PaginationType) {
	return (
		<div className="mt-3 flex items-center justify-between rounded-md">
			<p>
				Showing:{" "}
				<span>
					{(page - 1) * pageSize + 1} to {page * pageSize}
				</span>{" "}
				of {totalDocs} results
			</p>
			<div className="flex items-center gap-2">
				<Button variant="outline" disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
					Previous
				</Button>
				<Button
					variant="default"
					disabled={page >= totalPages}
					onClick={() => handlePageChange(page + 1)}
					className="bg-black"
				>
					Next
				</Button>
			</div>
		</div>
	);
}
