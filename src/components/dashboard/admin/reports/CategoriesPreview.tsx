"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CategoriesReport } from "@/types/reports.type";



export default function CategoriesPreview({ categories }: { categories: CategoriesReport }) {
    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Parent</TableHead>
                        <TableHead>Tutors</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>
                                {category.name}
                            </TableCell>

                            <TableCell>
                                {category.parent?.name ?? "-"}
                            </TableCell>

                            <TableCell>
                                {category._count.tutors}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}