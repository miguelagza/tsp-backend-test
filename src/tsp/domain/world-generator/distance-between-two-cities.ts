import { City } from './city';

export class DistanceBetweenTwoCities {
    private readonly city1;
    private readonly city2;

    constructor(city1: City, city2: City) {
        this.city1 = city1
        this.city2 = city2
    }

    // Calculates the distance between two cities using the distance between two points formula
    getDistance() {
        const distanceX: number = Math.pow(
            this.city1.coordinates.x - this.city2.coordinates.x,
            2,
        );
        const distanceY: number = Math.pow(
            this.city1.coordinates.y - this.city2.coordinates.y,
            2,
        );
        const result: number = Math.sqrt(distanceX + distanceY);
        return Math.round(result); // Round the absolute value of the result
    }
}
