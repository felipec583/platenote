import { Counter, NumberPlateInfo } from "../../types/main";

const incrementIfTrue = (count: number, condition: boolean): number =>
  condition ? ++count : count;

export default function formatPlateList(list: NumberPlateInfo[]) {
  const numberPlatesCount = list.length;

  const counter = [...list].reduce(
    (acc, { is_registered, is_tenant, has_left }, _i) => {
      acc.hasLeft = incrementIfTrue(acc.hasLeft, has_left);

      acc.isTenant = incrementIfTrue(acc.isTenant, is_tenant);

      acc.isRegistered = incrementIfTrue(acc.isRegistered, is_registered);

      return acc;
    },

    {
      numberPlates: numberPlatesCount,

      hasLeft: 0,

      isRegistered: 0,

      isTenant: 0,
    } as Counter
  );

  return { plateList: list, counter };
}
