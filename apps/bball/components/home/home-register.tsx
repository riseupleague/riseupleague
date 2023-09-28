import { Button } from "@ui/components/button";
import Link from "next/link";

export default function HomeRegister() {
  return (
    <section className="text-neutral-50 font-barlow flex flex-col text-center justify-center items-center my-8">
      <h3 className="uppercase leading-snug mb-4 text-[31px] font-medium max-w-[240px]">Ready to elevate your basketball experience?</h3>
      <p className="mb-8 w-11/12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu vestibulum commodo non nunc tristique. Quis ullamcorper cursus congue pharetra at. Leo lobortis duis nisi quis. Sit fames diam nisi.</p>
      <div className="w-full px-2">
        <Link href="/register">
          <Button className="w-full">Register Now</Button>
        </Link>
      </div>
    </section>
  )
}