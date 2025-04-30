import { Injectable, NotImplementedException } from '@nestjs/common';
import { TspSolveResponseDto } from './dtos/response/solve.response.dto';
import { TspSolveRequestDto } from './dtos/request/solve.request.dto';
import { TspGenerateCitiesResponseDto } from './dtos/response/generate-cities.response.dto';
import { WorldGenerator } from './domain/world-generator/world-generator';
import { TspGenerateCitiesRequestDto } from './dtos/request/generate-cities.request.dto';
import { DistanceRequest } from './domain/world-generator/distance-request';
import { DistanceBetweenTwoCities } from './domain/world-generator/distance-between-two-cities';
import { TspSolver } from './controllers/tsp-solver';

/**
 * The TspService class is a NestJS service responsible for implementing the
 * core logic of solving the Traveling Salesman Problem (TSP) and generating
 * random city coordinates.
 */
@Injectable()
export class TspService {
    solve(payload: TspSolveRequestDto): TspSolveResponseDto {        
        const sol = new TspSolver(payload).solve()
        return {route: "unknown".split(","), totalDistance: sol}
        throw new NotImplementedException(
            `${this.solve.name} method not implemented in ${TspService.name}`,
        );
    }

    generateCities(
        payload: TspGenerateCitiesRequestDto,
    ): TspGenerateCitiesResponseDto {
        const worldGenerator = new WorldGenerator(payload.numOfCities, {
            x: payload.worldBoundX,
            y: payload.worldBoundY,
        });

        worldGenerator.generateCities();

        // Gets world and cities
        const world = worldGenerator.getWorld();
        const worldCities = world.getCities()
        const cities = [];

        // Gets all cities' names and push them to an array
        for(const cityName of worldCities){
            cities.push(cityName.name)
        }

        
        const allDistances: DistanceRequest[] = []

        // Gets the distance between each city
        for(let i = 0; i < cities.length; i++){
            for(let j = 0; j < cities.length; j++){
                let distanceBetweenCities = new DistanceBetweenTwoCities(worldCities[i], worldCities[j]).getDistance()
                let totalDistance = new DistanceRequest(worldCities[i].name, worldCities[j].name, distanceBetweenCities)
                allDistances.push(totalDistance)
            }
        }

        return {cities: cities, distances: allDistances}

        throw new NotImplementedException(
            `${this.generateCities.name} method not implemented in ${TspService.name}`,
        );
    }
}
