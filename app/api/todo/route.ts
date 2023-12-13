import { NextResponse,NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { reportWebVitals } from "next/dist/build/templates/pages";


export const POST = async (request : NextRequest) => {
  const {task} = await request.json();
  try{
    if(task){
      const res = await sql `INSERT INTO todo_final (task) VALUES (${task})`
      return NextResponse.json({ res })
    }else {
      return NextResponse.json({message : "Required feilds are missing"})
    }

  }catch(error){
    console.log("Error in POST method")
    return NextResponse.json({message : "Something went wrong"})

  }
}
export const GET = async () => {
  try{
    const res = await sql`SELECT * FROM todo_final ORDER BY id ASC`
    const data  = res.rows;
    return NextResponse.json({data})
  }catch (error){
    console.log("Eroor in GET method",error)
    return NextResponse.json({message : "Something went wrong"})
  }
}

export const DELETE = async (request : NextRequest) => {
  const {id} = await request.json()
  try{
    if(id){
      const res = await sql `DELETE FROM todo_final WHERE id = ${id}`
      return NextResponse.json({message : `TODO ${id} was deleted succesfully`})
    }else{
      return NextResponse.json({message : "The id is missing"})
    }

  }catch(error){
    console.log("Error in DELEt Method" ,error)
    return NextResponse.json({message : "Something went 6"})
  }
}


export const PUT = async (request:NextRequest) => {
  const {id,task} = await request.json()
  try{
    if(id && task){
      const res = await sql`UPDATE todo_final SET task = ${task} WHERE id = ${id}`
      return NextResponse.json({mesaage  :`TODO ${id} is successfully updated`})
    }

  }catch(error){
    console.log("Error in PUT method",error)
    return NextResponse.json({message : "Something went wrong"})

  }
  
}
