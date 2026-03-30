import React from "react";
import { useState } from "react";
import { officeData } from "../../lib/data";
import { MapPinHouse } from "lucide-react";
import { Phone } from "lucide-react";
import { Printer } from "lucide-react";
import { Mail } from "lucide-react";

export const Adress = () => {
  const [i, setI] = useState(0);
  const ChangeIndex = (index, r) => {
    setI(index);
    console.log(r);
  };
  return (
    <div className="shadow-xl backdrop-blur-mdw-full bg-background rounded-2xl">
      <div className="flex flex-wrap w-full h-auto gap-5 border-b border-primary/30 p-15 ">
        {officeData.map((r, index) => {
          return (
            <div
              className={`border rounded-xl border-gray-500 w-fit px-5 text-center ${i === index ? "bg-primary" : "bg-none"} cursor-pointer hover:bg-primary/10`}
              key={index}
            >
              <span
                className="py-1 text-sm text-center line-clamp-1"
                onClick={(e) => ChangeIndex(index, r.region)}
              >
                {r.region}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col w-full gap-5 p-6 overflow-y-auto h-150 custom-scroll">
        {officeData[i].offices.map((office, index) => (
          <div key={index} className="flex flex-col gap-2 px-4 py-2">
            <h3 className="py-2 text-2xl font-semibold">{office.name}</h3>
            <p className="flex flex-row gap-3">
              {" "}
              <MapPinHouse /> Địa chỉ: {office.address}
            </p>
            <p className="flex flex-row gap-3">
              {" "}
              <Phone /> Hotline:{office.hotline}
            </p>
            <p className="flex flex-row gap-3">
              {" "}
              <Printer /> Fax: {office.fax}
            </p>
            <p className="flex flex-row gap-3">
              {" "}
              <Mail /> Email: {office.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
