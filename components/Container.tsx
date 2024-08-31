export default function Container({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-w-[1280px] py-10 flex flex-col gap-10 m-auto">
            {children}
        </div>
    );
}