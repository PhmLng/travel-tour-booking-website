import BookingCard from "./BookingCard";

const BookingList = ({ data, onAction }) => {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <BookingCard key={item.Id} item={item} onAction={onAction} />
      ))}
    </div>
  );
};

export default BookingList;
