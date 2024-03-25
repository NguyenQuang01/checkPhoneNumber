"use client";
import { ReactNode } from "react";
import React from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href={
                        "https://jaxtina.com/wp-content/uploads/2023/04/favicon.png"
                    }
                    sizes="30"
                />
                <title>Jaxtina dashboard</title>
            </head>
            <body className={inter.className}>
                <div className="flex">
                    <div className="flex h-screen overflow-hidden w-full ">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
};
export default DefaultLayout;
