export class Review {
    reviewId: number;
    date_created: Date;
    description: string;

    constructor(reviewId: number, date_created: Date, description: string) {
        this.reviewId = reviewId
        this.date_created = date_created
        this.description = description
    }
}