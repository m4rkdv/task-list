
export default function PageContainer({ 
    children,
  }: { 
    children: React.ReactNode,
  }) {
    return (
      <div className="font-[family-name:var(--font-geist-sans)] min-h-screen border flex items-center 
      w-full justify-center">
        <div className='w-[55%] h-[90%] border border-black flex flex-col gap-2 bg-white 
        shadow-md rounded-md p-7 dark:bg-slate-700'>
          {children}
        </div>
      </div>
    )
  }