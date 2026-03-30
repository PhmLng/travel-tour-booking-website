import { Button } from "@/components/ui/button";
import { Calendar, Users, Ticket } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Check } from "lucide-react";

const BookingCard = ({ item, onAction }) => {
  const statusClasses = {
    PENDING: "text-yellow-600 ",
    CONFIRMED: "text-blue-600 ",
    PAID: "text-green-600 ",
    PARTIALLY_PAID: "text-teal-600 ",
    CANCELED: "text-red-600 ",
    CANCELED_PENDING: "text-gray-600 ",
  };
  return (
    <div className="flex justify-between gap-4 p-5 border rounded shadow-sm bg-muted">
      <img
        src={item.mainImage}
        alt="tour"
        className="object-cover w-32 h-24 rounded-xl"
      />
      <div className="flex flex-col flex-1 gap-3">
        <h3 className="font-semibold text-gray-800 line-clamp-2">
          {item.tourTitle}
        </h3>
        <div className="grid grid-cols-2 text-sm text-gray-500 gap-x-6 gap-y-2">
          <p className="flex items-center gap-2">
            <Ticket size={16} />
            Mã: {item.Id}
          </p>
          <p className="flex items-center gap-2">
            <Calendar size={16} />
            {new Date(item.bookingDate).toLocaleDateString("vi-VN")}
          </p>
          <p className="flex items-center gap-2">
            <Users size={16} />
            Người lớn: {item.adultQuantity}
          </p>
          <p className="flex items-center gap-2">
            <Users size={16} />
            Trẻ em: {item.childQuantity}
          </p>
          <p className="col-span-2 font-semibold text-primary">
            Tổng tiền: {item.totalPrice?.toLocaleString("vi-VN")} đ
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between pl-4 min-w-10">
        <span
          className={`px-3 py-1 text-xs font-medium rounded ${
            statusClasses[item.status] || "text-gray-600 bg-gray-100"
          }`}
        >
          {item.status}
        </span>

        <div>
          {item.status === "CANCELED_PENDING" && (
            <Button
              onClick={() => onAction(item, "APPROVE_CANCEL")}
              variant="none"
              className="w-10 px-3 py-1 text-sm rounded hover:text-primary text-foreground"
            >
              <Check className="w-5 h-5 scale-125" />
            </Button>
          )}
          <Button
            onClick={() => onAction(item, "DELETE")}
            variant="none"
            className="px-3 py-1 text-sm rounded-sm cursor-pointer hover:text-destructive"
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
