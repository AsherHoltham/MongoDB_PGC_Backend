export default function AuthLayout(
    { children }: Readonly<{ children: React.ReactNode; }>)
{
    return (
        <div>
            <header className="bg-[#18181b] text-white p-4 text-center">Authentication Page</header>
            <div>{ children }</div>
            <footer className="bg-[#18181b] text-white p-4 text-center">Authentication Page</footer>
        </div>

      );
}