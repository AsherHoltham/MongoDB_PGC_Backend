export default function ProductLayout({ children } : { children : React.ReactNode; }) {
    return (
    <div>
        { children }
        <div>
        <h2>This is the page of user X</h2>
        </div>
    </div>
    );
}
