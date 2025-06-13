export default function Page() {
    const items = [{ label: "Item 1" }, { label: "Item 2" }];
    return (
        <div>
            {items.map((item, idx) => (
                <div key={idx}>{item.label}</div>
            ))}
            <div>login page</div>
        </div>
    );
}