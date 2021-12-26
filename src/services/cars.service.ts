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

  public async filterCars(query: Car): Promise<Car[]> {
    let cars: Car[] = null;

    if (query.year == 0 && query.make == "") {
      cars = this.cars
    } else {

      cars = this.cars.filter(
        car => {
          let result = query.year > 0 && query.year === car.year

          result = result || query.make && car.make.toLowerCase().indexOf(query.make.toLowerCase()) >= 0

          return result;
        }
      );
    }

    return cars;
  }

  /*
    As a car dealer, I want to recommend to my clients the car with the lowest 
    total annual cost over a period of four (4) years.
    - Given the price of fuel (€/L) and the expected distance to travel each month (km/month).
    - Relevant car parameters are price of the car (€), fuel consumption (km/l), and annual maintenance cost.
    - Example:
    Given that I expect to travel 250 km each month for the next 4 years, and the expected price of fuel is 0.73
    €/L, what is the ranking of cars according to their total annual cost?
  */
  public async recommendCars(query: { fuelPrice: number, distance: number }): Promise<Car[]> {
    const cars = this.cars.map((car) => {
      let carx = {
        ...car,
        cost: (car.maintenance + (car.fuel / query.fuelPrice) * query.distance * 12).toFixed(2)
      };

      return carx;
    });

    cars.sort((a: any, b: any) => a.cost - b.cost)

    return cars;
  }

  public async findCarById(carId: number): Promise<Car> {
    const findCar: Car = this.cars.find(car => car.id === carId);
    if (!findCar) throw new HttpException(409, "Invalid car");

    return findCar;
  }

  public async createCar(carData: CreateCarDto): Promise<Car> {
    console.log(">>>>", carData);

    if (isEmpty(carData)) {
      throw new HttpException(400, "Invalid carData");
    }

    const findCar: Car = this.cars.find(car => 
      car.make.toLowerCase() === carData.make.toLowerCase() 
      && car.year === carData.year);

    if (findCar) {
      throw new HttpException(409, `Your car ${carData.make}, ${carData.year} already exists`);
    }

    const createCarData: Car = { id: this.cars.length + 1, ...carData };
    this.cars = [...this.cars, createCarData];
    
    return createCarData;
  }

  public async updateCar(carId: number, carData: CreateCarDto): Promise<Car[]> {
    if (isEmpty(carData)) throw new HttpException(400, "Invalid carData");

    const findCar: Car = this.cars.find(car => car.id === carId);
    if (!findCar) throw new HttpException(409, "Invalid car");

    const hashedPassword = await hash(carData.password, 10);
    const updateCarData: Car[] = this.cars.map((car: Car) => {
      if (car.id === findCar.id) car = { id: carId, ...carData, password: hashedPassword };
      return car;
    });

    return updateCarData;
  }

  public async deleteCar(carId: number): Promise<Car[]> {
    const findCar: Car = this.cars.find(car => car.id === carId);
    if (!findCar) throw new HttpException(409, "Invalid car");

    const deleteCarData: Car[] = this.cars.filter(car => car.id !== findCar.id);
    return deleteCarData;
  }
}

export default CarService;
