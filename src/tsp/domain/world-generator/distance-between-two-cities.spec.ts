import { City } from "./city";
import { DistanceBetweenTwoCities } from "./distance-between-two-cities";

describe('DistanceBetweenTwoCities', () => {
    const city1 = new City("Test1", {x: 5, y: 10})
    const city2 = new City("Test2", {x: 20, y: 15})

    describe("constructor", () => {
        it("should initialize correctly with valid array of cities", () => {
            expect(() => new DistanceBetweenTwoCities(city1, city2)).not.toThrow();
        })
    })

    it('should create a DistanceBetweenTwoCities instance and return the distance value rounded', () => {
        const distance = new DistanceBetweenTwoCities(city1, city2).getDistance()
        expect(distance).toBe(16);
    });
});