export function formatMonthToDate(monthValue: string | null) {
  // If monthValue is null/empty or "present", return null
  if (!monthValue || monthValue === "present") return null;
  // Append "-01" to make it a full date string
  return monthValue + "-01";
}