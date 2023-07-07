import { SocialIcon } from "react-social-icons";

export function Footer() {
  return (
    <div className="mt-6 w-full">
      <div className="border-b flex flex-col md:flex-row items-center justify-between container min-h-[5rem] border-primary/40 w-full">
        {/* <Image alt="" className="h-12 w-auto" src={Logo} /> */}
        <div className="flex gap-2 items-center">
          <SocialIcon
            bgColor="transparent"
            fgColor="#162047"
            url="https://www.linkedin.com/"
          />
          <SocialIcon
            bgColor="transparent"
            fgColor="#162047"
            url="https://www.instagram.com/"
          />
          <SocialIcon
            bgColor="transparent"
            fgColor="#162047"
            url="https://github.com"
          />
        </div>
      </div>
      <div className="container flex min-h-[4rem] p-4 items-center">
        <span className="text-center md:text-left">© 2023</span>
      </div>
    </div>
  );
}
