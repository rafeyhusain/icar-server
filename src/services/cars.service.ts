import { hash } from 'bcrypt';
import { CreateCarDto } from '@dtos/cars.dto';
import { HttpException } from '@exceptions/HttpException';
import { Car } from '@interfaces/cars.interface';
import carModel from '@models/cars.model';
import { isEmpty } from '@utils/util';

class CarService {
  public cars = carModel;

  public async findAllCar(): Promise<Car[]> {
    const cars: Car[] = this.cars;
    return cars;
  }

  public async findCarById(carId: number): Promise<Car> {
    const findCar: Car = this.cars.find(car => car.id === carId);
    if (!findCar) throw new HttpException(409, "You're not car");

    return findCar;
  }

  public async createCar(carData: CreateCarDto): Promise<Car> {
    if (isEmpty(carData)) throw new HttpException(400, "You're not carData");

    const findCar: Car = this.cars.find(car => car.make === carData.make && car.year === carData.year);
    if (findCar) throw new HttpException(409, `Your car ${carData.make}, ${carData.year} already exists`);

    const createCarData: Car = { id: this.cars.length + 1, ...carData };
    this.cars = [...this.cars, createCarData];

    return createCarData;
  }

  public async updateCar(carId: number, carData: CreateCarDto): Promise<Car[]> {
    if (isEmpty(carData)) throw new HttpException(400, "You're not carData");

    const findCar: Car = this.cars.find(car => car.id === carId);
    if (!findCar) throw new HttpException(409, "You're not car");

    const hashedPassword = await hash(carData.password, 10);
    const updateCarData: Car[] = this.cars.map((car: Car) => {
      if (car.id === findCar.id) car = { id: carId, ...carData, password: hashedPassword };
      return car;
    });

    return updateCarData;
  }

  public async deleteCar(carId: number): Promise<Car[]> {
    const findCar: Car = this.cars.find(car => car.id === carId);
    if (!findCar) throw new HttpException(409, "You're not car");

    const deleteCarData: Car[] = this.cars.filter(car => car.id !== findCar.id);
    return deleteCarData;
  }
}

export default CarService;
