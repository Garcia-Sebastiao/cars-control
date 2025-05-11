import { TableCell } from "@/components/ui/table";

export function VehicleTableItem({ children }: { children: React.ReactNode }) {
  return (
    <TableCell className="text-white text-center text-xs lg:text-sm px-10 lg:px-[5.625rem] py-4 font-medium">
      {children}
    </TableCell>
  );
}
