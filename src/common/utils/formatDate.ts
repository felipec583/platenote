
export function getNewFormattedDate():string {
  const date = new Date().toLocaleDateString("es-CL").split("-");
  const [day, month, year] = date;
  const properDate = [month, day, year].join("-");
  return properDate;
}