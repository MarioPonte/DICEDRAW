export default function Container({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="mx-60 my-10">
            {children}
        </div>
    );
}