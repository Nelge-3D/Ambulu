export default function Page() {
    const items = [
        { label: 'Item 1' },
        { label: 'Item 2' },
        { label: 'Item 3' }
    ];

    return (
        <div>
            <div>admin page</div>
            {items.map((item, idx) => (
                <div key={idx}>{item.label}</div>
            ))}
        </div>
    );
}