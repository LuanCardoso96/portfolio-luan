import React, { useState } from "react";
import { User } from "@/entities/User";
export default function Login(){
  const [email,setEmail]=useState(""); const [pass,setPass]=useState("");
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={async e=>{e.preventDefault(); await User.login(email,pass); location.href="/";}} className="bg-white p-8 rounded-2xl shadow w-full max-w-sm space-y-3">
        <h1 className="text-xl font-bold">Entrar</h1>
        <input className="w-full border rounded px-3 py-2" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Senha" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
        <button className="w-full px-4 py-2 rounded bg-indigo-600 text-white">Login</button>
      </form>
    </div>
  )
}
