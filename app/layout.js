"use client";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <header>
            <div className="py-4 flex justify-end border border-b-2">
              <Link
                as={NextLink}
                href="/"
                className="rounded mr-5 font-serif font-bold"
              >
                All Blog
              </Link>
              <Link
                as={NextLink}
                href="/add-blog"
                className="rounded mr-5 font-bold font-serif"
              >
                Add Blog
              </Link>
            </div>
          </header>{" "}
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
