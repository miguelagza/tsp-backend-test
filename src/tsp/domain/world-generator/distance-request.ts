export class DistanceRequest {
    from;
    to;
    distance;

    constructor (from: string, to: string, distance: number) {
        this.from = from
        this.to = to
        this.distance = distance
    }   
}