import React from "react";
import { useState } from "react";
import { officeData } from "../../lib/data";

export const Adress = () => {
  const [i, setI] = useState(0);
  const ChangeIndex = (index, r) => {
    setI(index);
    console.log(r);
  };
  return (
    <div className="w-full bg-gray-100 shadow-xl rounded-2xl">
      <div className="flex flex-wrap w-full h-auto gap-5 border-b border-gray-500 p-15 ">
        {officeData.map((r, index) => {
          return (
            <div
              className={`border rounded-full border-gray-500 w-fit px-5 text-center ${i === index ? "bg-gray-600" : "bg-none"} cursor-pointer`}
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
      <div className="flex flex-col w-full gap-1 p-6 overflow-y-auto h-150 custom-scroll">
        {officeData[i].offices.map((office, index) => (
          <div key={index} className="px-4 py-2">
            <h3 className="py-2 text-2xl font-semibold">{office.name}</h3>
            <p> Địa chỉ: {office.address}</p>
            <p> Hotline:{office.hotline}</p>
            <p> Fax: {office.fax}</p>
            <p> Email: {office.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
