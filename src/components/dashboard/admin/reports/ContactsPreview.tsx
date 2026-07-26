"use client";

import { format } from "date-fns";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ContactsReport } from "@/types/reports.type";



export default function ContactsPreview({ contacts }: { contacts: ContactsReport }) {
    return (
        <div className="overflow-hidden rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>User Type</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {contacts.map((contact) => (
                        <TableRow key={contact.id}>
                            <TableCell>
                                {contact.fullName}
                            </TableCell>

                            <TableCell>
                                {contact.email}
                            </TableCell>

                            <TableCell>
                                {contact.userType}
                            </TableCell>

                            <TableCell>
                                {format(
                                    new Date(contact.createdAt),
                                    "dd MMM yyyy"
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}