export default function AboutLayout(
    { children, }: { children: React.ReactNode }) 
{
    return (
      <div>
        <h1 className="text-black p-4 text-center">About page</h1>
        <div>{ children }</div>
      </div>
    );
  }