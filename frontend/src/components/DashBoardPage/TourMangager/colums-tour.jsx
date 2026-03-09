import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconDotsVertical } from "@tabler/icons-react"

export const columnsTour = (handleEdit, handleDelete) => [
  {
    accessorKey: "tourName",
    header: "Tên tour",
  },
  {
    accessorKey: "location",
    header: "Địa điểm",
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => (
      <div>{row.original.price.toLocaleString()} VND</div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Thời gian",
  },
  {
    accessorKey: "slots",
    header: "Số chỗ",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.status}
      </Badge>
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
            <DropdownMenuItem onClick={() => handleEdit(tour)}>
              Sửa
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleDelete(tour.id)}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
     },
  },
]