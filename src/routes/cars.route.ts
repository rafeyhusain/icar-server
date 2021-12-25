import { Router } from 'express';
import CarsController from '@controllers/cars.controller';
import { CreateCarDto } from '@dtos/cars.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class CarsRoute implements Routes {
  public path = '/cars';
  public router = Router();
  public carsController = new CarsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.carsController.getCars);
    this.router.post(`${this.path}/filter`, this.carsController.filterCars);
    this.router.post(`${this.path}/recommend`, this.carsController.recommendCars);
    this.router.get(`${this.path}/:id(\\d+)`, this.carsController.getCarById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCarDto, 'body'), this.carsController.createCar);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateCarDto, 'body', true), this.carsController.updateCar);
    this.router.delete(`${this.path}/:id(\\d+)`, this.carsController.deleteCar);
  }
}

export default CarsRoute;
