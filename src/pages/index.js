import Image from "next/image";
import localFont from "next/font/local";
import Characters from "@/components/list";
import Bounties from "@/components/bounties";
import Footer from "@/components/footer";
import Increment from "@/components/increment";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div>
      <Characters />
      <Bounties />
      <Increment/>
      <Footer name="Leonardo W."/>
    </div>
  );
}
