import { TIME } from "../constants.js";

const { START_MORNING, END_MORNING } = TIME;

export function getShift(): number {
  const currentTime = new Date();
  const currentHour = +currentTime.getHours().toString();
  if (currentHour >= START_MORNING && currentHour <= END_MORNING) return 1;
  //if (currentHour >= START_EVENING && currentHour <= END_EVENING)
  return 2;
}