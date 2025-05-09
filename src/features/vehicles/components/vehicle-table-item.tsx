import { TableCell } from "@/components/ui/table";

export function VehicleTableItem({ children }: { children: React.ReactNode }) {
  return (
    <TableCell className="text-white text-center text-sm px-[5.625rem] py-4 font-medium">
      {children}
    </TableCell>
  );
}
