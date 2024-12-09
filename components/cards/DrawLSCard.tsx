"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DrawlSCard({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <Card className="mx-2 w-full">
            <CardHeader>
                <CardTitle>Draw League Stage</CardTitle>
                <CardDescription>
                    Simulate the competition League Stage now! Just click the button.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}