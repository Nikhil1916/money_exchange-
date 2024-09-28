import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
// import { PrismaClient } from "@repo/db/client";
// const client = new PrismaClient();

export default function Home() {
  return (
    <div className="h-10 w-10 bg-slate-400">
      <Button className={"bg-red-400"} appName={"hello"}>Hello</Button>
    </div>
  );
}
