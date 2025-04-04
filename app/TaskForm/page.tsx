'use client'

import PageContainer from "@/components/PageContainer"
import TaskForm from "./TaskForm"

export default function NewTaskPage() {
    return(
        <PageContainer>
            <TaskForm isNew={true} />  
        </PageContainer>
    ) 
}
