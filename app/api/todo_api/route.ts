import { NextResponse,NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { updateTodo,createTodo,db, todoTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import exp from "constants";


export const POST = async(request :NextRequest) => {
    const {task} = await request.json();
    const newTodo:createTodo = {task : task}
    try{
        if(task){
            const res = await db.insert(todoTable).values(newTodo)
            return NextResponse.json({ res})
        }else{
            return NextResponse.json({message : "Required fields missing"})
        }
    }catch(error){
        console.log("Error in POST method")
        return NextResponse.json({message : "Something Went wrong"})
    }
}

export const GET =async (request:NextRequest) => {
    try{
        const res = await db.select().from(todoTable)
        return NextResponse.json({res}.res)
    }catch(error){
        console.log("Error in GET method",error)
        return NextResponse.json({message :"Something went wrong"})
    }
    
}

export const DELETE =async (request:NextRequest) => {
    const {id} = await request.json()
    try{
        if(id){
            const res = await db.delete(todoTable).where(eq(todoTable.id , id))
            return NextResponse.json({message  :`Todo ${id} was successfully deleted`})
        }else { 
            return NextResponse.json({message  :"Required Field are missing"})
        }

    }catch(error){
        console.log("Error in DELETE method",error)
        return NextResponse.json({message  :"Something went wrong"})
    }
}

export const PUT =async (request:NextRequest) => {
    const {task,id} = await request.json()
    const todoUpdate : updateTodo = {task,id}
    try{
        if(task && id){
            const res = await db.update(todoTable).set(todoUpdate).where(eq(todoTable.id,id))
            return NextResponse.json({message  : `Todo ${id} i successfully updated`})
        }else { 
            return NextResponse.json({message  :"Required Fields are missing"})
        }

    }catch(error){
        console.log("Error in PUT method",error)
        return NextResponse.json({message  :"Something went wrong"})
    }
    
}