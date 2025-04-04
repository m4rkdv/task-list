'use client'

import Link from "next/link";
import { LuClipboardList } from "react-icons/lu";
import PageContainer from "@/components/PageContainer";
import { ModeToggle } from "./to-do/components/ModeToggle";

export default function Home() {
  return (
    <PageContainer>
      <div className='w-full h-full flex flex-col gap-2'>
        <div className="flex justify-between gap-10">
          <h1 className="text-3xl font-bold dark:text-white basis-1/3">Task List App</h1>
          <ModeToggle/>
        </div>
        <div className="mt-8">
          <Link href="/TaskList" className="flex items-center gap-3 hover:bg-accent px-4 py-2 rounded-xl transition-colors w-fit">
            <LuClipboardList size={28} className="text-primary" />
            <span className="text-lg font-semibold dark:text-white">Ir a la Lista de Tareas</span>
          </Link>
        </div>

        
      </div>
    </PageContainer>
  );
}
