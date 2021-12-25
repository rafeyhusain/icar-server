import { NextFunction, Request, Response } from 'express';
import { CreateCarDto } from '@dtos/cars.dto';
import { Car } from '@interfaces/cars.interface';
import carService from '@services/cars.service';

class CarsController {
  public carService = new carService();

  public getCars = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCarsData: Car[] = await this.carService.findAllCar();

      res.status(200).json({ data: findAllCarsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public filterCars = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCarsData: Car[] = await this.carService.filterCars(req.body);

      res.status(200).json({ data: findAllCarsData, message: 'filterCars' });
    } catch (error) {
      next(error);
    }
  };

  public recommendCars = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCarsData: Car[] = await this.carService.recommendCars(req.body);

      res.status(200).json({ data: findAllCarsData, message: 'recommendCars' });
    } catch (error) {
      next(error);
    }
  };

  public getCarById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const carId = Number(req.params.id);
      const findOneCarData: Car = await this.carService.findCarById(carId);

      res.status(200).json({ data: findOneCarData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const carData: CreateCarDto = req.body;
      const createCarData: Car = await this.carService.createCar(carData);

      res.status(201).json({ data: createCarData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const carId = Number(req.params.id);
      const carData: CreateCarDto = req.body;
      const updateCarData: Car[] = await this.carService.updateCar(carId, carData);

      res.status(200).json({ data: updateCarData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const carId = Number(req.params.id);
      const deleteCarData: Car[] = await this.carService.deleteCar(carId);

      res.status(200).json({ data: deleteCarData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CarsController;
