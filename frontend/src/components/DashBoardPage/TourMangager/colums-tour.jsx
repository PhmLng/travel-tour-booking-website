import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IconDotsVertical } from "@tabler/icons-react";

export const columnsTour = (handleEdit, handleDelete, handleDetail) => [
  {
  id: "stt",
  header: "STT",
  cell: ({ row }) => <div>{row.index + 1}</div>,
},
  {
    accessorKey: "title",
    header: "Tên tour",
  },
  {
    accessorKey: "adultPrice",
    header: "Giá người lớn",
    cell: ({ row }) => (
      <div>{row.original.adultPrice?.toLocaleString("vi-VN")} VND</div>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Ngày khởi hành",
  },
  {
    accessorKey: "duration",
    header: "Thời gian",
  },
  {
    accessorKey: "departureLocation",
    header: "Điểm khởi hành",
  },
  {
    accessorKey: "mainImage",
    header: "Ảnh chính",
    cell: ({ row }) => (
      <img
        src={row.original.mainImage}
        alt="tour"
        className="object-cover w-16 h-12 rounded"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tour = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconDotsVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleDetail(tour.id)}>
              Chi tiết
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => handleEdit(tour)}>
              Sửa
            </DropdownMenuItem> */}

            <DropdownMenuItem onClick={() => handleDelete(tour.id)}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
