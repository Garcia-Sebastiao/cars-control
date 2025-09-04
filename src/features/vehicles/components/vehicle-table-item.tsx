import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function VehicleTableItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TableCell
      className={cn(
        "text-white text-center text-xs lg:text-sm px-10 lg:px-[5.625rem] py-4 font-medium",
        className
      )}
    >
      {children}
    </TableCell>
  );
}
