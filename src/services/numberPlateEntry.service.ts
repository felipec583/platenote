import { NewPlateEntry, NumberPlate } from "../types/schema";
import { NumberPlateEntryRepository } from "../repositories/number-plate-entry/numberPlateEntry.repository";
import { getShift } from "../common/helpers/getShift.js";
import { NumberPlateListRepository } from "../repositories/number-plate-list/numberPlateList.repository";
import { getNewFormattedDate } from "../common/utils/formatDate.js";
import { NumberPlateService } from "./numberPlate.service";
import { HttpError } from "../common/helpers/error.js";
import { statusType } from "../repositories/number-plate-entry/numberPlateEntryRepository.interface";

export class NumberPlateEntryService {
  constructor(
    private readonly numberPlateEntryRepository: NumberPlateEntryRepository,
    private readonly numberPlateListRepository: NumberPlateListRepository,
    private readonly numberPlateService: NumberPlateService
  ) {}
  async create(userInput: { created_by: string; number_plate: string }) {
    //tink of better adding the services instead other entities repositories
    const { created_by, number_plate } = userInput;
    let foundPlate = (await this.numberPlateService.getNumberPlateByName(
      userInput.number_plate
    )) as NumberPlate;
    if (!foundPlate) {
      foundPlate = await this.numberPlateService.create({
        number_plate: number_plate,
      });
    }
    const shiftId = getShift();
    const foundPlateList =
      await this.numberPlateListRepository.getPlateListIdByDayAndShift(
        getNewFormattedDate(),
        shiftId
      );

    if (!foundPlateList) {
      throw new HttpError("A list has not been created", 400);
    }

    const foundPlateInEntry = await this.numberPlateEntryRepository.findBy(
      ["plate_id", "plate_list_id"],
      [foundPlate.id, foundPlateList?.id]
    );

    if (foundPlateInEntry)
      throw new HttpError(
        "This number plate already exists in the current entry",
        400
      );
    const entry: NewPlateEntry = {
      plate_id: foundPlate.id,
      created_by,
      plate_list_id: foundPlateList.id,
    };

    const newEntry = await this.numberPlateEntryRepository.create(entry);

    return newEntry;
  }

  async delete(numberPlate: string) {
    // Get current list id
    // Find entry by the number plate and current list id
    const { foundPlateEntry } = await this.findNumberPlateInCurrentList(
      numberPlate
    );
    return await this.numberPlateEntryRepository.delete(foundPlateEntry.id);
  }

  async changeStatus(numberPlate: string, type: statusType) {
    const { foundPlateEntry } = await this.findNumberPlateInCurrentList(
      numberPlate
    );

    const { id: entryId, plate_id: numberPlateId } = foundPlateEntry;

    const value = !foundPlateEntry[type];

    const newStatus = await this.numberPlateEntryRepository.changeStatus({
      type,
      numberPlateId,
      entryId,
      value,
    });

    return newStatus;
  }
  async changeNumberPlate(currentNumberPlate: string, newNumberPlate: string) {
    const { foundPlateEntry } = await this.findNumberPlateInCurrentList(
      currentNumberPlate
    );

    const foundNewNumberPlate =
      await this.numberPlateService.getNumberPlateByName(newNumberPlate);

    let newPlate;
    if (!foundNewNumberPlate) {
      newPlate = await this.numberPlateService.create({
        number_plate: newNumberPlate,
      });
    }

    const updatedNumberPlate = await this.numberPlateEntryRepository.update(
      foundPlateEntry.id,
      { plate_id: foundNewNumberPlate?.id || newPlate?.id }
    );

    return updatedNumberPlate;
  }

  async findNumberPlateInCurrentList(numberPlate: string) {
    const foundNumberPlate = await this.numberPlateService.getNumberPlateByName(
      numberPlate
    );

    if (!foundNumberPlate)
      throw new HttpError("This number plate does not exist");
    const currentList =
      await this.numberPlateListRepository.getPlateListIdByDayAndShift(
        getNewFormattedDate(),
        getShift()
      );

    if (!currentList) throw new HttpError("There is not current list ");

    const foundPlateEntry = await this.numberPlateEntryRepository.findBy(
      ["plate_list_id", "plate_id"],
      [currentList.id, foundNumberPlate.id]
    );

    if (!foundPlateEntry) {
      throw new HttpError(
        `The entry with the following number plate ${numberPlate} 
        does not exist`
      );
    }

    return { foundPlateEntry, foundNumberPlate };
  }
}