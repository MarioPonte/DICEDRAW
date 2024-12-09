"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DrawGSCard({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <Card className="mx-2">
            <CardHeader>
                <CardTitle>Draw Group Stage</CardTitle>
                <CardDescription>
                    Simulate the competition groups now! Just click the button.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}