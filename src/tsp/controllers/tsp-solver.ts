import { TspSolveRequestDto } from '../dtos/request/solve.request.dto';

// Solves the TSP using a Dynamic Programming Algorithm with Memoization
export class TspSolver {
    private n: number;
    private _cost: number[];
    private cost: number[][];

    constructor(payload: TspSolveRequestDto) {
        this.n = payload.cities.length;
        this._cost = []
        this.cost = []

        // Create a 1-D array of all distances
        for (const pd of payload.distances) {
            this._cost.push(pd.distance);
        }

        // Convert the previous 1-D array to 2-D Array
        while (this._cost.length) this.cost.push(this._cost.splice(0, this.n));
    }

    solve() {
        const memo = Array.from({length : this.n},
            () => Array(1 << this.n).fill(-1));

        const sol = this.totalCost(
            1, 0, this.n, this.cost, memo);  

        return sol
    }


    totalCost(mask: number, curr: number, n: number, cost: number[][], memo: number[][]) {
        // Base case: if all cities are visited, return the cost
        // to return to the starting city (0)
        if (mask === (1 << n) - 1) {
            return cost[curr][0];
        }
    
        // If the value has already been computed, return it
        // from the memo table
        if (memo[curr][mask] !== -1) {
            return memo[curr][mask];
        }
    
        let ans = Number.MAX_VALUE;
    
        // Try visiting every city that has not been visited yet
        for (let i = 0; i < n; i++) {
            if ((mask & (1 << i)) === 0) { 
                // If city i is not visited
                // Visit city i and update the mask
                ans = Math.min(ans, cost[curr][i] + this.totalCost(mask | (1 << i), i, n, cost, memo));
            }
        }
    
        // Memoize the result
        memo[curr][mask] = ans;
        return ans;
    }
}
