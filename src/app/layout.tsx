"use client";
import { ReactNode } from "react";
import React from "react";
import { Inter } from "next/font/google";
import "@/app/globals.scss";
import MenuMain from "@/app/components/Layout/MenuMain";
import StyledComponentsRegistry from "./lib/antd.registry";
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
                <StyledComponentsRegistry>
                    {" "}
                    <div className="flex  overflow-hidden ">
                        <MenuMain />
                        <div className=" h-screen overflow-hidden w-full pl-10">
                            {children}
                        </div>
                    </div>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
};
export default DefaultLayout;
