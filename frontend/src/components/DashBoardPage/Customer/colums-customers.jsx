import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconDotsVertical } from "@tabler/icons-react"

export const customersColumns = (handleDetail, handleDelete) => [
  {
    accessorKey: "fullName",
    header: "Tên khách hàng",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "SĐT",
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "isLead",
    header: "Trạng thái",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.isLead ? "Người đặt chính" : "Khách đi cùng"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleDetail(row.original)}>
            Chi tiết
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]