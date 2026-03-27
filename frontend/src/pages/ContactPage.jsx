import { Adress } from "@/components/ContactPage/Adress";
import { Counter } from "@/components/ContactPage/Counter";
import { FeQuestion } from "@/components/ContactPage/FeQuestion";
import { FromContact } from "@/components/ContactPage/FromContact";
import { Hero } from "@/components/ContactPage/Hero";
import { Nav } from "@/components/ContactPage/Nav";
import { Testimonials } from "@/components/ContactPage/Testimonials";

export const ContactPage = () => {
  return (
    <div className="h-full bg-muted ">
      <div className="relative ">
        <Hero />
        <div className="absolute inset-0 w-3/4 mx-auto">
          <Nav />
        </div>
      </div>
      <div className="relative flex flex-col gap-20 px-10 py-1 mx-20 bg-popover -mt-25 rounded-2xl ">
        <div className="mt-20">
          <Counter />
        </div>
        <div className="">
          <Testimonials />
        </div>
        <div className="">
          <FeQuestion />
        </div>
        <div className="-mb-5 text-4xl font-bold text-center text-slate-700">
          Một số văn phòng của chúng tôi
        </div>
        <div className="relative min-h-screen overflow-hidden lg:flex">
          <div className="absolute inset-0 lg:static lg:w-1/2">
            <div className="w-full h-full bg-[url('/anh3.jpg')] bg-cover bg-center rounded-3xl"></div>
          </div>
          <div className="absolute inset-0 bg-black/30 lg:hidden"></div>
          <div className="relative flex items-center justify-center min-h-screen px-6 lg:min-h-0 lg:w-1/2">
            <div className="w-full max-w-2xl lg:-translate-x-30 xl:-translate-x-50">
              <Adress />
            </div>
          </div>
        </div>
        <div className="text-4xl font-bold text-center -mb15 mt-15 text-slate-710">
          Mọi thắc mắc xin vui lòng điền thông tin bên dưới
        </div>
        <div className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 w-full lg:inset-y-0 lg:right-0 lg:left-auto lg:w-1/2">
            <div className="w-full h-full bg-[url('/anh3.jpg')] bg-cover bg-center rounded-3xl"></div>
          </div>
          <div className="absolute inset-0 bg-black/30 lg:hidden"></div>
          <div className="relative flex items-center min-h-screen">
            <div className="flex justify-center w-full px-6 lg:w-1/2 lg:justify-end">
              <div className="lg:translate-x-24 ">
                <FromContact />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen"></div>
    </div>
  );
};
