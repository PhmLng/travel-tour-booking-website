import { Adress } from "@/components/ContactPage/Adress";
import { Counter } from "@/components/ContactPage/Counter";
import { FeQuestion } from "@/components/ContactPage/FeQuestion";
import { FromContact } from "@/components/ContactPage/FromContact";
import { Hero } from "@/components/ContactPage/Hero";
import { Nav } from "@/components/ContactPage/Nav";
import { Testimonials } from "@/components/ContactPage/Testimonials";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HeroBanner from "@/components/HeroBanner/HeroBanner";

export const ContactPage = () => {
  return (
    <div className="h-full bg-muted ">
      <div>
        <Header />
      </div>
      <div className="relative ">
        <HeroBanner />
      </div>
      <div className="relative flex flex-col gap-20 px-10 py-1 mx-20 -mt-5 -mb-15 bg-popover rounded-2xl">
        <div className="mt-30">
          <div className="text-center ">
            <h2 className="text-3xl font-bold md:text-4xl text-primary">
              Vì sao chọn Lạc Việt Travel?
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
              Chúng tôi mang đến những hành trình đáng nhớ với dịch vụ chuyên
              nghiệp, lịch trình tối ưu và trải nghiệm du lịch trọn vẹn cho mọi
              khách hàng.
            </p>
          </div>
          <Counter />
        </div>
        <div className="">
          <Testimonials />
        </div>
        <div className="">
          <FeQuestion />
        </div>
        <div className="-mb-5 font-bold text-center md:text-4xl text-primary ">
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
        <div className="font-bold text-center md:text-4xl text-primary">
          Mọi thắc mắc xin vui lòng điền thông tin bên dưới
        </div>
        <div className="relative min-h-screen mb-8 overflow-hidden">
          <div className="absolute inset-0 w-full lg:inset-y-0 lg:right-0 lg:left-auto lg:w-1/2">
            <div className="w-full h-full bg-[url('/destinations/rome.jpg')] bg-cover bg-center rounded-3xl"></div>
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
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};
