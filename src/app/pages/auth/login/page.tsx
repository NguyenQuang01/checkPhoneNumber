"use client";
import { funLogin } from "@/app/services/apilogin";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const changeFrom = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const submit = async () => {
        const res = await funLogin(form);
        if (res) {
            console.log(res);
        }
    };
    return (
        <div className="main">
            <div className="sign text-center">Sign in</div>
            <form className="form1">
                <input
                    className="un"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={changeFrom}
                />
                <input
                    className="pass"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={changeFrom}
                />
                <span
                    onClick={submit}
                    // href="/pages/dashboard/learningBasedOnTheBasis"
                    className="submit"
                >
                    Sign in
                </span>
            </form>
        </div>
    );
}
